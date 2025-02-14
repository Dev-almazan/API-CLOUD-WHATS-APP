import dotenv from 'dotenv';
class config {
    constructor() {
        
        this.dotenv = dotenv;
        this.dotenv.config();

        this.envs = {
            db: process.env.DB_URI || '',
            port: process.env.PORT || 0,
            userToken: process.env.USER_TOKEN || null,
            accessToken: process.env.ACCESS_TOKEN || null,
            origin: process.env.ORIGIN || '',
            methods: process.env.METHODS || '',
            credentials: process.env.CREDENTIALS || '',
            wa_phone_test: process.env.WA_PHONE_NUMBER_ID_TEST || 0,
            wa_api_access_token_test: process.env.CLOUD_API_ACCESS_TOKEN_TEST || null,
<<<<<<< HEAD
            wa_url: process.env.API_URL || ''
=======
            wa_url: process.env.API_URL || '',
            wa_account: process.env.WA_ACCOUNT || '',
>>>>>>> 8829c0e6604e07ae4c7609b3afe2f05b0a2f5e38
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
