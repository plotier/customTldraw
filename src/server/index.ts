
import { z } from 'zod'
import { router, publicProcedure } from './trpc'
import { GoogleGenAI } from "@google/genai";


let store: any = { shapes: [] }

export const appRouter = router({
  getDocument: publicProcedure.query(() => store),

  saveDocument: publicProcedure
    .input(z.any())
    .mutation(({ input }) => {
      store = input
      return { success: true }
    }),


  generateDrawingFromPrompt: publicProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {

      const ai = new GoogleGenAI({ apiKey: "AIzaSyB6MkIx8EkkqWxYxWFaLw4mc7gfBNdKI3E" });

      async function main() {
        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: `I want to draw ${input.prompt} in tldraw.
           Give me very brief drawing suggestions (max 3 short steps), using tldraw tools like shapes, lines, arrows, and text.
            Answer in the same language as the prompt. Do not use any other language. Do not use any other format. Just give me the steps.`
          ,
        });
        return response.text
      }
      return await main();
    })

})

export type AppRouter = typeof appRouter
