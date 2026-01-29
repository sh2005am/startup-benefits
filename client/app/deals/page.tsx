'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/authContext';
import { motion } from 'framer-motion';
import { Search, Lock, Unlock, Loader2, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Deal {
  _id: string;
  title: string;
  description: string;
  partnerName: string;
  logoUrl: string;
  category: string;
  accessLevel: 'public' | 'restricted';
}

export default function DealsPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [claiming, setClaiming] = useState<string | null>(null); // Track which deal is being claimed

  // 1. Fetch Deals on Load
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/deals`);
        setDeals(data);
        setFilteredDeals(data);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  // 2. Search Filter Logic
  useEffect(() => {
    const results = deals.filter(deal => 
      deal.title.toLowerCase().includes(search.toLowerCase()) ||
      deal.category.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDeals(results);
  }, [search, deals]);

  // 3. Handle Claim
  const handleClaim = async (dealId: string) => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    setClaiming(dealId);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/deals/${dealId}/claim`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } } // Send JWT
      );
      router.push('/dashboard'); // Go to dashboard on success
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to claim');
    } finally {
      setClaiming(null);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Available Perks</h1>
            <p className="text-gray-400">Exclusive software deals for your startup.</p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            <input 
              type="text"
              placeholder="Search deals (e.g. AWS, Cloud)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          </div>
        ) : (
          /* Deals Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDeals.map((deal, index) => {
              // Logic: Is this deal locked for the current user?
              const isLocked = deal.accessLevel === 'restricted' && !user?.isVerified;

              return (
                <motion.div
                  key={deal._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-6 rounded-2xl border ${isLocked ? 'border-red-500/20 bg-red-900/5' : 'border-white/10 bg-white/5'} backdrop-blur-sm hover:border-white/20 transition-all group`}
                >
                  {/* Category Badge */}
                  <span className="absolute top-4 right-4 text-xs font-medium px-2 py-1 rounded bg-white/10 text-gray-300">
                    {deal.category}
                  </span>

                  <div className="flex items-center gap-4 mb-4">
                    {/* Placeholder Logo */}
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-xl font-bold text-white">
                      {deal.partnerName[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{deal.title}</h3>
                      <p className="text-sm text-gray-400">{deal.partnerName}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-6 min-h-[40px]">
                    {deal.description}
                  </p>

                  <button
                    onClick={() => !isLocked && handleClaim(deal._id)}
                    disabled={isLocked || claiming === deal._id}
                    className={`w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                      isLocked 
                        ? 'bg-transparent border border-white/10 text-gray-500 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-500 text-white'
                    }`}
                  >
                    {claiming === deal._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : isLocked ? (
                      <><Lock className="w-4 h-4" /> Locked (Verify to Unlock)</>
                    ) : (
                      <><Unlock className="w-4 h-4" /> Claim Deal</>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}