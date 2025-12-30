import React, { useEffect, useState } from 'react';
import { GeneratedQuery, Ad } from '../types';
import { searchAds } from '../services/foreplayService';
import AdCard from './AdCard';

interface AdGalleryProps {
  queries: GeneratedQuery[];
  foreplayApiKey: string | null;
  selectedAds: Set<string>;
  onAdSelectionChange: (adId: string, isSelected: boolean) => void;
  onAdPlay: (ad: Ad) => void;
}

const AdGallery: React.FC<AdGalleryProps> = ({ 
  queries, 
  foreplayApiKey, 
  selectedAds, 
  onAdSelectionChange,
  onAdPlay
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [resultsMap, setResultsMap] = useState<Record<number, Ad[]>>({});
  const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Automatically search for the first query when queries populate
    if (queries.length > 0 && !resultsMap[0] && !loadingMap[0]) {
      fetchResults(0, queries[0].term);
    }
  }, [queries]);

  const fetchResults = async (index: number, term: string) => {
    setLoadingMap(prev => ({ ...prev, [index]: true }));
    try {
      const ads = await searchAds(term, foreplayApiKey);
      setResultsMap(prev => ({ ...prev, [index]: ads }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMap(prev => ({ ...prev, [index]: false }));
    }
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    if (!resultsMap[index] && !loadingMap[index]) {
      fetchResults(index, queries[index].term);
    }
  };

  if (queries.length === 0) return null;

  return (
    <div className="animate-fade-in-up">
      {/* Tabs */}
      <div className="flex overflow-x-auto pb-4 mb-4 gap-2 no-scrollbar">
        {queries.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleTabChange(idx)}
            className={`
              whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-all
              ${activeTab === idx 
                ? 'bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-900/50' 
                : 'bg-dark-800 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white'
              }
            `}
          >
            <span className="mr-2">#{idx + 1}</span>
            {q.term}
            {resultsMap[idx] && (
               <span className="ml-2 bg-black/20 px-2 py-0.5 rounded-full text-xs text-white/70">
                 {resultsMap[idx].length}
               </span>
            )}
          </button>
        ))}
      </div>

      {/* Rationale Banner */}
      <div className="bg-gradient-to-r from-dark-800 to-dark-900 border-l-4 border-brand-500 p-4 mb-6 rounded-r-lg">
         <p className="text-gray-300 text-sm">
           <span className="font-bold text-brand-400 mr-2">Strategy:</span>
           {queries[activeTab].rationale}
         </p>
      </div>

      {/* Grid */}
      {loadingMap[activeTab] ? (
        <div className="flex items-center justify-center h-64">
           <div className="flex flex-col items-center">
             <i className="fa-solid fa-circle-notch fa-spin text-3xl text-brand-500 mb-4"></i>
             <p className="text-gray-400 animate-pulse">Searching Ad Database...</p>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {resultsMap[activeTab]?.map(ad => (
            <AdCard
              key={ad.id}
              ad={ad}
              isSelected={selectedAds.has(ad.id)}
              onToggle={(ad) => onAdSelectionChange(ad.id, !selectedAds.has(ad.id))}
              onPlay={onAdPlay}
            />
          ))}
          {resultsMap[activeTab]?.length === 0 && (
             <div className="col-span-full text-center py-12 text-gray-500">
                No ads found for this query.
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdGallery;
