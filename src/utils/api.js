export const BASE_URL = process.env.REACT_APP_URL


const queryString = params => '?' + Object.keys(params).map(key => `${ key }=${ encodeURIComponent(params[key]) }`).join('&');


const bodyMethod = ['POST', 'PUT'];

const request = async(partialUrl, query, body, method = 'GET', type = 'application/json') => {
    const needBody = bodyMethod.includes(method);

    return (await fetch(BASE_URL + partialUrl + (query ? queryString(query) : ''), {
        headers: {
            ...needBody ? {'Content-type': type} : {}
        },
        ...needBody ? { body: type === 'application/json' ? JSON.stringify(body) : body } : {}
    })).json();
}


export class API {
    static get(partialUrl, query) {
        return request(partialUrl, query);
    }

    static delete(partialUrl, query) {
        return request(partialUrl, query, undefined, 'DELETE');
    }

    static post(partialUrl, body, query) {
        return request(partialUrl, query, body, 'POST');
    }
}