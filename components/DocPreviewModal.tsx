import React from 'react';
import { X, FileText, Download, ExternalLink } from 'lucide-react';
import { DocType } from '../types';

interface DocPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  type: DocType;
}

const DocPreviewModal: React.FC<DocPreviewModalProps> = ({ isOpen, onClose, title, url, type }) => {
  if (!isOpen) return null;

  const getDownloadUrl = (docUrl: string, format: string) => {
    try {
      const match = docUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        return `https://docs.google.com/document/d/${match[1]}/export?format=${format}`;
      }
    } catch (e) { console.error("URL 解析錯誤", e); }
    return docUrl;
  };

  const pdfUrl = getDownloadUrl(url, 'pdf');
  const wordUrl = getDownloadUrl(url, 'docx');

  // 判斷是否為表單
  const isForm = url.includes('/forms/') || url.includes('viewform');
  // 僅當類別不是 'regulation' 且不是表單時才顯示 Word/PDF 下載
  const showDownloads = type !== 'regulation' && !isForm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity modal-overlay" onClick={onClose}></div>
      <div className="relative w-full h-[100dvh] md:w-full md:max-w-5xl md:h-[85vh] bg-white md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300 modal-container">
        <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-gray-100 bg-gray-50/50 modal-header shrink-0">
          <h3 className="text-base md:text-lg font-bold text-brand-gray truncate pr-4">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 bg-gray-100 relative modal-iframe-container">
          <iframe src={url} title={title} className="w-full h-full border-0" allow="autoplay"></iframe>
        </div>
        <div className="px-4 py-3 md:px-6 md:py-4 border-t border-gray-100 bg-white flex flex-col sm:flex-row justify-end gap-2 md:gap-3 modal-footer shrink-0">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
             {showDownloads && (
              <React.Fragment>
                  <a href={wordUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 px-4 py-3 md:px-5 md:py-2.5 rounded-lg font-medium transition-colors text-sm" title="下載為 Word 檔案">
                    <FileText size={18} /> <span>下載 Word</span>
                  </a>
                  <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-brand-gray px-4 py-3 md:px-5 md:py-2.5 rounded-lg font-medium transition-colors text-sm" title="下載為 PDF 檔案">
                    <Download size={18} /> <span>下載 PDF</span>
                  </a>
              </React.Fragment>
            )}
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-brand-green hover:bg-[#1f8c3c] text-white px-4 py-3 md:px-5 md:py-2.5 rounded-lg font-medium transition-transform active:scale-95 shadow-md shadow-brand-green/20 text-sm">
              <ExternalLink size={18} /> <span>線上閱讀</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocPreviewModal;