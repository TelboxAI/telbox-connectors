import { readFileSync } from "node:fs";
import { isDeepStrictEqual } from "node:util";

const manifest = JSON.parse(readFileSync(new URL("./openclaw.plugin.json", import.meta.url), "utf8"));
const server = manifest.mcpServers.telbox;
const descriptor = manifest.cliCommands[0];

export function setupPlan(config) {
  const existing = config.mcp?.servers?.telbox;
  if (existing !== undefined && !isDeepStrictEqual(existing, server)) {
    throw new Error("An existing mcp.servers.telbox override differs. Review it in OpenClaw Settings; Telbox setup will not overwrite it.");
  }
  return existing === undefined ? "add" : "already-configured";
}

export async function setup(api, dryRun = false) {
  const action = setupPlan(api.runtime.config.current());
  if (dryRun || action === "already-configured") return { action, changed: false, dryRun };
  await api.runtime.config.mutateConfigFile({
    afterWrite: { mode: "auto" },
    mutate(draft) {
      // Recheck inside the host's atomic writer: never overwrite a concurrent edit.
      if (setupPlan(draft) === "already-configured") return;
      draft.mcp ??= {};
      draft.mcp.servers ??= {};
      draft.mcp.servers.telbox = structuredClone(server);
    },
  });
  return { action: "add", changed: true, dryRun: false };
}

// OpenClaw owns transport, OAuth/refresh and tool dispatch. Setup explicitly adds
// the same static definition for 2026.11.5's CLI, which ignores plugin defaults.
export default {
  id: "telbox",
  name: "Telbox",
  register(api) {
    api.registerCli(({ program }) => {
      program.command("telbox").description(descriptor.description)
        .command("setup").description("Add the Telbox MCP definition without overwriting an existing server")
        .option("--dry-run", "Check the proposed change without writing configuration")
        .action(async (options) => {
          const result = await setup(api, options.dryRun === true);
          console.log(JSON.stringify(result));
          if (!result.dryRun) console.log("Next: openclaw mcp login telbox");
        });
    }, { descriptors: [descriptor] });
  },
};
