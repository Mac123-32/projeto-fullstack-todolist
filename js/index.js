import { tasks } from '../js/server.js'

const tbody_element = document.querySelector('[data-tbody-tasks="tabela"]');

const create_element_td_text = ( text_inside_element = '') => {
    const element = document.createElement('td');

    if (text_inside_element) {
        const insert_in_element = document.createTextNode(text_inside_element)
        element.appendChild(insert_in_element)
    }

    return element
}

const create_element_td_html = (type_html = 'span', value = 'pendente') => {
    if(type_html == 'select') {
        const optoins = ['pendente', 'em andamento', 'concluída'].map(data => {
            const option = document.createElement('option');
            option.setAttribute('value', data);
            const value_text = document.createTextNode(data)
            option.appendChild(value_text);
            return option
        })
        const html_td = document.createElement('td');
        const html_select = document.createElement('select');
        optoins.forEach( data => {
            html_select.appendChild(data)
        })
        html_select.value = value;
        html_td.appendChild(html_select);
        return html_td;
    } else {
        const td = document.createElement('td');

        const button_edit = document.createElement('button')
        button_edit.classList.add('btn-action')

        const element_html_span_edit = document.createElement('span');
        element_html_span_edit.classList.add('material-symbols-outlined');
        const text_inside_span = document.createTextNode('edit');
        element_html_span_edit.appendChild(text_inside_span);
        
        button_edit.appendChild(element_html_span_edit)

        const button_delete = document.createElement('button');
        button_delete.classList.add('btn-action');

        const element_html_span_delet = document.createElement('span');
        element_html_span_delet.classList.add('material-symbols-outlined');
        const text_inside_span_delet = document.createTextNode('delete');
        element_html_span_delet.appendChild(text_inside_span_delet);

        button_delete.appendChild(element_html_span_delet);
        

        td.appendChild(button_edit);
        td.appendChild(button_delete);
        return td
    }
}

const createRow = (task) => {
    const { id, title, created_at, status } = task;

    const tr = document.createElement('tr');
    const tdtitle = create_element_td_text(title);
    const tdcreated_at = create_element_td_text(created_at);
    const tdselect = create_element_td_html('select', status);
    const tdspan = create_element_td_html('span');

    tr.appendChild(tdtitle);
    tr.appendChild(tdcreated_at);
    tr.appendChild(tdselect);
    tr.appendChild(tdspan);
    tbody_element.appendChild(tr);
}

createRow(tasks());