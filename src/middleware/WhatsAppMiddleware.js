
import config from '../../config.js';
import filesManager from '../controllers/files.js'

const validateToken = (req, res, next) => {
    try{
        let accessToken = config.envs.accessToken;
        let tokenFb = req.query["hub.verify_token"] ? req.query["hub.verify_token"] : "hub.verify_token";
        let challenge = req.query["hub.challenge"] ? req.query["hub.challenge"] : "hub.challenge" ;
        if(challenge !== null && tokenFb !== null && tokenFb == accessToken)
        {
            next();
        }
        else
        {
            res.status(421).send(config.response("421",`${challenge} o ${tokenFb} invalido`, "accessToken"));
        }
    }
    catch(e)
    {
        res.status(421).send(config.response("421", e, "accessToken"));
    }  
}

const  validateMessage=(req,res,next)=>
{
    //validamos que contenga las propiedades necesarias contacts && messages
    if (!config.hasProperty(req.body.value, "messages") && !config.hasProperty(req.body.value,"contacts") )
    {
        res.status(200).send("EVENT_RECIVED"); 
        filesManager.registerLogs('./WhatsAppError.log', 'validateMessage','Property messages and  contacts : null' ) 
    }
    next();
}

export { validateToken, validateMessage };