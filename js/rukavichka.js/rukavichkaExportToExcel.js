// // Код передбачений для пошуку кави на загальній сторінці  
// function rukavichkaExportToExcel() {     
//     const productCards = document.querySelectorAll('.fm-module-item');
//     console.log("productCards", productCards);
//     const filteredProducts = Array.from(productCards).filter(productCard => {
//         const productNameElement = productCard.querySelector('.fm-module-title');           
//         const productName = productNameElement ? productNameElement.innerText.toLowerCase() : ''; // Проверка существования элемента
//             return  productName.includes('кава') ||           
//                     productName.includes('кава мелена')  ||
//                     productName.includes('кава мел')  ||
//                     productName.includes('кава зернова') ||
//                     productName.includes('набір кави') ||                    
//                     productName.includes('напій кавовий') ||
//                     productName.includes('кава натуральна') ||
//                     productName.includes('натуральна смажена в зернах') ||
//                     productName.includes('натуральна смажена мелена') ||
//                     productName.includes('кава натуральна смажена мелена'); 
//     });

//     const data = [[ 'Название товара',            
//                     'Цена товара(текущая цена)',                      
//                     'Цена товара с учетом скидки(текущая цена)',
//                     'Старая цена товара(цена без скидки)',
//                     'Процент скидки(%)']];

//     filteredProducts.forEach((productCard) => {
//         const productNameElements = productCard.querySelectorAll('.fm-module-title'); 
//         const priceElement = productCard.querySelector('.fm-module-price-bottom > .fm-module-price-new');
               
//         // Проверяем наличие скидки
//         const specialPriceElement = productCard.querySelector('.fm-module-price-bottom > .fm-module-price-new.new-special-price');       
//         const salePriceElement = productCard.querySelector('.fm-module-price-top > .fm-module-price-old');
//         const discountPercentageElement = productCard.querySelector('.fm-module-stickers > .fm-module-sticker-discount');    

//         console.log("productNameElements:", productNameElements);        
//         console.log("priceElement:", priceElement);
                
//         console.log("specialPriceElement:", specialPriceElement);        
//         console.log("salePriceElement:", salePriceElement); 
//         console.log("discountPercentageElement:", discountPercentageElement);

//         if (!specialPriceElement && !salePriceElement && !discountPercentageElement) {
//             // Если элементов .new-special-price, .fm-module-price-old, .fm-module-sticker-discount нет внутри .fm-module-item,
//             // значит, товар не имеет скидки
//             const price = priceElement ? priceElement.innerText.trim() || '' : '';  
//             const productName = Array
//             .from(productNameElements)
//             .map(element => element.innerText.trim() || '')
//             .join(' ');     
//             const specialPrice = '';  // Пустое значение для товаров без скидки
//             const salePrice = '';     // Пустое значение для товаров без скидки
//             const discountPercentage = '';     // Пустое значение для товаров без скидки
//             data.push([ productName,    
//                         price,
//                         specialPrice,                     
//                         salePrice,
//                         discountPercentage]);
//         } else {
//             // Если элементы .new-special-price, .fm-module-price-old, .fm-module-sticker-discount найдены, значит, товар имеет скидку
//             const productName = Array
//                 .from(productNameElements)
//                 .map(element => element.innerText.trim() || '')
//                 .join(' ');
//                 // Если товар имеет скидку, то при формировании массива данных оставляем ячейку с 'Цена товара(текущая цена)' пустой
//             const price = '';  
//             const specialPrice = specialPriceElement ? specialPriceElement.innerText.trim() || '' : '';               
//             const salePrice = salePriceElement ? salePriceElement.innerText.trim() || '' : '';             
//             const discountPercentage = discountPercentageElement ? discountPercentageElement.innerText.trim() || '' : '';  
//             data.push([ productName,    
//                         price,
//                         specialPrice,                     
//                         salePrice,
//                         discountPercentage]);
//         }
//     });

//     if (data.length <= 1) {
//         alert("На странице нет данных для экспорта в Excel.");
//         return;
//     }

//     const wb = XLSX.utils.book_new();
//     const ws = XLSX.utils.aoa_to_sheet(data);
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//     XLSX.writeFile(wb, "data.xlsx");
// }

// export { rukavichkaExportToExcel };











// rukavichkaExportToExcel.js 

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

