import OpenAI from "openai";

const openai = new OpenAI();

async function main(theme) {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": "`Generate a website copy for Belenus Consulting focusing on ${theme}. Include sections for Home, About, Services, Impact, and Contact.` Return as structured json object"}
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