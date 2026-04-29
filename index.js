const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot Online'));
app.listen(process.env.PORT || 3000);

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        // Deixe apenas isso, o bot vai usar o que estiver no sistema
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});
client.on('qr', qr => qrcode.generate(qr, {small: true}));
client.on('ready', () => console.log('Bot Pronto!'));
client.initialize();
