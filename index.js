cconst { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const app = express();

// Isso evita que o Render derrube o bot por inatividade
app.get('/', (req, res) => res.send('Bot da EA Moto Peças Online!'));
app.listen(process.env.PORT || 3000);

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        // ESSA LINHA ABAIXO É A MAIS IMPORTANTE:
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || null,
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
    // Gera o QR Code no terminal do Render
    qrcode.generate(qr, {small: true});
    console.log('SCANNEIE O QR CODE ACIMA PARA CONECTAR');
});

client.on('ready', () => {
    console.log('O Bot da EA Moto Peças está PRONTO e ONLINE!');
});

// Inicializa o bot
client.initialize();
