

import config  from '../../config.js';
import filesManager from '../controllers/files.js'
import userModel from '../models/user.js';

 class WhatsAppController {
  
      confirmToken(req,res) {
        const challenge = req.query["hub.challenge"] ;
        filesManager.registerLogs('./whatsApp.log', "confirmWebhook", `hub_challenge: ${challenge}`)
        res.status(200).send(challenge);
      }


      async  recivedMessage(req, res) {
        const data = req.body;
        const company_phone_id = data.entry?.[0]?.changes?.[0]?.value?.metadata?.phone_number_id;
        const company_number = data.entry?.[0]?.changes?.[0]?.value?.metadata?.display_phone_number;
        const client_phone_id = data.entry?.[0]?.changes?.[0]?.value?.contacts?.[0]?.wa_id;
        const client_user = data.entry?.[0]?.changes?.[0]?.value?.contacts?.[0]?.profile.name;
        const message = data.entry?.[0]?.changes?.[0]?.value?.messages[0];
        
        const result = await userModel.insertOrUpdateData(client_phone_id, {
          company_number: company_number,
          company_number_id: company_phone_id,
          client_number_id: client_phone_id,
          client_username: client_user,
          messages: message
        })
        
        result !== false ? res.status(200).send('EVENT_RECIVED') : res.status(401).send('Hubo un problema al crear el usuario');
        
      }



   /** 
    
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
   async postApi(url, accessToken, datos, res) {
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
   */

}

export default new WhatsAppController();



