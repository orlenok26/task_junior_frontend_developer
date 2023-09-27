let url = "https://jsonplaceholder.typicode.com/posts";

let table = document.querySelector(".table");


async function tableHtml(url, table) {
    let response = await fetch(url);
    let array = await response.text();
    let items = JSON.parse(array);
    items.forEach((item) => {
        let tr = document.createElement("tr");
        tr.classList.add("column");
        //строка userID
        let userId = document.createElement("td");
        userId.classList.add("row", "row-figures");
        userId.innerHTML = item.userId;
        //строка id
        let id = document.createElement("td");
        id.classList.add("row", "row-figures");
        id.innerHTML = item.id;
        //строка title
        let title = document.createElement("td");
        title.classList.add("row");
        title.innerHTML = item.title;
        //строка body
        let body = document.createElement("td");
        body.classList.add("row");
        body.innerHTML = item.body;
        //добавление столбцов в таблицу
        tr.appendChild(userId);
        tr.appendChild(id);
        tr.appendChild(title);
        tr.appendChild(body);
        //строки
        table.appendChild(tr);
    });
}
tableHtml(url, table);



//СОРТИРОВКА

function sortTable(n, type) {
    let table;
    table = document.getElementById("table");
    var rows, i, x, y, count = 0;
    var switching = true;

    // устанавливаем порядок по возрастанию
    var direction = "ascending";

    // переключение строк
    while (switching) {
        switching = false;
        var rows = table.rows;

        //Проходимся по всем срокам
        for (i = 1; i < (rows.length - 1); i++) {
            var Switch = false;

            // Получаем два элемента, которые надо сравнить между собой
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            // Проверяем направление сортировки
            if (direction == "ascending") {
                //сортируем по возрастанию
                if (type == "number") {
                    let num1 = parseInt(x.innerHTML)
                    let num2 = parseInt(y.innerHTML)
                    if (num1 > num2) {
                        Switch = true;
                        break;
                    }
                }
                else if (type == "string") {
                    if (x.innerHTML.toLowerCase() >
                        y.innerHTML.toLowerCase()) {
                        Switch = true;
                        break;
                    }
                }
                
                //проверяем направление сортировки
            } else if (direction == "descending") {
                //сортируем по убыванию
                if (type == "number") {
                    let num1 = parseInt(x.innerHTML)
                    let num2 = parseInt(y.innerHTML)
                    if (num2 > num1) {
                        Switch = true;
                        break;
                    }
                }
                else if (type == "string") {
                    if (x.innerHTML.toLowerCase() <
                        y.innerHTML.toLowerCase()) {
                        Switch = true;
                        break;
                    }
                }
            }
        }
        if (Switch) {
            //переключаем строк
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            count++;
        } else {

            //запуситить цикл в обратном порядке
            if (count == 0 && direction == "ascending") {
                direction = "descending";
                switching = true;
            }
        }
    }
}

let result = '';

//ПОИСК / ФИЛЬТРАЦИЯ

function tableSearch() {
    var phrase = document.getElementById('search-text');
    var table = document.getElementById('table');
    var regPhrase = new RegExp(phrase.value, 'i');
    var flag = false;
    for (var i = 0; i < table.rows.length; i++) {
        flag = false;
        for (var j = table.rows[i].cells.length - 1; j >= 0; j--) {
            flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
            if (flag) break;
        }
        if (flag) {
            // table.rows[i].style.display = "";
            table.rows[i].classList.add('flag');
        } else if ((' ' + table.rows[i].className + ' ').indexOf('column') > -1) {
            // result = table.rows[i].style.display = "none";
            table.rows[i].classList.add('none');
        }

    }

    if (!document.getElementsByClassName('flag').length) {
        let error = document.querySelector('.error');
        let alarm = document.querySelector('.alarm');
        error.style.display = "block";
        table.style.display = "none";
        alarm.style.display = "none";
        
    }
}

let btnReload = document.querySelector('.search-btn');
btnReload.addEventListener('click', function () {
    location.reload();
})

