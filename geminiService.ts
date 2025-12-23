
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "./constants";

export async function getAIResponse(userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  // A chave de API deve ser configurada nas variáveis de ambiente do Netlify (Environment Variables)
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    return "A chave de API não foi configurada corretamente. Por favor, verifique as configurações do sistema.";
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 1.0, 
        topP: 0.95,
        topK: 64,
      },
    });

    const text = response.text;
    if (!text) throw new Error("Resposta vazia da IA.");

    return text;
  } catch (error) {
    console.error("Erro na comunicação com Gemini:", error);
    return "Lamento, ocorreu uma interrupção na nossa comunicação. Poderia repetir o que dizia? Estou atento.";
  }
}
