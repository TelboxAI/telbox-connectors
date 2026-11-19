# Platform submission status

Updated November 19, 2026. The [Telbox preview release](https://github.com/TelboxAI/telbox-connectors/releases/tag/v0.1.0-preview.1) includes ten platform packages and the Grok Bot reviewer kit. Each row tracks the platform's own review process.

| Platform | Review status | Available now or required for review |
| --- | --- | --- |
| Hermes Agent | Submitted to maintainers | [Catalog pull request #157703](https://github.com/NousResearch/hermes-agent/pull/157703) adds the Telbox entry and device-login support. It is open for review. |
| Home Assistant | Custom repository published | [Install version 0.1.2](https://github.com/TelboxAI/telbox-home-assistant/releases/tag/v0.1.2). [hassfest passed](https://github.com/TelboxAI/telbox-home-assistant/actions/runs/44477699717/job/135402137891). The [HACS default directory check](https://github.com/TelboxAI/telbox-home-assistant/actions/runs/44477699717/job/135402138346) requires a license. |
| Grok Bot (xAI) | Reviewer kit published | The dedicated review client still needs to finish native authorization and demonstrate a message through that client before the [xAI submission](https://x.ai/bot/marketplace/submit-a-plugin). |
| OpenClaw | [Native plugin available](https://github.com/TelboxAI/telbox-connectors/releases/tag/native-preview.1) | The ClawHub dry run passed. An authenticated Telbox publisher is needed for [ClawHub review](https://docs.openclaw.ai/clawhub/publishing). |
| n8n | [Annotated workflow available](https://github.com/TelboxAI/telbox-connectors/releases/tag/native-preview.1) | Native n8n 2.48.0 imported and ran the workflow against a local MCP fixture. The [template creator process](https://support.n8n.io/article/becoming-an-n8n-template-creator-and-getting-help) requires submission through the Creator Dashboard. |
| Make | Scenario recipe available | Build and test the scenario as a Make template in a publisher workspace, then [request approval](https://help.make.com/create-and-manage-scenario-templates). |
| Zapier | CLI integration source available | The [public review process](https://docs.zapier.com/integrations/publish/public-integration) requires hosted OAuth, successful enabled Zap histories and a reviewer account. |
| Shopify Flow | Merchant setup recipe available | A partner needs an eligible app, a store-tested Flow export and a [Flow template extension](https://shopify.dev/docs/apps/build/flow/templates/create-a-template). |
| HubSpot | Workflow recipe available | The [App Marketplace](https://developers.hubspot.com/changelog/app-listing-and-app-certification-requirement-updates-for-may-2026) requires a hosted marketplace OAuth app and hosted workflow validation. |
| Dify | [Native workflow package available](https://github.com/TelboxAI/telbox-connectors/releases/tag/native-preview.1) | Dify CE 1.20.0 exported the package with secret values excluded. A fresh hosted run and publisher access remain. The [Creator Center process](https://docs.dify.ai/en/self-host/use-dify/publish/publish-to-marketplace) requires a Community Edition run and an exported workflow package with secrets excluded. |
| Vapi | Text-chat recipe available | Hosted text-chat validation is outstanding. We have not verified a public catalog submission channel for this recipe. [Vapi integrations](https://docs.vapi.ai/tools/integrations) |
