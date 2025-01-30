
import config from '../../config.js';
import filesManager from '../controllers/files.js'


class WhatsAppMiddleware {

  
    validateToken = (req, res, next) => {

            const mode = req.query["hub.mode"] ? req.query["hub.mode"] : false;
            const token = req.query["hub.verify_token"] ? req.query["hub.verify_token"] : false;
            const challenge = req.query["hub.challenge"] ? req.query["hub.challenge"] : false ;

            if(mode && challenge && token) {
                if (token == config.envs.accessToken)
                {
                    next();
                }
                filesManager.registerLogs('./WhatsAppError.log', 'validateToken', 'Access token invalid')
                res.status(200).send("EVENT_RECIVED");
            }
            filesManager.registerLogs('./WhatsAppError.log', 'validateToken', 'Propertys hub: null');
            res.status(200).send("EVENT_RECIVED");
    }


    validateMessage = (req,res,next) => {
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