const express = require('express');
const router = express.Router();
const { scrapePage } = require('../js/rukavichka.js/scraper');

router.get('/', async (req, res) => {
    try {
        const data = await scrapePage();
        res.json(data);
    } catch (error) {
        console.error('Помилка при скрапінгу або обробці запиту:', error);
        res.status(500).json({ error: 'Помилка при скрапінгу або обробці запиту' });
    }
});

module.exports = router;
