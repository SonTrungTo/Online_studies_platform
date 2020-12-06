const create = async (params, credentials, course) => {
    try {
        const response = await fetch('/api/courses/by/' + params.userId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: course
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

const listByInstructor = async (params, credentials, signal) => {
    try {
        const response = await fetch('/api/courses/by/' + params.userId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            signal: signal
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export {
    create, listByInstructor
};