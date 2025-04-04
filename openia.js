require('dotenv').config();
const { OpenAI } = require('openai');
const readline = require('readline');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getOpenAIResponse(prompt) {
    try {
        
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7
        });

        
        console.log("Resposta do OpenAI:", response.choices[0].message.content);
    } catch (error) {
        
        if (error.response) {
            console.error('Erro ao chamar a API do OpenAI:', error.response.data);
        } else {
            console.error('Erro ao chamar a API do OpenAI:', error.message);
        }
    }
}

rl.question('Digite sua pergunta para o OpenAI: ', async (input) => {
    await getOpenAIResponse(input);
    rl.close(); 
});
