
import config from '../../config.js';
import filesManager from '../controllers/files.js'

class WhatsAppController {

  confirmToken(req,res) {
    res.status(200).send(config.response("200", "Token de acceso valido", "accessToken"));
  }

  recivedMessage(req, res){
    let message = req.body.value.messages
    let contact = req.body.value.contacts
    filesManager.registerLogs('./whatsApp.log', "recivedMessage", `wa_id: ${contact[0].wa_id} , id_message :${message[0].id} , type : ${message[0].type == 'text' ? 'text' : 'Interactive' } `,"recivedMessage")
    res.status(200).send(message)
  } 

}

export default new WhatsAppController();


