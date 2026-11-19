# Telbox connectors

Connect an agent or automation to Telbox to propose a message for your approval. Approve it in Telbox, then open Notes to Self. A pending proposal still needs your approval.

| Platform | What you can try | Setup files |
| --- | --- | --- |
| [n8n](https://developers.telbox.ai/integrations/#n8n) | Send a workflow exception to Notes to Self | [Download ZIP](https://github.com/TelboxAI/telbox-connectors/releases/download/v0.1.0-preview.1/n8n.zip) |
| [Hermes Agent](https://developers.telbox.ai/integrations/#hermes) | Send a research finding from your agent | [Download ZIP](https://github.com/TelboxAI/telbox-connectors/releases/download/v0.1.0-preview.1/hermes.zip) |
| [OpenClaw](https://developers.telbox.ai/integrations/#openclaw) | Receive a result from a gateway agent | [Download ZIP](https://github.com/TelboxAI/telbox-connectors/releases/download/v0.1.0-preview.1/openclaw.zip) |
| [Home Assistant](https://developers.telbox.ai/integrations/#home-assistant) | Review a home sensor alert on your phone | [Download ZIP](https://github.com/TelboxAI/telbox-connectors/releases/download/v0.1.0-preview.1/home-assistant.zip) |
| [Dify](https://developers.telbox.ai/integrations/#dify) | Request human review for a support case | [Download ZIP](https://github.com/TelboxAI/telbox-connectors/releases/download/v0.1.0-preview.1/dify.zip) |
| [Make](https://developers.telbox.ai/integrations/#make) | Review a supplier exception | [Download ZIP](https://github.com/TelboxAI/telbox-connectors/releases/download/v0.1.0-preview.1/make.zip) |
| [Zapier](https://developers.telbox.ai/integrations/#zapier) | Propose a message from a Zap | [Download ZIP](https://github.com/TelboxAI/telbox-connectors/releases/download/v0.1.0-preview.1/zapier.zip) |
| [Shopify Flow](https://developers.telbox.ai/integrations/#shopify) | Flag an order for merchant review | [Download ZIP](https://github.com/TelboxAI/telbox-connectors/releases/download/v0.1.0-preview.1/shopify.zip) |
| [HubSpot](https://developers.telbox.ai/integrations/#hubspot) | Bring a deal review to Notes to Self | [Download ZIP](https://github.com/TelboxAI/telbox-connectors/releases/download/v0.1.0-preview.1/hubspot.zip) |
| [Vapi](https://developers.telbox.ai/integrations/#vapi) | Request human review from a support chat | [Download ZIP](https://github.com/TelboxAI/telbox-connectors/releases/download/v0.1.0-preview.1/vapi.zip) |
| [Grok Bot](https://docs.telbox.ai/guides/authentication/#connect-grok-bot-to-notes-to-self) | Propose a text message for owner approval | [Reviewer ZIP](https://github.com/TelboxAI/telbox-connectors/releases/download/v0.1.0-preview.1/grok-bot.zip) |

## Preview status

The ten platform packages were tested with private Telbox accounts. Some scenarios use a platform runtime, and others use a workflow or field-mapping fixture. The tests verified one approved message per platform and checked the exact decrypted text after reconnect. Marketplace installation, production tenant delivery and physical iPhone verification are tracked separately. The Grok download is a reviewer kit. Calls and TTS are outside this release.

To verify a download, run `shasum -a 256 <filename>.zip` and compare its result with [SHA256SUMS](https://github.com/TelboxAI/telbox-connectors/releases/download/v0.1.0-preview.1/SHA256SUMS).
