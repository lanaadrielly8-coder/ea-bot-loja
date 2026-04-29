const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot Online'));
app.listen(process.env.PORT || 3000);

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        // Agora o bot vai procurar o Chrome sozinho, sem caminho fixo
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-zygote'
        ],
    }
});
client.on('qr', qr => qrcode.generate(qr, {small: true}));
client.on('ready', () => console.log('Bot Pronto!'));
client.initialize();
