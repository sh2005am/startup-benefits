import express from 'express';
import { 
  getDeals, 
  getDealById, 
  claimDeal, 
  getMyClaims 
} from '../controllers/dealController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', getDeals);

// Protected Routes
router.get('/my-claims', protect, getMyClaims); 
router.get('/:id', getDealById);
router.post('/:id/claim', protect, claimDeal);

export default router;