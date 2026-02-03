export const checkIsNew = (dateStr: string): boolean => {
  if (!dateStr) return false;
  try {
    const date = new Date(dateStr.replace(/\//g, '-')); // Handle both / and - separators
    const today = new Date();
    // Reset time part to compare dates only
    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    
    const diffTime = today.getTime() - date.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    // Check if within 30 days or in the future
    return diffDays <= 30;
  } catch (e) {
    return false;
  }
};

export const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const yOffset = -80; 
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};
