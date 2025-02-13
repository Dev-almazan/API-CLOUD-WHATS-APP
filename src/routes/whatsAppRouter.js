
import express from 'express';
import WhatsAppMiddleware from '../middleware/WhatsAppMiddleware.js';
import WhatsAppController  from '../controllers/whatsAppController.js';

const router = express.Router();

router.get('/webhooks', WhatsAppMiddleware.validateToken, WhatsAppController.confirmToken); // Configuración webhook
router.post('/webhooks',WhatsAppMiddleware.validateNotification,WhatsAppController.recivedMessage);

export default router;

