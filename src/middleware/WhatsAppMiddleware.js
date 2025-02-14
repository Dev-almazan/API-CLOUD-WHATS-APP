
import config from '../../config.js';
import filesManager from '../controllers/files.js'


class WhatsAppMiddleware {

  
    validateToken = (req, res, next) => {
        if (Object.keys(req.body).length !== 0) 
        {
            const mode = req.query["hub.mode"] ? req.query["hub.mode"] : false;
            const token = req.query["hub.verify_token"] ? req.query["hub.verify_token"] : false;
            const challenge = req.query["hub.challenge"] ? req.query["hub.challenge"] : false;

            if (mode && challenge && token) {
                if (token == config.envs.accessToken) {
                    next();
                }
                filesManager.registerLogs('./WhatsAppError.log', 'validateToken', 'Access token invalid')
                return res.status(400).send("EVENT_RECIVED");
            }
            filesManager.registerLogs('./WhatsAppError.log', 'validateToken', 'El cuerpo no contiene los accesos necesarios')
            return res.status(400).send({ 'status': 'error', 'message': 'El cuerpo no contiene los accesos necesarios' })
        }
        return res.status(400).send({ 'status': 'error', 'message': 'El cuerpo de la petición esta vacio' })
    }

        
    validateNotification = (req,res,next) => 
    {
        //validamos que la solicitud no venga vacia
        if (Object.keys(req.body).length !== 0) 
        {
            const { entry = null } = req.body ? req.body : [];
            entry?.[0]?.changes?.[0]?.field == 'messages' ? next() : res.status(400).send({ 'status': 'error', 'message': 'El cuerpo de la petición no contiene un mensaje' });
        }
        else
        {
            res.status(400).send({ 'status': 'error', 'message': 'El cuerpo de la petición esta vacio' })  
        }
    }

}

export default new WhatsAppMiddleware();
