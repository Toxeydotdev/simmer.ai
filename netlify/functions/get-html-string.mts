import { Readability } from "@mozilla/readability";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import OpenAI from "openai";

exports.handler = async (event: { body: string }, context: any) => {
  let body = JSON.parse(event.body);
  const baseUrl = body.value;
  // get HTML string from fetch of URL

  const response = await fetch(baseUrl, {
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

  // const completion = await openai.chat.completions.create({
  //   model: "gpt-4o-mini",
  //   messages: [
  //     {
  //       role: "user",
  //       content: `Give me an ingredient list and recipe instructions from the following message: ${reader}`,
  //     },
  //   ],
  // });
  const completion = {
    id: "chatcmpl-AGDzDR9tkFxOOkSS81PPIHYKH5J7F",
    object: "chat.completion",
    created: 1728430375,
    model: "gpt-4o-mini-2024-07-18",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content:
            "### Baked Mac and Cheese Recipe\n\n#### Ingredients:\n- 1 lb. dried elbow pasta\n- 1/2 cup unsalted butter\n- 1/2 cup all-purpose flour\n- 1 1/2 cups whole milk\n- 2 1/2 cups half and half\n- 4 cups shredded medium cheddar cheese, divided\n- 2 cups shredded Gruyere cheese, divided\n- 1/2 Tbsp. salt\n- 1/2 tsp. black pepper\n- 1/4 tsp. smoked paprika\n\n#### Instructions:\n1. **Preheat Oven**: Preheat your oven to 325°F (163°C) and grease a 3 qt baking dish (9x13 inches). Set aside.\n  \n2. **Boil Pasta**: In a large pot, bring salted water to a boil. Add the dried elbow pasta and cook for 1 minute less than the package instructions for al dente (usually about 4-5 minutes). Drain the pasta and drizzle with a little olive oil to prevent sticking.\n\n3. **Shred Cheese**: While the pasta is cooking, shred the cheeses and mix them together. Divide them into three portions: approximately 3 cups for the cheese sauce, and 1 1/2 cups each for the inner layer and topping.\n\n4. **Make Cheese Sauce**: In a large saucepan over medium heat, melt the butter. Sprinkle in the flour and whisk to combine until it resembles wet sand, about 1 minute. Gradually pour in about 2 cups of half and half while whisking constantly until smooth. Then add the remaining half and half and whole milk, whisking until combined and smooth.\n\n5. **Thicken Sauce**: Continue to cook over medium heat, whisking often, until the mixture thickens to a very thick consistency, resembling a semi-thinned condensed soup.\n\n6. **Add Cheese to Sauce**: Remove from heat and stir in the spices (salt, black pepper, and smoked paprika) as well as 1 1/2 cups of the shredded cheeses. Stir until melted and combined, then add another 1 1/2 cups of shredded cheese and stir until smooth.\n\n7. **Combine Pasta and Sauce**: In a large mixing bowl, combine the drained pasta with the cheese sauce, stirring until fully coated.\n\n8. **Layer in Baking Dish**: Pour half of the pasta mixture into the prepared baking dish. Top with 1 1/2 cups of the shredded cheeses. Add the remaining pasta mixture on top, then sprinkle with the last 1 1/2 cups of cheese.\n\n9. **Bake**: Bake in the preheated oven for about 15 minutes, or until the cheese is bubbly and lightly golden brown.\n\n10. **Serve and Enjoy**: Let it cool for a minute before serving, and enjoy your comforting baked mac and cheese!\n\n#### Notes:\n- You can adjust the cooking temperature and time if you prefer a crunchier topping. Baking at 350°F or 375°F for 20-30 minutes, followed by broiling for 2-5 minutes until golden brown, is an option.\n- For a variation, consider using different cheeses, like Colby, Muenster, or Mozzarella.\n- You can make this ahead of time (do not bake), cool, cover tightly with foil, and refrigerate for 1-2 days. Allow to sit at room temperature for 30 minutes before baking.",
          refusal: null,
        },
        logprobs: null,
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 2341,
      completion_tokens: 715,
      total_tokens: 3056,
      prompt_tokens_details: {
        cached_tokens: 0,
      },
      completion_tokens_details: {
        reasoning_tokens: 0,
      },
    },
    system_fingerprint: "fp_f85bea6784",
  };
  return {
    statusCode: 200,
    body: JSON.stringify({ baseUrl, completion }),
  };
};
