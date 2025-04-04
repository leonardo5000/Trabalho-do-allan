require('dotenv').config();
const axios = require('axios');
const readline = require('readline');

const API_KEY = process.env.DEEPSEEK_API_KEY;
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getDeepSeekResponse(prompt) {
    try {
        const response = await axios.post(
            API_URL,
            {
                model: "deepseek-chat",  
                messages: [{ role: "user", content: prompt }], 
                temperature: 0.7 
            }, 
            {
                headers: { Authorization: `Bearer ${API_KEY}` }  
            }
        );
        
        
        const answer = response.data.choices[0].message.content;
        console.log("Resposta do DeepSeek:", answer);
    } catch (error) {
        console.error('Erro ao chamar a API do DeepSeek:', error.response?.data || error.message);
    }
}


function askQuestion() {
    rl.question('Digite sua pergunta: ', async (question) => {
        
        await getDeepSeekResponse(question);
        
        askQuestion();
    });
}

askQuestion();