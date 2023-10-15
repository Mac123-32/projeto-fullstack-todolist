const global_value_db = [];
const deixa_a_requisicao = true;

const local_storage_escrever = (data) => {
    const data_local_storage = JSON.stringify(data);
    localStorage.setItem('db', data_local_storage);
}

const local_storage_pega = () => {
    const get_data_local_storage = localStorage.getItem('db') || []
    return get_data_local_storage;
}

const verb_get = async (resolve_or_reject) => {
    const result = await new Promise((resolve, reject) => {
        setTimeout(() => {
            if (resolve_or_reject) {
                resolve(local_storage_pega())
            } else {
                reject(JSON.stringify([{ message: 'Erro server!' }]))
            }
        }, 2000)
    })
    return result
}

const verb_others = async (resolve_or_reject, data) => {
    const result = await new Promise((resolve, reject) => {

    })
}

const fetchTasksMock = async (verb_http = 'get', data) => {

    switch (verb_http) {
        case 'get':
            const data_db = await verb_get(deixa_a_requisicao)
            global_value_db = [...data_db];
            break;
        case 'put':
            if (global_value_db.length == 0) {
                const data_db = await verb_get(true);
                global_value_db = [...data_db]
                for (let i = 0; i < global_value_db.length; i++) {
                    if (global_value_db[i].id == data.id) {
                        global_value_db[i].title = data.title
                        break;
                    }
                }
                await verb_others(deixa_a_requisicao, global_value_db)
            } else {
                for (let i = 0; i < global_value_db.length; i++) {
                    if (global_value_db[i].id == data.id) {
                        global_value_db[i].title = data.title;
                        break;
                    }
                }
                await verb_others(deixa_a_requisicao, global_value_db);
            }
            break;
        case 'post':
            if (global_value_db.length == 0) {
                const data_db = await verb_get(true)
                global_value_db = [...data_db]
                global_value_db.push(data)
                await verb_others(deixa_a_requisicao, global_value_db)
            } else {
                global_value_db.push(data);
                await verb_others(deixa_a_requisicao, global_value_db);
            }
            break;
        case 'delete':
            if (global_value_db.length == 0) {
                const data_db = await verb_get(true);
                const aux = data_db.filter(datas => datas.id !== data.id)
                global_value_db = [...aux]
                await verb_others(deixa_a_requisicao, aux)
            } else {
                const aux = global_value_db.filter(datas => datas.id !== data.id)
                global_value_db = [...aux];
                await verb_others(deixa_a_requisicao, aux);
            }
            break;
        case 'patch':
            if (global_value_db.length == 0) {
                const data_db = await verb_get(true);
                global_value_db = [...data_db]
                for (let i = 0; i < global_value_db.length; i++) {
                    if (global_value_db[i].id == data.id) {
                        global_value_db[i].title = data.title
                        break;
                    }
                }
                await verb_others(deixa_a_requisicao, global_value_db)
            } else {
                for (let i = 0; i < global_value_db.length; i++) {
                    if (global_value_db[i].id == data.id) {
                        global_value_db[i].title = data.title;
                        break;
                    }
                }
                await verb_others(deixa_a_requisicao, global_value_db);
            }
            break;

        default:
            break;
    }
    return value;// retorno em string, precisa fazer JSON.parse(value)
}

const tasks = () => {
    return {
        id: 1,
        title: 'Inscreva-se no canal Manual do Dev',
        created_at: '00 Janeiro de 2023 00:12',
        status: 'pendente'
    }
}


export { fetchTasksMock, global_value_db , tasks}