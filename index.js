const axios = require('axios');

let intervalId; // Untuk menyimpan ID interval

// Fungsi untuk mengirim pesan ke bot Telegram
async function sendMessage(chatId, message) {
    try {
        const response = await axios.post(`https://api.telegram.org/bot${botId}/sendMessage`, {
            chat_id: chatId,
            text: message
        });
        console.log('Message sent:', response.data);
    } catch (error) {
        if (error.response && error.response.data) {
            console.error('Meletup wak xD:', error.response.data);
        } else {
            console.error('Error occurred:', error.message);
        }
    }
}

// Fungsi untuk mengirim permintaan berulang kali
function sendRepeatedMessages(chatId, message, interval) {
    intervalId = setInterval(() => {
        sendMessage(chatId, message);
    }, interval);
}

// Menangani sinyal SIGINT (diaktifkan oleh Ctrl+C)
process.on('SIGINT', () => {
    console.log('Stopping script...');
    clearInterval(intervalId); // Membersihkan interval
    process.exit(); // Keluar dari proses
});

// Konfigurasi
const botId = '6714358005:AAGYNnnE49QJ5x1JDaYmNUQn64PRTLTPk3o';
const chatId = '7482635963';
const message = 'Woy penipu!! kontol';
const interval = 20;
sendRepeatedMessages(chatId, message, interval);
