import React, { useState, useEffect } from 'react';
import LoginGate from './components/LoginGate';
import Navbar from './components/Navbar';
import DocPreviewModal from './components/DocPreviewModal';
import SectionRegulations from './components/SectionRegulations';
import SectionFlowcharts from './components/SectionFlowcharts';
import SectionForms from './components/SectionForms';
import { REGULATIONS_DATA, FLOWCHARTS_DATA, FORMS_DATA } from './data';
import { DocItem, DocType, CurrentDoc } from './types';
import { scrollToSection } from './utils';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState<CurrentDoc | null>(null);

  useEffect(() => {
    const storedAuth = sessionStorage.getItem('km_auth_session_v1');
    if (storedAuth === 'true') setIsAuthenticated(true);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const handleAuthenticated = () => setIsAuthenticated(true);
  
  const handleLogout = () => {
    sessionStorage.removeItem('km_auth_session_v1');
    setIsAuthenticated(false);
    setSearchTerm('');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleDocClick = (item: DocItem, type: DocType) => {
    setCurrentDoc({ title: item.title, url: item.url, type: type });
    setIsModalOpen(true);
  };

  const filteredRegulations = REGULATIONS_DATA.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredFlowcharts = FLOWCHARTS_DATA.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredForms = FORMS_DATA.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const hasSearch = searchTerm.length > 0;
  const showRegulations = !hasSearch || filteredRegulations.length > 0;
  const showFlowcharts = !hasSearch || filteredFlowcharts.length > 0;
  const showForms = !hasSearch || filteredForms.length > 0;
  const noResults = hasSearch && !showRegulations && !showFlowcharts && !showForms;

  if (isLoading) return null;

  return (
    <div className="min-h-screen relative font-sans w-full">
      {!isAuthenticated && <LoginGate onAuthenticated={handleAuthenticated} />}
      {currentDoc && (
        <DocPreviewModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title={currentDoc.title} 
          url={currentDoc.url} 
          type={currentDoc.type} 
        />
      )}
      <div className={`transition-opacity duration-1000 ${isAuthenticated ? 'opacity-100' : 'opacity-0'}`}>
        {isAuthenticated && (
          <React.Fragment>
            <Navbar scrollToSection={scrollToSection} searchTerm={searchTerm} onSearch={setSearchTerm} onLogout={handleLogout} />
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-24 md:pb-32 space-y-8 md:space-y-16">
              <div className="bg-gradient-to-r from-brand-gray to-gray-700 rounded-2xl p-6 md:p-12 text-white shadow-xl">
                <h1 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">歡迎回到智匯中心</h1>
                <p className="text-gray-200 text-base md:text-lg max-w-2xl">
                  在此查找最新的規章制度、粒子流程表以及共用表格。<br className="hidden md:block"/>致力於打造透明、高效的資訊共享環境。
                </p>
              </div>
              {searchTerm && <div className="text-gray-500 text-sm px-2">搜尋結果：包含 "{searchTerm}" 的資料</div>}
              {noResults && (
                <div className="text-center py-20 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200 mx-2">
                  <p className="text-xl font-medium mb-2">找不到符合的資料</p>
                  <p className="text-sm">請嘗試其他關鍵字</p>
                </div>
              )}
              {showRegulations && <section id="regulations"><SectionRegulations data={filteredRegulations} onItemClick={(item) => handleDocClick(item, 'regulation')} searchTerm={searchTerm} /></section>}
              {showFlowcharts && <section id="flowcharts"><SectionFlowcharts data={filteredFlowcharts} onItemClick={(item) => handleDocClick(item, 'other')} searchTerm={searchTerm} /></section>}
              {showForms && <section id="forms"><SectionForms data={filteredForms} onItemClick={(item) => handleDocClick(item, 'other')} searchTerm={searchTerm} /></section>}
            </main>
            <footer className="bg-white border-t border-gray-100 py-8 md:py-10">
              <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-xs md:text-sm">
                <p>©2026本網頁內容僅限員工內部參考。嚴禁截圖、轉發或以任何形式帶離公司，違者必究。</p>
              </div>
            </footer>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default App;