import React, { useState } from 'react';
import { BrandProfile, GeneratedQuery } from '../types';
import { generateSearchStrategies } from '../services/geminiService';

interface StrategyGeneratorProps {
  brandProfile: BrandProfile;
  onStrategiesGenerated: (queries: GeneratedQuery[]) => void;
}

const StrategyGenerator: React.FC<StrategyGeneratorProps> = ({ brandProfile, onStrategiesGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const queries = await generateSearchStrategies(brandProfile);
      onStrategiesGenerated(queries);
    } catch (e) {
      setError("Failed to generate strategies. Please try again.");
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-dark-800 border border-gray-700 rounded-2xl p-6 mb-8 relative overflow-hidden">
      {/* Background Gradient Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">AI Strategy Center</h2>
            <p className="text-gray-400 text-sm max-w-2xl">
              Using <span className="text-brand-400 font-semibold">Gemini 3 Pro</span> to analyze {brandProfile.name}'s profile and identify high-leverage search opportunities in the ad marketplace.
            </p>
          </div>
          
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-lg
              ${isGenerating 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:from-brand-500 hover:to-brand-400 hover:shadow-brand-500/20'
              }
            `}
          >
            {isGenerating ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin"></i>
                Thinking...
              </>
            ) : (
              <>
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                Generate Strategies
              </>
            )}
          </button>
        </div>

        {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm mb-4">
                {error}
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-dark-900/50 border border-gray-800 rounded-xl">
                <div className="text-brand-400 mb-2"><i className="fa-solid fa-microscope"></i> Analysis</div>
                <p className="text-xs text-gray-500">Deconstructs your brand values ({brandProfile.brandValues.slice(0,2).join(', ')}...) to find gaps.</p>
            </div>
             <div className="p-4 bg-dark-900/50 border border-gray-800 rounded-xl">
                <div className="text-brand-400 mb-2"><i className="fa-solid fa-bullseye"></i> Targeting</div>
                <p className="text-xs text-gray-500">Identifies "Best Working" ads with high running duration across competitors.</p>
            </div>
             <div className="p-4 bg-dark-900/50 border border-gray-800 rounded-xl">
                <div className="text-brand-400 mb-2"><i className="fa-solid fa-filter"></i> Discovery</div>
                <p className="text-xs text-gray-500">Generates 5 distinct product-oriented queries to maximize coverage.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyGenerator;
