import { Mastra } from '@mastra/core/mastra'
import { PostgresStore } from '@mastra/pg'
import { chatRoute } from "@mastra/ai-sdk"
import { digitalMarketingAgent } from "@/bot/agents/digital-marketing-agent"


const storage = new PostgresStore({
  id: 'pg-storage',
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: true } : false,
})

export const mastra = new Mastra({
  agents: { digitalMarketingAgent },
  storage,
  server: {
    apiRoutes: [
      chatRoute({
        path: '/chat/marketing',
        agent: 'digitalMarketingAgent',
      }),
    ],
  },
})