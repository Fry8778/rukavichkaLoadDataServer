// server.js

const express = require('express');
const scrapeRouter = require('./routes/scrape');

const app = express();
const PORT = 3000;

app.use('/scrape', scrapeRouter);

app.listen(PORT, () => {
    console.log(`Сервер запущено на порті ${PORT}`);
});


module.exports = app; // Экспорт объекта приложения Express
