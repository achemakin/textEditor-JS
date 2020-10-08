/* Модуль 10.
Разработать простой текстовый редактор с возможностью сохранения контента в LocalStorage.

Страница должна состоять из:
- Блока с текстом
- Кнопки «Редактировать»
- Кнопок «Сохранить» и «Отмена» (по умолчанию неактивных — disabled)

Механика работы страницы:
- при первой загрузке страницы в блоке с текстом отображается текст по умолчанию (любой);
- при нажатии на кнопку «Редактировать» блок с текстом становится редактируемым (contenteditable=true), кнопки «Сохранить» и «Отмена» становятся активными, а сама кнопка «Редактировать» — неактивной;
- при нажатии на кнопку «Сохранить» содержимое блока с текстом сохраняется в LocalStorage, а режим редактирования отключается (кнопки возвращаются в исходное состояние);
- при нажатии на кнопку «Отмена» содержимое блока с текстом заменяется на последний сохраненный вариант изLocalStorage, режим редактирования отключается;
- При следующих перезагрузках страницы содержимое блока с текстом автоматически подтягивается из LocalStorage (последний сохраненный вариант).*/

'use strict'

let btnEditEl = document.querySelector('.js-edit'),
    btnSaveEl = document.querySelector('.js-save'),
    btnCanselEl = document.querySelector('.js-cansel'),
    selectEl = document.querySelector('.js-select'),
    contentEl = document.querySelector('.js-content'),
    currentText;


function editOut() {
    contentEl.setAttribute('contenteditable', 'false');
    btnEditEl.removeAttribute('disabled');
    btnSaveEl.setAttribute('disabled', '');
    btnCanselEl.setAttribute('disabled', '');
    selectEl.removeAttribute('disabled');
}

function editIn() {
    contentEl.setAttribute('contenteditable', 'true');
    btnEditEl.setAttribute('disabled', '');
    btnSaveEl.removeAttribute('disabled');
    btnCanselEl.removeAttribute('disabled');
    selectEl.setAttribute('disabled', '');
}

// проверка при запуске редактора
if (!localStorage.start) {
    localStorage.clear();
    localStorage.setItem('start', contentEl.innerHTML);
} else {
    for (let i=0; i<localStorage.length; i++) {
        if (localStorage.key(i) == 'start') {
            continue;
        }
        
        let option = new Option(localStorage.key(i), localStorage.key(i));
        document.querySelector('.js-select').append(option);
    }
}

// кнопка Редактировать
btnEditEl.addEventListener('click', function() {     
    currentText = contentEl.innerHTML;
    editIn();  
})

// кнопка Записать
btnSaveEl.addEventListener('click', function() {
    let d = new Date();
    let dateOption = d.getDay() + '.' + (d.getMonth()+1) + '.' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    localStorage.setItem(dateOption, contentEl.innerHTML);

    let option = new Option(dateOption, dateOption);
    document.querySelector('.js-select').append(option); 
    
    editOut();
})

// кнопка Отменить
btnCanselEl.addEventListener('click', function() {
    contentEl.innerHTML = currentText;    
    editOut();
})

// выбор версии текста
selectEl.addEventListener('change', function(event) {   
    if (event.target.value !='') {
        contentEl.innerHTML = localStorage.getItem(event.target.value);
    }  
})
