import { Agent } from '@mastra/core/agent'
import { Memory } from '@mastra/memory'
import { ollama } from "ollama-ai-provider-v2"

export const digitalMarketingAgent = new Agent({
  id: "digital-marketing-agent",
  name: "Digital Marketing Agent",
  instructions: ({ requestContext }) => {
    const clientBrand = requestContext.get('clientBrand') ?? 'our agency'
    const channel = requestContext.get('channel') ?? 'general'
    return `You are a senior digital marketing strategist for ${clientBrand}. 
Focus on ${channel} marketing. Always align with the client's brand voice, 
produce specific and actionable recommendations, and never fabricate metrics.`
  },
  memory: new Memory(),
  model: process.env.NODE_ENV === "production" ? "google/gemini-flash-latest" : ollama("gemma4:12b"),
  skills: [
    "../../.agents/skills/marketing-psychology",
    "../../.agents/copywriting",
  ]
})
