import React, { useState, useEffect } from 'react';
import { DERMA_BOTANICA_PROFILE } from './constants';
import { GeneratedQuery, Ad } from './types';
import StrategyGenerator from './components/StrategyGenerator';
import AdGallery from './components/AdGallery';
import ChatAssistant from './components/ChatAssistant';

const App: React.FC = () => {
  const [generatedQueries, setGeneratedQueries] = useState<GeneratedQuery[]>([]);
  const [selectedAdIds, setSelectedAdIds] = useState<Set<string>>(new Set());
  const [foreplayApiKey, setForeplayApiKey] = useState<string>('');
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [previewAd, setPreviewAd] = useState<Ad | null>(null);
  
  // Fake Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleStrategiesGenerated = (queries: GeneratedQuery[]) => {
    setGeneratedQueries(queries);
  };

  const handleAdSelection = (adId: string, isSelected: boolean) => {
    const newSet = new Set(selectedAdIds);
    if (isSelected) {
      if (newSet.size >= 20) {
        alert("You can only select up to 20 ads.");
        return;
      }
      newSet.add(adId);
    } else {
      newSet.delete(adId);
    }
    setSelectedAdIds(newSet);
  };

  const handleSaveToDrive = () => {
    if (selectedAdIds.size === 0) return;
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulation loop
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadSuccess(true);
          setTimeout(() => {
            setIsUploading(false);
            setUploadSuccess(false);
            setSelectedAdIds(new Set()); // Clear selection after "upload"
          }, 3000);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 selection:bg-brand-500 selection:text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-dark-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
              <i className="fa-solid fa-layer-group text-white text-sm"></i>
            </div>
            <span className="font-bold text-xl tracking-tight">AdVault<span className="text-brand-500">AI</span></span>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 text-xs text-gray-500 bg-dark-800 px-3 py-1.5 rounded-full border border-gray-700">
               <span className={`w-2 h-2 rounded-full ${foreplayApiKey ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
               {foreplayApiKey ? 'Foreplay Connected' : 'Mock Mode (Demo)'}
             </div>
             <button 
               onClick={() => setShowKeyModal(true)}
               className="text-gray-400 hover:text-white transition-colors"
               title="Settings"
             >
               <i className="fa-solid fa-gear"></i>
             </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        
        {/* Brand Header */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-end gap-4">
           <div>
             <div className="text-brand-500 text-sm font-semibold mb-1 uppercase tracking-wider">Client Profile</div>
             <h1 className="text-4xl font-bold text-white mb-2">{DERMA_BOTANICA_PROFILE.name}</h1>
             <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">{DERMA_BOTANICA_PROFILE.overview}</p>
           </div>
           <div className="flex gap-2">
             {DERMA_BOTANICA_PROFILE.brandValues.slice(0,3).map((val, i) => (
               <span key={i} className="px-3 py-1 rounded-full border border-gray-700 bg-dark-800 text-xs text-gray-300">
                 {val}
               </span>
             ))}
           </div>
        </div>

        {/* AI Generator */}
        <StrategyGenerator 
          brandProfile={DERMA_BOTANICA_PROFILE} 
          onStrategiesGenerated={handleStrategiesGenerated} 
        />

        {/* Results */}
        {generatedQueries.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <i className="fa-solid fa-magnifying-glass text-brand-500"></i>
              Discovery Results
            </h3>
            <AdGallery 
              queries={generatedQueries} 
              foreplayApiKey={foreplayApiKey}
              selectedAds={selectedAdIds}
              onAdSelectionChange={handleAdSelection}
              onAdPlay={setPreviewAd}
            />
          </div>
        )}
      </main>

      {/* Sticky Action Dock */}
      <div className={`fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-gray-700 p-4 transform transition-transform duration-300 z-40 ${selectedAdIds.size > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="bg-brand-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center text-lg">
               {selectedAdIds.size}
             </div>
             <div>
               <p className="text-white font-medium">Ads Selected</p>
               <p className="text-xs text-gray-400">Ready to save to Drive</p>
             </div>
          </div>

          <div className="flex gap-4 items-center">
             <button 
               onClick={() => setSelectedAdIds(new Set())}
               className="text-gray-400 hover:text-white text-sm"
             >
               Clear Selection
             </button>
             <button 
               onClick={handleSaveToDrive}
               disabled={isUploading || uploadSuccess}
               className={`
                 bg-white text-dark-900 px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors
                 ${isUploading ? 'opacity-80 cursor-wait' : ''}
                 ${uploadSuccess ? 'bg-green-500 text-white hover:bg-green-600' : ''}
               `}
             >
               {uploadSuccess ? (
                 <>
                   <i className="fa-solid fa-check"></i>
                   Saved to Drive!
                 </>
               ) : isUploading ? (
                 <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                    Uploading {uploadProgress}%
                 </>
               ) : (
                 <>
                   <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" className="w-5 h-5" alt="Drive" />
                   Save to Drive
                 </>
               )}
             </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {previewAd && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setPreviewAd(null)}>
           <div className="bg-dark-900 rounded-xl overflow-hidden max-w-4xl w-full border border-gray-800" onClick={e => e.stopPropagation()}>
              <div className="relative aspect-video bg-black flex items-center justify-center">
                 {previewAd.video_url ? (
                   <video src={previewAd.video_url} controls autoPlay className="w-full h-full" />
                 ) : (
                   <img src={previewAd.thumbnail} className="w-full h-full object-contain" alt="Ad" />
                 )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">{previewAd.brand_name}</h2>
                    <p className="text-gray-400">{previewAd.title}</p>
                  </div>
                  <button onClick={() => setPreviewAd(null)} className="text-gray-500 hover:text-white">
                    <i className="fa-solid fa-xmark text-2xl"></i>
                  </button>
                </div>
                <div className="mt-4 flex gap-2">
                   <button className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm hover:bg-brand-500">
                     Download Asset
                   </button>
                   <button className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700">
                     Copy Link
                   </button>
                </div>
              </div>
           </div>
        </div>
      )}

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-dark-800 p-6 rounded-xl border border-gray-700 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Settings</h3>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Foreplay API Key (Optional)</label>
              <input 
                type="password" 
                value={foreplayApiKey}
                onChange={(e) => setForeplayApiKey(e.target.value)}
                placeholder="Enter your Foreplay API Key"
                className="w-full bg-dark-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-brand-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                Leave empty to use realistic mock data for demonstration purposes.
              </p>
            </div>
            <div className="flex justify-end gap-2">
               <button 
                 onClick={() => setShowKeyModal(false)}
                 className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-500"
               >
                 Save & Close
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Bot */}
      <ChatAssistant brandName={DERMA_BOTANICA_PROFILE.name} />

    </div>
  );
};

export default App;
