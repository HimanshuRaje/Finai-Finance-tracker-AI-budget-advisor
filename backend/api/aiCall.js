import { Groq } from 'groq-sdk';

const groq = new Groq();

const chatCompletion = await groq.chat.completions.create({
  "messages": [
    {
      "role": "user",
      "content": ""
    }
  ],
  "model": "meta-llama/llama-4-scout-17b-16e-instruct",
  "temperature": 1,
  "max_completion_tokens": 1024,
  "top_p": 1,
  "stream": true,
  "stop": null
});

for await (const chunk of chatCompletion) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}