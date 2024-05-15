// scraper.js

const cheerio = require('cheerio');

async function scrapePage() {
    try {
        const fetch = await import('node-fetch');
        const response = await fetch.default('https://market.rukavychka.ua/search/?search=%D0%BA%D0%B0%D0%B2%D0%B0');
        const html = await response.text();
        return scrape(html);
    } catch (error) {
        throw error;
    }
}

function scrape(html) {
    const $ = cheerio.load(html);
    const productCards = $('.fm-module-item');
    const data = [];

    productCards.each((index, element) => {
        const productName = $(element).find('.fm-module-title').text().trim();
        const price = $(element).find('.fm-module-price-bottom .fm-module-price-new').text().trim();
        const specialPrice = $(element).find('.fm-module-price-bottom .new-special-price').text().trim();
        const oldPrice = $(element).find('.fm-module-price-top .fm-module-price-old').text().trim();
        const discount = $(element).find('.fm-module-stickers .fm-module-sticker-discount').text().trim();

        data.push({ productName, price, specialPrice, oldPrice, discount });
    });

    return data;
}

module.exports = { scrapePage, scrape }; // Экспорт функций скрапинга
