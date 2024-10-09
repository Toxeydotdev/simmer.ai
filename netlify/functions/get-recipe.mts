import { Readability } from "@mozilla/readability";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import OpenAI from "openai";

exports.handler = async (event: { body: string }, context: any) => {
  let body = JSON.parse(event.body);
  const urlInput = body.url;

  // get HTML string from fetch of URL
  const response = await fetch(urlInput, {
    method: "GET",
  });
  const data = await response.text();

  // JSDOM window to sanitize HTML string
  const window = new JSDOM("").window;
  const purify = DOMPurify(window);
  const clean = purify.sanitize(data);

  // JSDOM window to parse sanitized HTML string
  const doc = new JSDOM(clean).window.document;
  const reader = new Readability(doc).parse()?.textContent;

  const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"],
  });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Give me an ingredient list with alternatives, easy to follow recipe instructions, and include a title of the dish at the start of your response from the following text only if it contains food or cooking related items, otherwise provide me an error: ${reader}`,
      },
    ],
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      urlInput,
      recipe: completion.choices[0].message.content,
    }),
  };
};
