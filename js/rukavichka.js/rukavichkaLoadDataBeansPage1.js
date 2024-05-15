import fetch from 'node-fetch'; // Импорт библиотеки node-fetch
import { rukavichkaExportToExcel } from './rukavichkaExportToExcel.js'; // Импорт функции экспорта в Excel

// Функция для загрузки страницы и выполнения скрапинга
async function rukavichkaLoadDataBeansPage1() {
    try {
        // Загрузка HTML-кода страницы
        const response = await fetch('https://market.rukavychka.ua/search/?search=%D0%BA%D0%B0%D0%B2%D0%B0');
        const html = await response.text();

        // Выполнение функции экспорта в Excel
        rukavichkaExportToExcel(html);
    } catch (error) {
        console.error('Ошибка при загрузке страницы или выполнении скрапинга:', error);
    }
}

export { rukavichkaLoadDataBeansPage1 }; // Экспорт функции загрузки и скрапинга
