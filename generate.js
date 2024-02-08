import OpenAI from "openai";

const openai = new OpenAI();

async function main(theme) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": `Given the article below, create a JSON object which enumerates a set of 5 child objects.                       
                Each child object has a property named "q" and a property named "a".
                For each child object assign to the property named "q" a question which has its answer in the article 
                and to the property named "a" a short answer to this question.
                The resulting JSON object should be in this format: [{"q":"string","a":"string"}].\n\n
                The article:\n
                ${textToUse}\n\n
                The JSON object:\n\n`}
            ],
            model: "gpt-4-turbo-preview",
        });

        //console.log(completion.choices[0]);
        return completion.choices[0];
    } catch (error) {
        console.error("Error in generating content:", error);
        return null;
    }
}
main("Earth Day").then(content => console.log(content));

/*

import OpenAI from "openai";

const openai = new OpenAI();

async function generateThemedContent(theme) {

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // You can change the model as needed
      prompt: `Generate a website copy for Belenus Consulting focusing on ${theme}. Include sections for Home, About, Services, Impact, and Contact.`,
      temperature: 0.7,
      max_tokens: 1024,
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error("Error in generating content:", error);
    return null;
  }
}

// Example usage
generateThemedContent("Earth Day").then(content => console.log(content));
*/