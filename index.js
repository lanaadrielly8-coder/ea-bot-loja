const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot Online!'));
app.listen(port);

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        // Isso faz o código procurar o Chrome onde quer que o sistema o instale
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null, 
        handleSIGTERM: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-zygote'
        ],
    }
});
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('SCANNEIE O QR CODE ABAIXO:');
});

client.on('ready', () => console.log('Bot da EA Moto Peças pronto!'));

client.initialize();
