

import config  from '../../config.js';
import filesManager from '../controllers/files.js'

class WhatsAppController {

  confirmToken(req,res) {
    const { value } = req.body;
    res.status(200).send(config.response("200", value , "accessToken"));
  }

  recivedMessage(req, res){
    const { value  } = req.body;
    let message = value.messages;
    let contact = value.contacts;
    filesManager.registerLogs('./whatsApp.log', "recivedMessage", `wa_id: ${contact[0].wa_id} , id_message :${message[0].id} , type : ${message[0].type == 'text' ? 'text' : 'Interactive' } `,"recivedMessage")
    res.status(200).send(message)
  }

  async sendMessage(req, res) {
        try {
          const response = await fetch(`${config.envs.wa_url}/${config.envs.wa_phone_test}/messages`, {
            method: 'POST',
            body: JSON.stringify(req.body),
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${config.envs.wa_api_access_token}`
            }
          });
          const data = await response.json();
          res.status(200).send('Mensaje enviado correctamente');
        } catch (error) {
            res.status(400).send({ 'detail': error.message })
        }
  }
}

export default new WhatsAppController();


