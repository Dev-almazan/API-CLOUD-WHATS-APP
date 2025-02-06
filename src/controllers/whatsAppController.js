

import config  from '../../config.js';
import filesManager from '../controllers/files.js'

 class WhatsAppController {
  
  confirmToken(req,res) {
    const challenge = req.query["hub.challenge"] ;
    filesManager.registerLogs('./whatsApp.log', "confirmWebhook", `hub_challenge: ${challenge}`)
    res.status(200).send(challenge);
  }

  recivedMessage(req, res){
    const data = req.body;
    const field = data.entry[0].changes[0].field ; //tipo de notificacion
    const wa_id = data.entry[0].changes[0].value.contacts[0].wa_id ; //Identificador único del usuario de WhatsApp:
    const phone_number_id = data.entry[0].changes[0].value.metadata.phone_number_id ;  //Identificador único de tu número de teléfono de negocio:
    const message = data.entry[0].changes[0].value.messages[0].text.body ; //detalle del mensaje
    const messageType = data.entry[0].changes[0]?.value.messages[0].type ;
    
    filesManager.registerLogs('./whatsApp.log', "recivedMessage", `New message : wa_id : ${wa_id} , phone_number_id :  ${phone_number_id}, message : ${message},  messageType : ${messageType},field : ${field}  `)
    res.status(200).send("EVENT_RECIVED");
  }

   sendMessage(req, res) {
     const url = `${config.envs.wa_url}/${config.envs.wa_phone_test}/messages`; 
     const { phone , message } = req.body;
     WhatsAppController.postApi(url,config.envs.wa_api_access_token_test,WhatsAppController.setMessageText(phone,message),res);
   } 

   static setMessageText(phone,message){
     return {
       "messaging_product": "whatsapp",
       "to": phone,
          "type": "text",
          "text": {
         "body": message
       }
     }
   }

   static async postApi(url, accessToken, datos, res) {
     try {
       const response = await fetch(url, {
         method: 'POST',
         body: JSON.stringify(datos),
         headers: {
           'content-type': 'application/json',
           'Authorization': `Bearer ${accessToken}`
         }
       });
       const data = await response.json();
       response.status == 200 ? res.status(response.status).send("Mensaje enviado correctamente.") : res.status(response.status).send(data) 
     }
     catch (error) {
       res.status(400).send(error)
     }
   }

}

export default new WhatsAppController();


