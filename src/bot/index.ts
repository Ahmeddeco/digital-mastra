import { Mastra } from '@mastra/core/mastra'
import { chatRoute } from "@mastra/ai-sdk"
import { digitalMarketingAgent } from "@/bot/agents/digital-marketing-agent"
import { developerAgent } from "@/bot/agents/developer-agent"
import { supervisorAgent } from "@/bot/agents/supervisor-agent"
import { storage } from "@/bot/storage"
import { MastraEditor } from '@mastra/editor'

export const mastra = new Mastra({
  agents: { digitalMarketingAgent, developerAgent, supervisorAgent },
  storage,
  server: {
    apiRoutes: [
      chatRoute({
        path: '/chat',
        agent: 'supervisorAgent',
      }),
    ],
  },
  editor: new MastraEditor(),
})