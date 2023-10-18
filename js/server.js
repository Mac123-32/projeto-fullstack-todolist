let global_value_db = [];
const deixa_a_requisicao = true;

const local_storage_escrever = (data) => {
    const data_local_storage = JSON.stringify(data);
    localStorage.setItem('db', data_local_storage);
}

const local_storage_pega = () => {
    const get_data_local_storage = localStorage.getItem('db') || [];
    return get_data_local_storage;
}

const verb_get = async (resolve_or_reject) => {
    const result = await new Promise((resolve, reject) => {
        setTimeout(() => {
            if (resolve_or_reject) {
                const res = JSON.parse(local_storage_pega())
                resolve(res)
            } else {
                reject(JSON.stringify([{ message: 'Erro server!' }]))
            }
        }, 2000)
    })
    return result;
}

const verb_others = async (resolve_or_reject, data) => {
    await new Promise((resolve, reject) => {
        if (resolve_or_reject) {
            local_storage_escrever(data);
            setTimeout(() => {
                resolve(true)
            }, 2000);
        } else {
            reject({ message: "Error server conection!!" });
        }
    })
}

const fetchTasksMock = async (verb_http = 'get', data) => {
    const [id, value_change] = data != null ? Object.keys(data) : [] ;
    
    switch (verb_http) {
        case 'get':
            const data_db = await verb_get(deixa_a_requisicao)
            global_value_db = data_db;
            break;
        case 'put':
            console.log(id, value_change, data, data[value_change]);
            for (let i = 0; i < global_value_db.length; i++) {
                if (global_value_db[i].id == data[id]) {
                    global_value_db[i][value_change] = data[value_change];
                    break;
                }
            }
            await verb_others(deixa_a_requisicao, global_value_db);
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
            console.log(data[id]);
            const aux = global_value_db.filter(datas => datas.id != data[id])
            global_value_db = aux;
            console.log(global_value_db)
            console.log(aux);
            await verb_others(deixa_a_requisicao, aux);
            break;
        case 'patch':
            console.log(id, value_change, data, data[value_change]);
            for (let i = 0; i < global_value_db.length; i++) {
                if (global_value_db[i].id == data[id]) {
                    global_value_db[i][value_change] = data[value_change];
                    break;
                }
            }
            await verb_others(deixa_a_requisicao, global_value_db);
            break;

        default:
            break;
    }
    return global_value_db;// retorno em string, precisa fazer JSON.parse(value)
}


export { fetchTasksMock, global_value_db }