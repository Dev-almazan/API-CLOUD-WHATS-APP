


import dotenv from 'dotenv';

class config {
    constructor() {
        
        this.dotenv = dotenv;
        this.dotenv.config();

        this.envs = {
            port: process.env.PORT || 0,
            userToken: process.env.USER_TOKEN || null,
            accessToken: process.env.ACCESS_TOKEN || null,
            origin: process.env.ORIGIN || '',
            methods: process.env.METHODS || '',
            credentials: process.env.CREDENTIALS || ''
        };

    }

    response(http, message, types, result) {
        return {
            status_http: http,
            message: message,
            type: types,
            results: result
        };
    }


    hasProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    }
}

export default new config();