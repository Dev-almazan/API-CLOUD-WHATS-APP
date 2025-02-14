

import config  from '../../config.js';
import filesManager from '../controllers/files.js'
import userModel from '../models/user.js';

 class WhatsAppController {
  
  confirmToken(req,res) {
    const challenge = req.query["hub.challenge"] ;
    filesManager.registerLogs('./whatsApp.log', "confirmWebhook", `hub_challenge: ${challenge}`)
    res.status(200).send(challenge);
  }

<<<<<<< HEAD
      async  recivedMessage(req, res) {
        const data = req.body;
        const wa = data.entry?.[0]?.changes?.[0]?.value?.contacts?.[0]?.wa_id;

        // Validación de datos de entrada
        if (!wa) {
          return res.status(400).json({ 'status': 'error', 'message': 'Datos de entrada inválidos' });
        }

        try {
          // Busca el usuario en la base de datos
          const user = await userModel.getUser({ 'wa_id': wa });

          if (user) {
            return res.status(200).json({ 'status': 'success', 'message': 'Usuario encontrado', 'data': user });
          } else {
            return res.status(404).json({ 'status': 'error', 'message': 'Usuario no encontrado' });
          }
        } catch (e) {
          console.error('Error en recivedMessage:', e); // Logging del error
          return res.status(500).json({ 'status': 'error', 'message': 'Error interno del servidor' });
        }
      }
=======
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
>>>>>>> 8829c0e6604e07ae4c7609b3afe2f05b0a2f5e38

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



