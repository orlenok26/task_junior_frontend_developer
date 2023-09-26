let table = document.querySelector('.table');
let url = 'https://jsonplaceholder.typicode.com/posts';

async function tableHtml (url, table) {
    let response = await fetch(url);
    let array = await response.text();
    let items = JSON.parse(array);
    items.forEach(item => {
        let tr = document.createElement('tr');
        tr.classList.add('column');
        //строка userID
        let userId = document.createElement('td');
        userId.classList.add('row', 'row-figures');
        userId.innerHTML = item.userId;
        //строка id
        let id = document.createElement('td');
        id.classList.add('row', 'row-figures');
        id.innerHTML = item.id;
        //строка title
        let title = document.createElement('td');
        title.classList.add('row');
        title.innerHTML = item.title;
        //строка body
        let body = document.createElement('td');
        body.classList.add('row');
        body.innerHTML = item.body
        //добавление столбцов в таблицу
        tr.appendChild(userId);
        tr.appendChild(id);
        tr.appendChild(title);
        tr.appendChild(body);
        //строки
        table.appendChild(tr);
    });

}
tableHtml (url, table)
