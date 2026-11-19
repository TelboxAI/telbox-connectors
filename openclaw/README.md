# Telbox for OpenClaw

An installable native OpenClaw plugin maintained by Telbox. It contributes the
Telbox MCP server through the official `openclaw.plugin.json#mcpServers` contract,
with a native setup command so you do not need to copy a server configuration fragment. OpenClaw manages OAuth
and credentials; this package contains no tokens, dependencies or install scripts.

This preview is scoped to three tools: `get_my_inbox`, `send_message` and
`get_message_status`, with OAuth `messages:write`. Sending creates a proposal for
the account owner's approval. It does not send immediately or read chat history.
Calling, video, TTS and phone-reply continuation are outside this package.

## Install

Use OpenClaw **2026.11.5**, the version validated for this package. The older
2026.5.7 release does not support the required OAuth workflow. Later releases
require their own compatibility check; the install floor is not a test claim.

From the public source checkout:

```sh
git clone https://github.com/TelboxAI/telbox-connectors.git
cd telbox-connectors
openclaw plugins install ./openclaw
openclaw plugins inspect telbox --json
openclaw telbox setup
```

For a downloaded package archive, use `openclaw plugins install ./telboxai-openclaw-telbox-0.1.0-preview.2.tgz`.
Verify its SHA256 against the release's checksum before installing. This folder
must be published by the maintainer before the source command works. It is not
yet a ClawHub listing; do not use an unverified package with the same name.

Installation can enable this plugin in your Gateway. Inspect its metadata and
normal OpenClaw install-policy prompt before accepting. This plugin contributes
the `telbox` MCP server while enabled. An existing `mcp.servers.telbox` user
override remains authoritative: review conflicts rather than silently overwriting
them. `openclaw telbox setup --dry-run` previews the narrow config addition.
Setup preserves other configuration and refuses a different existing Telbox
server, including a disabled one. On 2026.11.5 this explicit step is required
because CLI OAuth commands read saved MCP definitions rather than plugin defaults.
It uses OpenClaw's atomic config writer and normal reload policy, never a separate
OAuth implementation. Native installation/inspection does not prove an OAuth connection.

## Connect your account

```sh
openclaw telbox setup
openclaw mcp login telbox
openclaw mcp status --verbose
openclaw mcp doctor telbox --probe
```

Complete normal Telbox consent for the intended account and confirm that the
requested permission is only `messages:write`. Use the canonical resource
`https://api.telbox.ai/mcp`; do not paste API keys or bearer tokens into config.
The host chooses the callback for its login mode. If registration or the callback
is refused, retain only the exact nonsecret client ID/callback and error for
Telbox support. Never guess a callback or bypass client review. Gateway/browser
OAuth uses its configured `gateway.publicOrigin`; provision and review the exact
HTTPS origin before using that mode. CLI and Gateway modes must be tested
separately. This package does not provision a proxy or change your Gateway origin.

OAuth is an operator-owned connection by default. Do not share this owner's grant
with untrusted users or assume each message sender has separate credentials.

## First useful message

Ask your agent: "Send this research result to my Telbox Notes to Self for review."

1. Call `get_my_inbox` with `{}` and use the returned thread ID only if ready.
   Follow `next_step` if account setup is required; never invent a destination.
2. Call `send_message` once with that destination, the intended text and a stable
   `client_message_id` for this logical send. Retain its draft ID.
3. In Telbox, review the exact proposal in Tasks → Automations → Waiting for you.
4. After approval, call `get_message_status` with the draft ID. Reconcile uncertain
   results with this tool; do not generate a new send key and blindly resend.
5. Open Notes to Self on the intended phone and verify the exact message once.

Proposal creation, server execution, device acknowledgement and physical-phone
rendering are different outcomes. Approval authorizes sending the message; it
does not approve a business decision described inside it.

## Disconnect

```sh
openclaw mcp logout telbox
openclaw plugins disable telbox
```

Revoke the connected grant in Telbox and verify old access/refresh credentials
fail. Uninstalling a package alone does not revoke a grant. Use
`openclaw plugins uninstall telbox` when no longer needed.

## Scope of validation

The package is qualified separately from Telbox's previous native-runtime test.
Install/inspect checks validate packaging and the native server declaration;
they do not establish real account OAuth or delivery for this package. See the
maintainer's release evidence for exactly which steps passed. No marketplace
publication or phone test is implied by installation.

Official contracts: [native manifest](https://docs.openclaw.ai/plugins/manifest),
[static MCP servers](https://docs.openclaw.ai/plugins/manifest/surfaces#mcp-server-reference),
[OAuth](https://docs.openclaw.ai/cli/mcp/transports), and
[installation](https://docs.openclaw.ai/cli/plugins/install).

This package is publicly distributed by Telbox with rights retained. Public
availability does not grant an open-source license (`UNLICENSED` package metadata).
