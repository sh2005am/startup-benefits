// server/controllers/dealController.js
import Deal from '../models/Deal.js';
import Claim from '../models/Claim.js';

// @desc    Fetch all deals
// @route   GET /api/deals
// @access  Public
export const getDeals = async (req, res) => {
  try {
    const deals = await Deal.find({});
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single deal
// @route   GET /api/deals/:id
// @access  Public
export const getDealById = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (deal) {
      res.json(deal);
    } else {
      res.status(404).json({ message: 'Deal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Claim a deal
// @route   POST /api/deals/:id/claim
// @access  Private
export const claimDeal = async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }

    // 1. Check if Deal is Restricted and User is Verified
    if (deal.accessLevel === 'restricted' && !req.user.isVerified) {
      return res.status(403).json({ 
        message: 'This deal is restricted to verified users only.' 
      });
    }

    // 2. Check if already claimed
    const existingClaim = await Claim.findOne({
      user: req.user._id,
      deal: req.params.id,
    });

    if (existingClaim) {
      return res.status(400).json({ message: 'You have already claimed this deal' });
    }

    // 3. Create Claim
    const claim = await Claim.create({
      user: req.user._id,
      deal: req.params.id,
      status: 'approved', 
    });

    res.status(201).json(claim);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get user's claimed deals
// @route   GET /api/deals/my-claims
// @access  Private
export const getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ user: req.user._id }).populate('deal');
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};