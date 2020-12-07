const create = async (user) => {
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json"
            },
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const list = async (credentials, signal) => {
    try {
        const response = await fetch('/api/users', {
            method: 'GET',
            headers: {
                'Accept': "application/json",
                'Authorization': 'Bearer ' + credentials.t
            },
            signal: signal
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const read = async (params, signal) => {
    try {
        const response = await fetch('/api/users/' + params.userId, {
            method: 'GET',
            headers: {
                'Accept': "application/json"
            },
            signal: signal
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const update = async (params, credentials, user) => {
    try {
        const response = await fetch('/api/users/' + params.userId, {
            method: 'PUT',
            headers: {
                'Accept': "application/json",
                'Authorization': 'Bearer ' + credentials.t
            },
            body: user
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const remove = async (params, credentials) => {
    try {
        const response = await fetch('/api/users/' + params.userId, {
            method: 'DELETE',
            headers: {
                'Accept': "application/json",
                'Authorization': "Bearer " + credentials.t
            }
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export {
    create, list, read, update, remove
};