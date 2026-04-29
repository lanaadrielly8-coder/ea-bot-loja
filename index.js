const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot Online!'));
app.listen(process.env.PORT || 3000);

const client = new Client({
    authStrategy: new LocalAuth(),
  puppeteer: {
        // ESSA LINHA É A PONTE QUE FALTAVA:
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-zygote'
        ],
    }
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('SCANNEIE O QR CODE ABAIXO:');
});

client.on('ready', () => {
    console.log('Bot da EA Moto Peças pronto!');
});

client.initialize();
