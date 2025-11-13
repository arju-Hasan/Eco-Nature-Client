import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Search } from 'lucide-react';

export default function RecentTips({  tips = sampleTips  }) {
  const [query, setQuery] = useState('');


  const filtered = useMemo(() => {
    if (!tips || !tips.length) return [];
    const q = query.trim().toLowerCase();
    if (!q) return tips;
    return tips.filter(t => (t.title + ' ' + (t.content || '')).toLowerCase().includes(q));
  }, [tips, query]);

  
  const reset = () => { setQuery('');  };

  return (
    <section aria-labelledby="recent-tips-heading" className="max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="recent-tips-heading" className="text-2xl font-semibold">Recent Tips</h2>
          <p className="text-sm text-gray-600">Learn from the community's sustainable living insights — সাম্প্রতিক পরামর্শ</p>
        </div>
{/* search  */}            
             <div className="relative m-2 text-center w-full sm:w-auto md:px-20 flex justify-center sm:justify-end">
             <input
             type="text"
             placeholder="Search tip ....."
             value={query}
             onChange={e => { setQuery(e.target.value);  }}
             className="w-[80%] mx-auto sm:w-62 md:w-86 px-6 py-2 pr-10 rounded-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
              />
             <RefreshCw onClick={reset} className="absolute right-17 md:right-23 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
             </div>
        </div>
      

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No tips found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.slice(0, ).map((tip, idx) => (
            <motion.article
              key={tip.title + idx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.04 }}
              className="bg-white border rounded-2xl p-4 shadow-sm"
            >
              <header className="mb-2">
                <h3 className="text-lg font-medium">{tip.title}</h3>
                <div className="text-xs text-gray-500">By {tip.authorName} • {new Date(tip.createdAt).toLocaleDateString()}</div>
              </header>
              <p className="text-sm text-gray-700 mb-3">{tip.content}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Category: {tip.category}</span>
                <span>👍 {tip.upvotes}</span>
              </div>
            </motion.article>
          ))}
        </div>
      )}

    </section>
  );
}

const sampleTips = [
   {
    title: 'How to compost at home',
    content: 'Simple steps for home composting...',
    category: 'Waste Management',
    author: 'user@example.com',
    authorName: 'Green User',
    upvotes: 25,
    createdAt: '2024-01-20T10:30:00Z'
  },
  {
    title: 'Save water with bucket showers',
    content: 'Switch from long showers to bucket baths to save up to 50 liters per day.',
    category: 'Water Conservation',
    author: 'eco@example.com',
    authorName: 'Eco Saver',
    upvotes: 18,
    createdAt: '2024-02-10T09:00:00Z'
  },
  {
    title: 'Use reusable grocery bags',
    content: 'Avoid single-use plastics by carrying cloth or jute bags for shopping.',
    category: 'Plastic Reduction',
    author: 'sustainable@example.com',
    authorName: 'Sustainable Soul',
    upvotes: 42,
    createdAt: '2024-03-05T15:20:00Z'
  },
  {
    title: 'Grow herbs on your balcony',
    content: 'Small herb gardens can save money and reduce packaging waste.',
    category: 'Urban Gardening',
    author: 'greenhome@example.com',
    authorName: 'Nature Friend',
    upvotes: 31,
    createdAt: '2024-04-12T08:45:00Z'
  },
  {
    title: 'Switch to LED lighting',
    content: 'LED bulbs use 80% less energy and last much longer than regular bulbs.',
    category: 'Energy Efficiency',
    author: 'lightwise@example.com',
    authorName: 'Bright Mind',
    upvotes: 27,
    createdAt: '2024-05-22T11:10:00Z'
  },
  {
    title: 'Recycle your old electronics',
    content: 'Take your unused electronics to e-waste recycling centers.',
    category: 'Recycling',
    author: 'techgreen@example.com',
    authorName: 'Tech Recycler',
    upvotes: 19,
    createdAt: '2024-06-15T17:40:00Z'
  },
  {
    title: 'Make natural cleaners at home',
    content: 'Mix vinegar and baking soda to clean your kitchen without chemicals.',
    category: 'Eco Home',
    author: 'cleangreen@example.com',
    authorName: 'Clean Green',
    upvotes: 34,
    createdAt: '2024-07-05T13:25:00Z'
  }
];


RecentTips.defaultProps = { tips: sampleTips };
