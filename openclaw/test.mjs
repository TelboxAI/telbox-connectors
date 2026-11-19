import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import plugin, { setup, setupPlan } from "./index.js";

const manifest = JSON.parse(readFileSync(new URL("./openclaw.plugin.json", import.meta.url)));
const server = manifest.mcpServers.telbox;

function harness(config, beforeMutation = () => {}) {
  let writes = 0;
  return {
    api: { runtime: { config: {
      current: () => structuredClone(config),
      async mutateConfigFile(options) {
        writes++;
        assert.equal(options.afterWrite.mode, "auto");
        beforeMutation(config);
        options.mutate(config);
      },
    } } },
    writes: () => writes,
  };
}

test("dry run does not write or start auth", async () => {
  const state = {};
  const h = harness(state);
  assert.deepEqual(await setup(h.api, true), { action: "add", changed: false, dryRun: true });
  assert.equal(h.writes(), 0);
  assert.deepEqual(state, {});
});

test("setup preserves other servers and settings, repeated setup is a no-op", async () => {
  const state = { gateway: { port: 12345 }, mcp: { servers: { other: { enabled: false } } } };
  const h = harness(state);
  assert.equal((await setup(h.api)).changed, true);
  assert.deepEqual(state.mcp.servers.telbox, server);
  assert.deepEqual(state.mcp.servers.other, { enabled: false });
  assert.equal(state.gateway.port, 12345);
  assert.equal((await setup(h.api)).changed, false);
  assert.equal(h.writes(), 1);
});

test("disabled, broadened or credential-bearing overrides are refused without leaking values", async () => {
  for (const override of [{ enabled: false }, { ...server, headers: { Authorization: "SECRET_SENTINEL" } },
    { ...server, oauth: { scope: "threads:read" } }, null]) {
    const h = harness({ mcp: { servers: { telbox: override } } });
    await assert.rejects(setup(h.api), (error) => !error.message.includes("SECRET_SENTINEL") && error.message.includes("will not overwrite"));
    assert.equal(h.writes(), 0);
  }
});

test("atomic mutation rechecks a conflicting concurrent edit", async () => {
  const state = {};
  const h = harness(state, (draft) => { draft.mcp = { servers: { telbox: { enabled: false } } }; });
  await assert.rejects(setup(h.api), /will not overwrite/);
  assert.deepEqual(state.mcp.servers.telbox, { enabled: false });
});

test("native CLI declaration matches registration and only three write-scope tools are requested", () => {
  let options;
  plugin.register({ registerCli(_fn, value) { options = value; } });
  assert.deepEqual(options.descriptors, manifest.cliCommands);
  assert.equal(server.auth, "oauth");
  assert.equal(server.oauth.scope, "messages:write");
  assert.deepEqual(server.toolFilter.include, ["get_my_inbox", "send_message", "get_message_status"]);
  assert.equal(setupPlan({}), "add");
});
