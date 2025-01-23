
import express from 'express';
import { validateToken, validateMessage } from '../middleware/WhatsAppMiddleware.js';
import WhatsAppController  from '../controllers/whatsAppController.js';

const router = express.Router();

router.post('/verify',validateToken,WhatsAppController.confirmToken);
router.post('/message', validateMessage, WhatsAppController.recivedMessage);

export default router;
