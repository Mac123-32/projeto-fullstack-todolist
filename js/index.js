const fetchTasksMock = async (resolve_or_reject) => {
    const value = await new Promise((resolve, reject) => {
        setTimeout(() => {
            if(resolve_or_reject) {
                resolve(JSON.stringify([{ title: 'meu teste', status: 'pending' }]))
            } else {
                reject(JSON.stringify([{ message: 'Erro server!' }]))
            }
        }, 2000)
    })
    return value;
}