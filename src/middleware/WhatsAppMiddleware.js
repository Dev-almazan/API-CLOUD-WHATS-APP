
import config from '../../config.js';
import filesManager from '../controllers/files.js'


class WhatsAppMiddleware {

  
    validateToken = (req, res, next) => {
       
            let accessToken = config.envs.accessToken;
            const { hub } = req.body;
            if (hub) {
                next();
            }
            res.status(200).send("EVENT_RECIVED");
            filesManager.registerLogs('./WhatsAppError.log', 'validateToken', 'Property hub: null')
    }


    validateMessage = (req, res, next) => {
        const { value, field } = req.body;
        if(value && field) {
            next();
        }
        res.status(200).send("EVENT_RECIVED");
        filesManager.registerLogs('./WhatsAppError.log', 'validateMessage', 'Property messages and  contacts : null')
    }

    validatePropsMessage = (req, res, next) => {
        next()
    }
}

export default new WhatsAppMiddleware();