import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Deal from './models/Deal.js';
import User from './models/User.js';
import Claim from './models/Claim.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const deals = [
  {
    title: "AWS Activate",
    description: "$1,000 in AWS Credits for 2 years.",
    partnerName: "Amazon Web Services",
    logoUrl: `https://img.logo.dev/amazon.com?token=${process.env.LOGO_DEV_API_KEY}`,
    category: "Cloud",
    accessLevel: "restricted", // Locked
  },
  {
    title: "Notion Plus",
    description: "6 months free of Notion Plus for startups.",
    partnerName: "Notion",
    logoUrl: `https://img.logo.dev/motionplusmore.com?token=${process.env.LOGO_DEV_API_KEY}`,
    category: "Productivity",
    accessLevel: "public", // Open
  },
  {
    title: "Linear Standard",
    description: "Review and bug tracking for high-performance teams.",
    partnerName: "Linear",
   logoUrl: `https://img.logo.dev/linear.app?token=${process.env.LOGO_DEV_API_KEY}`,
    category: "Productivity",
    accessLevel: "restricted",
  }
];

const importData = async () => {
  try {
    await Deal.deleteMany(); // Clear existing deals
    await Deal.insertMany(deals);
    console.log('✅ Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

importData();