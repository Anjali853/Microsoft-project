
import { GoogleGenAI, Type } from "@google/genai";
import { AppState } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartRecommendations = async (state: AppState) => {
  try {
    const prompt = `
      Expert Energy Analyst System Instruction:
      Household Data:
      - Eco-Score: ${state.ecoScore}/100
      - Appliances: ${state.appliances.map(a => `${a.name} (${a.usage}kWh, ${a.status})`).join(', ')}
      - Predicted Bill Increase: ₹${state.predictedIncrease}
      
      Provide 3 high-impact saving actions. Focus on the predicted increase.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              impact: { type: Type.STRING },
              type: { type: Type.STRING, enum: ["saving", "behavior", "maintenance"] }
            },
            required: ["title", "description", "impact", "type"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    return [];
  }
};

export const askEnergyAI = async (query: string, state: AppState) => {
  try {
    const prompt = `
      You are the EcoSmart AI Assistant. A user is asking about their home energy.
      Current Context: 
      - AC usage is high (45% of total).
      - Predicted spike tomorrow: ₹120.
      - Current EcoScore: ${state.ecoScore}.
      User Question: "${query}"
      Answer concisely, suggesting clear actions to save money. Mention specific ₹ or units if relevant.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt
    });
    return response.text;
  } catch (error) {
    return "I'm having trouble analyzing your data right now. Try again shortly.";
  }
};
