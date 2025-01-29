
import express from 'express';
import WhatsAppMiddleware from '../middleware/WhatsAppMiddleware.js';
import WhatsAppController  from '../controllers/whatsAppController.js';

const router = express.Router();

router.get('/', WhatsAppMiddleware.validateToken,WhatsAppController.confirmToken); // para verificar token de acceso
router.post('/',WhatsAppMiddleware.validateMessage,WhatsAppController.recivedMessage);
router.post('/send',WhatsAppMiddleware.validatePropsMessage,WhatsAppController.sendMessage);

export default router;
