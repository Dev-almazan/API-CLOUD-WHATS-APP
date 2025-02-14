
import config from '../../config.js';
import filesManager from '../controllers/files.js'


class WhatsAppMiddleware {

  
    validateToken = (req, res, next) => {
<<<<<<< HEAD
=======

>>>>>>> 8829c0e6604e07ae4c7609b3afe2f05b0a2f5e38
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
<<<<<<< HEAD
=======
            }
            filesManager.registerLogs('./WhatsAppError.log', 'validateToken', 'Propertys hub: null');
            res.status(200).send("EVENT_RECIVED");
    }


    validateNotification = (req,res,next) => {
        const data = req.body;
        const field = data.entry[0].changes[0].field ? data.entry[0].changes[0].field : null; //tipo de notificacion
        const wa_id = data.entry[0].changes[0].value.contacts[0].wa_id ? data.entry[0].changes[0].value.contacts[0].wa_id : null;  //Identificador único del usuario de WhatsApp:
        const phone_number_id = data.entry[0].changes[0].value.metadata.phone_number_id ?  data.entry[0].changes[0].value.metadata.phone_number_id : null;  //Identificador único de tu número de teléfono de negocio:
        const message = data.entry[0].changes[0].value.messages[0].text.body ? data.entry[0].changes[0].value.messages[0].text.body : null; //detalle del mensaje
        const messageType = data.entry[0].changes[0]?.value.messages[0].type ? data.entry[0].changes[0]?.value.messages[0].type : null;  //tipo de mensaje

        if (wa_id !== null && phone_number_id !== null && message !== null && messageType !== null && field !== null)
        {
            if (messageType === "text" && field === "messages"){
               next()
>>>>>>> 8829c0e6604e07ae4c7609b3afe2f05b0a2f5e38
            }
            filesManager.registerLogs('./WhatsAppError.log', 'validateToken', 'Propertys hub: null');
            res.status(200).send("EVENT_RECIVED");
<<<<<<< HEAD
    }


    validateNotification = (req,res,next) => {
        //validamos que la solicitud no venga vacia
        if (Object.keys(req.body).length !== 0) 
        {
            const { entry = null } = req.body ? req.body : [];
            if(entry) //si existe el objeto entidad
            {
                next()
            }
           return res.status(400).send({ 'status': 'error', 'message': 'El cuerpo de la petición esta vacio' })
        }
        return res.status(400).send({ 'status': 'error', 'message': 'El cuerpo de la petición esta vacio' })
    }

=======
            filesManager.registerLogs('./WhatsAppError.log', 'validateNotification', `Property notification is not valid and  Property typeMessage is not valid  messageType : ${messageType},field : ${field} `)
        }    
        res.status(200).send("EVENT_RECIVED");
        filesManager.registerLogs('./WhatsAppError.log', 'validateNotification', `Propertyes missing : wa_id : ${wa_id} , phone_number_id :  ${phone_number_id}, message : ${message},  messageType : ${messageType},field : ${field}  `)
    }


    validatePropsMessage = (req, res, next) => {
        next()
    }
>>>>>>> 8829c0e6604e07ae4c7609b3afe2f05b0a2f5e38
}

export default new WhatsAppMiddleware();
