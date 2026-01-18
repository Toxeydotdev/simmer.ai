import { Readability } from '@mozilla/readability';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import OpenAI from 'openai';

export const handler = async (event: { body: string }, context: any) => {
  let body = JSON.parse(event.body);
  const urlInput = body.data;

  const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'],
  });
  let reader: string | undefined;

  if (isValidHttpUrl(urlInput)) {
    // get HTML string from fetch of URL
    const response = await fetch(urlInput, {
      method: 'GET',
    });
    const data = await response.text();

    // JSDOM window to sanitize HTML string
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    const clean = purify.sanitize(data);

    // JSDOM window to parse sanitized HTML string
    const doc = new JSDOM(clean).window.document;
    reader = new Readability(doc).parse()?.textContent;
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: `Give me an ingredient list, possible ingredient alternatives, easy to follow recipe instructions, helpful cooking tips, and include a title of the dish at the start of your response from the following text only if it contains food or cooking related items, otherwise provide me an error: ${
          reader ? reader : urlInput
        }`,
      },
    ],
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      urlInput,
      recipe: completion.choices[0].message.content,
      completion,
    }),
  };
};

function isValidHttpUrl(inputUrl: string) {
  let url;

  try {
    url = new URL(inputUrl);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}
