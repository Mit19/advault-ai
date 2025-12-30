import React from 'react';
import { Ad } from '../types';

interface AdCardProps {
  ad: Ad;
  isSelected: boolean;
  onToggle: (ad: Ad) => void;
  onPlay: (ad: Ad) => void;
}

const AdCard: React.FC<AdCardProps> = ({ ad, isSelected, onToggle, onPlay }) => {
  return (
    <div 
      className={`group relative bg-dark-800 rounded-xl overflow-hidden border transition-all duration-200 ${
        isSelected ? 'border-brand-500 ring-1 ring-brand-500' : 'border-gray-700 hover:border-gray-500'
      }`}
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-[4/5] bg-gray-800 cursor-pointer" onClick={() => onPlay(ad)}>
        <img 
          src={ad.thumbnail} 
          alt={ad.title} 
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        />
        
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <i className="fa-solid fa-play text-white text-lg ml-1"></i>
          </div>
        </div>

        {/* Duration Badge */}
        {ad.running_duration && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-brand-300 text-xs font-semibold px-2 py-1 rounded-md backdrop-blur-sm border border-brand-500/30">
            <i className="fa-solid fa-fire mr-1"></i>
            {ad.running_duration.days} Days Active
          </div>
        )}

        {/* Platform Icons */}
        <div className="absolute top-2 left-2 flex gap-1">
          {ad.publisher_platform.map(p => (
            <div key={p} className="w-6 h-6 bg-black/60 rounded-full flex items-center justify-center text-white text-xs backdrop-blur-sm">
               <i className={`fab fa-${p === 'facebook' ? 'facebook-f' : p}`}></i>
            </div>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
           <div>
             <h3 className="text-sm font-bold text-gray-100 line-clamp-1">{ad.brand_name}</h3>
             <p className="text-xs text-gray-400 line-clamp-1">{ad.title}</p>
           </div>
           <div 
             onClick={(e) => { e.stopPropagation(); onToggle(ad); }}
             className={`w-6 h-6 rounded-md border flex items-center justify-center cursor-pointer transition-colors ${
               isSelected ? 'bg-brand-500 border-brand-500' : 'border-gray-600 hover:border-gray-400'
             }`}
           >
             {isSelected && <i className="fa-solid fa-check text-white text-xs"></i>}
           </div>
        </div>
        
        <p className="text-xs text-gray-500 line-clamp-2 mb-3 h-8">
          {ad.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-600">
           <span>{new Date(ad.created_at).toLocaleDateString()}</span>
           <span className="uppercase tracking-wider font-medium">{ad.display_format}</span>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
