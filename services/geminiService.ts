import { GoogleGenAI, Type } from "@google/genai";
import { FlashcardData } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFlashcards = async (topic: string): Promise<FlashcardData[]> => {
  try {
    const model = "gemini-2.5-flash";
    
    const response = await ai.models.generateContent({
      model: model,
      contents: `Lag 10 pedagogiske flashcards (spørsmål og svar) for emnet: "${topic}". 
      Målgruppen er norske skoleelever. Svarene skal være konsise men informative.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: "Spørsmålet på forsiden av kortet",
              },
              answer: {
                type: Type.STRING,
                description: "Svaret på baksiden av kortet",
              },
              category: {
                type: Type.STRING,
                description: "En kort underkategori for emnet (f.eks. 'Matte', 'Historie', 'Grammatikk')",
              },
            },
            required: ["question", "answer"],
          },
        },
        systemInstruction: "Du er en hjelpsom lærerassistent. Du lager flashcards på norsk. Vær nøyaktig og pedagogisk.",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Ingen respons fra AI.");
    }

    const rawData = JSON.parse(text);
    
    // Map to ensure IDs and types match
    const formattedCards: FlashcardData[] = rawData.map((card: any, index: number) => ({
      id: `card-${Date.now()}-${index}`,
      question: card.question,
      answer: card.answer,
      category: card.category || "Generelt",
    }));

    return formattedCards;

  } catch (error) {
    console.error("Feil ved generering av kort:", error);
    throw new Error("Kunne ikke generere kort. Vennligst prøv igjen senere eller velg et annet emne.");
  }
};