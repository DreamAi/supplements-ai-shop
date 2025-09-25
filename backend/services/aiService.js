const { OpenAIApi, Configuration } = require('openai');
const axios = require('axios');
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

/*
  Strategy:
  1. Query product FAQ vector store (embeddings) for best contexts.
  2. Build system prompt: brand voice, compliance rules & a fallback to human agent if sensitive.
  3. Call OpenAI/other LLM to produce human-like replies.
*/

async function retrieveContext(query){
  // placeholder: call vectorstore service (e.g. Pinecone or local FAISS)
  // return an array of short docs
  return [
    "Sea Moss is rich in iodine and minerals. Use as directed.",
    "Return policy: 14 day returns for unopened goods (country rules may vary)."
  ];
}

module.exports = {
  chatWithCustomer: async (message) => {
    const context = await retrieveContext(message);
    const systemPrompt = `You are SeaHealth AI assistant. Speak in friendly, clear tones. Do not provide medical diagnoses. If user asks medical questions, provide a disclaimer and recommend consulting a healthcare professional. Follow local compliance: in South Africa follow POPIA, do not reveal personal data.`;
    const userContent = `Context:\n${context.join('\n')}\n\nCustomer: ${message}`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent }
      ],
      max_tokens: 450
    });

    const reply = completion.data.choices[0].message.content;
    return reply;
  }
};
