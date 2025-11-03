import PromoCode from '../models/PromoCode.js';
import { asyncHandler } from '../middleware/ErrorHandler.js';

const validatePromoCode = asyncHandler(async (req, res, next) => {
  const { code } = req.body;

  if (!code) {
    res.status(400);
    throw new Error('Please provide a promo code');
  }

  const promo = await PromoCode.findOne({
    code: code.toUpperCase(),
    expiresAt: { $or: [{ $gt: new Date() }, { $eq: null }] }, 
  });

  if (!promo) {
    res.status(404);
    throw new Error('Invalid or expired promo code');
  }

  if (promo.isFlat) {
 
    res.status(400);
    throw new Error('This promo code type is not supported.');
  }

  res.status(200).json({
    success: true,
    discount: promo.discount,
    message: `${promo.discount * 100}% discount applied!`,
  });
});

export default validatePromoCode;