import React, { useState, useEffect } from 'react';
import { FileText, Folder, FolderOpen, MousePointerClick, ChevronRight } from 'lucide-react';
import { DocItem } from '../types';
import { REGULATION_CATEGORIES } from '../data';
import { checkIsNew } from '../utils';

interface SectionRegulationsProps {
  data: DocItem[];
  onItemClick: (item: DocItem) => void;
  searchTerm: string;
}

const SectionRegulations: React.FC<SectionRegulationsProps> = ({ data, onItemClick, searchTerm }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    if (searchTerm) setSelectedCategoryId(null);
  }, [searchTerm]);

  const handleCategoryClick = (id: string | null) => {
    setSelectedCategoryId(id);
    if (id) {
      const element = document.getElementById('regulations');
      if(element) {
        const yOffset = -80; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const isSearching = searchTerm.length > 0;
  const isCategorySelected = selectedCategoryId !== null;
  
  const displayData = isSearching 
    ? data 
    : (selectedCategoryId ? data.filter(item => item.category === selectedCategoryId) : []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-visible min-h-[300px] relative z-30">
      <div className="sticky top-16 z-30 p-4 md:p-5 border-b border-gray-100 flex flex-col justify-center bg-white rounded-t-xl shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-green-100 p-2 rounded-lg text-brand-green"> <FileText size={24} /> </div>
          <h2 className="text-xl md:text-2xl font-bold text-brand-gray flex items-center gap-2">
            規章制度 <span className="text-sm font-normal text-gray-400 ml-1 hidden sm:inline">Regulations</span>
          </h2>
        </div>
        {!isSearching && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mt-2 touch-pan-x w-[calc(100%+2rem)] -mx-4 px-4 md:w-full md:mx-0 md:px-0">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`flex-shrink-0 whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium border transition-colors ${selectedCategoryId === null ? 'bg-brand-green text-white border-brand-green' : 'bg-white text-gray-500 border-gray-200 hover:border-brand-green hover:text-brand-green'}`}
            >所有分類</button>
            {REGULATION_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex-shrink-0 whitespace-nowrap px-3 py-1 rounded-full text-sm font-medium border transition-colors ${selectedCategoryId === cat.id ? 'bg-brand-green text-white border-brand-green' : 'bg-white text-gray-500 border-gray-200 hover:border-brand-green hover:text-brand-green'}`}
              >{cat.name}</button>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 md:p-6">
        {!isSearching && !isCategorySelected && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {REGULATION_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="flex flex-col items-center justify-center p-4 md:p-6 border border-gray-100 rounded-xl hover:border-brand-green hover:shadow-lg hover:shadow-brand-green/10 hover:-translate-y-1 transition-all duration-300 group bg-white h-32 md:h-40"
              >
                <div className="bg-gray-50 p-3 md:p-4 rounded-full mb-2 md:mb-3 group-hover:bg-brand-green transition-colors duration-300">
                  <Folder size={24} className="text-gray-400 group-hover:text-white transition-colors duration-300 md:w-8 md:h-8" />
                </div>
                <span className="font-bold text-gray-600 group-hover:text-brand-green transition-colors text-sm md:text-base">{cat.name}</span>
              </button>
            ))}
          </div>
        )}
        {(isSearching || isCategorySelected) && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {displayData.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-12 opacity-60">
                <div className="bg-gray-50 p-4 rounded-full mb-3"> <MousePointerClick size={32} className="text-gray-300" /> </div>
                <p className="text-gray-400">此分類暫無文件</p>
                {isCategorySelected && <button onClick={() => handleCategoryClick(null)} className="mt-4 text-brand-green hover:underline">返回分類列表</button>}
              </div>
            ) : (
              <div className="grid gap-3">
                {displayData.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onItemClick(item)}
                    className="p-4 border border-gray-100 rounded-lg hover:bg-green-50/30 hover:border-brand-green/30 transition-all group cursor-pointer bg-white shadow-sm hover:shadow-md"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-start gap-2 mb-1">
                          <FolderOpen size={16} className="text-brand-green/70 flex-shrink-0 mt-1" />
                          <h3 className="text-base md:text-lg font-bold text-brand-gray group-hover:text-brand-green transition-colors break-words leading-tight">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed pl-6 border-l-2 border-gray-100 group-hover:border-brand-green/30 transition-colors line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                          <div className="flex items-center gap-1">
                          {checkIsNew(item.date) && <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0">NEW</span>}
                          <span className="text-gray-400 text-[10px] md:text-xs font-mono">{item.date}</span>
                          </div>
                          <ChevronRight size={20} className="text-gray-300 group-hover:text-brand-green group-hover:translate-x-1 transition-all mt-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionRegulations;