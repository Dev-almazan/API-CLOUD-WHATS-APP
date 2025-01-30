

import config  from '../../config.js';
import filesManager from '../controllers/files.js'

 class WhatsAppController {
  
  confirmToken(req,res) {
    const challenge = req.query["hub.challenge"] ;
    filesManager.registerLogs('./whatsApp.log', "confirmWebhook", `hub_challenge: ${challenge}`)
    res.status(200).send(challenge);
  }

  recivedMessage(req, res){
    const { value  } = req.body;
    let message = value.messages;
    let contact = value.contacts;
    filesManager.registerLogs('./whatsApp.log', "recivedMessage", `wa_id: ${contact[0].wa_id} , id_message :${message[0].id} , type : ${message[0].type == 'text' ? 'text' : 'Interactive' } `,"recivedMessage")
    res.status(200).send(message)
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


