const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Manter o servidor vivo no Render
app.get('/', (req, res) => {
  res.send('Bot da EA Moto Peças Online!');
});
app.listen(port, () => {
  console.log(`Servidor na porta ${port}`);
});

const client = new Client({
    authStrategy: new LocalAuth(),
      puppeteer: {
        executablePath: '/opt/render/.cache/puppeteer/chrome/linux-146.0.7680.31/chrome-linux64/chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
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
    console.log('--- SCANNEIE O QR CODE ABAIXO ---');
});

client.on('ready', () => {
    console.log('Bot da EA Moto Peças pronto e conectado!');
});

// Resposta automática simples
client.on('message', message => {
	if(message.body.toLowerCase() === 'oi') {
		client.sendMessage(message.from, 'Olá! Bem-vindo à EA Moto Peças. Como podemos ajudar?');
	}
});

client.initialize();
