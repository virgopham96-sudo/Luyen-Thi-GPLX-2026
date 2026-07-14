import { GoogleGenAI, Type } from "@google/genai";
import { QUESTIONS } from "./questions";
import fs from "fs";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

async function generateWithRetry(prompt: string, batchSize: number): Promise<string[]> {
  let retries = 5;
  let delay = 3000;
  while (retries > 0) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are an expert Vietnamese driving theory instructor. Provide highly accurate, brief, and professional explanations (giải thích đáp án) in Vietnamese for the questions.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
            description: `List of exactly ${batchSize} explanation strings in Vietnamese, matching the input questions in order.`,
          },
        },
      });
      const resultText = response.text;
      if (!resultText) {
        throw new Error("Empty response from Gemini");
      }
      const explanations = JSON.parse(resultText);
      if (!Array.isArray(explanations)) {
        throw new Error("Response is not a JSON array");
      }
      if (explanations.length !== batchSize) {
        throw new Error(`Expected ${batchSize} explanations, but got ${explanations.length}`);
      }
      return explanations;
    } catch (err: any) {
      console.warn(`Error generating explanations: ${err.message || err}. Retrying in ${delay}ms... (${retries} attempts left)`);
      retries--;
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
  throw new Error(`Failed to generate explanations for a batch after multiple retries.`);
}

async function healAllQuestions() {
  console.log("Starting the full database healing process for 600 questions...");
  const BATCH_SIZE = 20;
  const total = QUESTIONS.length;
  
  // Make a deep-ish copy of QUESTIONS to avoid modifying in-place while working
  const healedQuestions = JSON.parse(JSON.stringify(QUESTIONS));

  for (let start = 300; start < total; start += BATCH_SIZE) {
    const end = Math.min(start + BATCH_SIZE, total);
    const batch = healedQuestions.slice(start, end);
    const actualBatchSize = batch.length;
    
    console.log(`\nProcessing batch: questions ${start + 1} to ${end}...`);

    const prompt = `You are given a list of ${actualBatchSize} Vietnamese driving theory questions (600 câu hỏi GPLX).
For each question, review the content, options, correct answer, and the current explanation (which might be wrong or shifted from another question).
If the current explanation is correct and matches the question perfectly, preserve or slightly refine it.
If the current explanation is mismatched or incorrect, write a highly accurate, clear, and professional explanation in Vietnamese (1-2 sentences) directly explaining why the correct answer is right.

Questions:
${batch.map((q: any, idx: number) => `
--- Question Index ${idx + 1} (QID: ${q.id}) ---
Content: ${q.content}
Options:
${q.options.map((opt: string, oIdx: number) => `- ${String.fromCharCode(65 + oIdx)}. ${opt}`).join("\n")}
Correct Answer: ${q.answer}
Current Explanation (Might be mismatched/shifted): "${q.explanation}"
`).join("\n")}
`;

    const explanations = await generateWithRetry(prompt, actualBatchSize);
    
    // Apply explanations to the healedQuestions array
    for (let i = 0; i < actualBatchSize; i++) {
      healedQuestions[start + i].explanation = explanations[i].trim();
    }
    
    console.log(`Successfully completed batch ${start + 1} to ${end}.`);
    
    // Save intermediate progress to avoid losing work if there is a crash
    const intermediateContent = `import { Question } from '../types';

export const QUESTIONS: Question[] = ${JSON.stringify(healedQuestions, null, 2)};
`;
    fs.writeFileSync("./src/data/questions.ts", intermediateContent, "utf8");

    // Sleep for 6 seconds to respect rate limit
    console.log("Sleeping for 6 seconds to respect rate limits...");
    await new Promise(resolve => setTimeout(resolve, 6000));
  }

  console.log("\nFull database healing complete! Writing final file to src/data/questions.ts...");
  console.log("Double checking total questions in final array: " + healedQuestions.length);
}

healAllQuestions().catch(err => {
  console.error("Critical error during healing process:", err);
  process.exit(1);
});
