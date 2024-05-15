import cheerio from 'cheerio'; // Импорт библиотеки Cheerio
import XLSX from 'xlsx'; // Импорт библиотеки XLSX

// Функция для скрапинга страницы и экспорта данных в Excel
function rukavichkaExportToExcel(html) {
    const $ = cheerio.load(html); // Загрузка HTML-кода страницы в Cheerio

    const productCards = $('.fm-module-item'); // Находим все карточки товаров
    const data = [['Название товара', 'Цена товара', 'Специальная цена', 'Старая цена', 'Процент скидки']];

    // Проходим по каждой карточке товара и извлекаем информацию
    productCards.each((index, element) => {
        const productName = $(element).find('.fm-module-title').text().trim(); // Название товара
        const price = $(element).find('.fm-module-price-bottom .fm-module-price-new').text().trim(); // Цена товара
        const specialPrice = $(element).find('.fm-module-price-bottom .new-special-price').text().trim(); // Специальная цена
        const oldPrice = $(element).find('.fm-module-price-top .fm-module-price-old').text().trim(); // Старая цена
        const discount = $(element).find('.fm-module-stickers .fm-module-sticker-discount').text().trim(); // Процент скидки

        data.push([productName, price, specialPrice, oldPrice, discount]); // Добавляем данные в массив

        console.log('Название товара:', productName);
        console.log('Цена товара:', price);
        console.log('Специальная цена:', specialPrice);
        console.log('Старая цена:', oldPrice);
        console.log('Процент скидки:', discount);
    });

    if (data.length <= 1) {
        alert("На странице нет данных для экспорта в Excel.");
        return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
}

export { rukavichkaExportToExcel };

