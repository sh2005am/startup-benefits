'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ClaimedDeal {
  _id: string;
  deal: {
    title: string;
    partnerName: string;
    logoUrl: string;
    description: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  claimedAt: string;
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [claims, setClaims] = useState<ClaimedDeal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }

    const fetchClaims = async () => {
      if (!user) return;
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/deals/my-claims`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setClaims(data);
      } catch (error) {
        console.error("Error fetching claims:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchClaims();
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* User Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 p-8 rounded-3xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/10 flex flex-col md:flex-row items-center gap-6"
        >
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-3xl font-bold text-white">
            {user?.name?.[0].toUpperCase()}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
            <p className="text-gray-400">{user?.email}</p>
            <div className={`mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${user?.isVerified ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
              {user?.isVerified ? (
                <><CheckCircle2 className="w-3 h-3" /> Verified Founder</>
              ) : (
                <><AlertCircle className="w-3 h-3" /> Verification Pending</>
              )}
            </div>
          </div>
        </motion.div>

        {/* Claims List */}
        <h2 className="text-2xl font-bold text-white mb-6">Your Active Perks</h2>
        
        {claims.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5 border-dashed">
            <p className="text-gray-400 mb-4">You haven't claimed any deals yet.</p>
            <button 
              onClick={() => router.push('/deals')}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
            >
              Browse Deals
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {claims.map((claim, index) => (
              <motion.div
                key={claim._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center font-bold">
                    {claim.deal.partnerName[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{claim.deal.title}</h3>
                    <p className="text-sm text-gray-400">{claim.deal.partnerName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-sm text-gray-500">
                    Claimed on {new Date(claim.claimedAt).toLocaleDateString()}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${
                    claim.status === 'approved' 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                      : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                  }`}>
                    {claim.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}