import { signout } from "./api-auth";

const authenticate = (jwt, cb) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('jwt', JSON.stringify(jwt));
    }
    cb();
};

const updateUser = (user, cb) => {
    if (typeof window !== 'undefined') {
        if (sessionStorage.getItem('jwt')) {
            const auth = JSON.parse(sessionStorage.getItem('jwt'));
            auth.user = {
                _id: user._id,
                name: user.name,
                email: user.email,
                educator: user.educator
            };
            sessionStorage.setItem('jwt', JSON.stringify(auth));
            cb();
        }
    }
};

const isAuthenticated = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    if (sessionStorage.getItem('jwt')) {
        return JSON.parse(sessionStorage.getItem('jwt'));
    } else {
        return false;
    }
};

const clearJWT = (cb) => {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('jwt');
    }
    cb();
    signout().then(data => {
        data.cookie = 't=; expires=Thur, 01 Jan 1970 00:00:00 UTC;' +
        'path=/;';
    });
};

export default {
    authenticate, isAuthenticated, clearJWT, updateUser
};