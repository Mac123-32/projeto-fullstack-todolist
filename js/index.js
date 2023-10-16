import { fetchTasksMock, global_value_db } from '../js/server.js'

const tbody_element = document.querySelector('[data-tbody-tasks="tabela"]');
const input_element = document.querySelector('[data-js="form-submit-input"]');

const contructor_task_to_send = async (value) => {
    const id = Date.now();
    const aux_task = {
        id,
        title: value,
        created_at: new Date().toUTCString(),
        status: 'em andamento'
    }
    return aux_task;
}

const addTask = async (e) => {
    e.preventDefault();
    const value_input_client = e.target.childNodes[1].value;
    const new_task = await contructor_task_to_send(value_input_client)
    await fetchTasksMock('post', new_task);
    loadTasks('get');
}

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
    // tbody_element.appendChild(tr);
    return tr
}

const loadTasks = async (value) => {
    // para evitar fazer varios reloads desnecessarios na tela
    const fragment = document.createDocumentFragment();
    if (global_value_db.length == 0 ) {
        const tasks = await fetchTasksMock('get');
        tasks.forEach(task => {
            fragment.appendChild(createRow(task));
        })
        tbody_element.appendChild(fragment);
    } else {
        const tasks = await fetchTasksMock(value);
        tasks.forEach( task => {
            tbody_element.appendChild(createRow(task))
        })
        
    }

}

loadTasks();

tbody_element.addEventListener('click', (e) => {
    console.log(e.target)
})

input_element.addEventListener('submit', addTask)