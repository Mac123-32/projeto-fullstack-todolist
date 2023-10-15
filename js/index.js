import { } from '../js/server.js'

const tbody_element = document.querySelector('[data-tbody-tasks="tabela"]');

const create_element = (tag, text_inside_element = '') => {
    const element = document.createElement(tag);
    const insert_in_element = document.createTextNode(text_inside_element)
    element.appendChild(insert_in_element)
    console.log(element)
    return element
}

const task = {
    id: 1,
    title: 'Inscreva-se no canal Manual do Dev',
    created_at: '00 Janeiro de 2023 00:12',
    status: 'pending'
}

const createRow = (task) => {
    const { id, title, created_at, status } = task;

    const tr = create_element('tr');
    const tdtitle = create_element('td', title);

    tr.appendChild(tdtitle);
    tbody_element.appendChild(tr);
}

createRow(task);