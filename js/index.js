import { fetchTasksMock, global_value_db } from './server'

const deixa_a_requisicao = true;
const tbody_element = document.querySelector('[data-tbody-tasks="tabela"]');



const create_element = (tag, text_inside_element = '') => {
    const element = document.createElement(tag);
    const insert_in_element = document.createTextNode(text_inside_element)
    element.appendChild(insert_in_element)
    return element
}

const createRow = (task) => {
    const { id, title, created_at, status } = tasks;

    const tr = create_element('tr');
    const tdtitle = create_element('td', 'titulo da task');
}

createRow({})