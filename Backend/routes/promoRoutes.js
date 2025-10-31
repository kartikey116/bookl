import express from 'express';
import validatePromoCode from '../controllers/promoController.js';

const router = express.Router();

router.post('/', validatePromoCode);

export default router;
