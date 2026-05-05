
'use client';

import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AdminSearchBarProps {
  onSearch: (query: string) => void;
  query: string;
}

export default function AdminSearchBar({ onSearch, query }: AdminSearchBarProps) {
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(localQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [localQuery, onSearch]);

  return (
    <div className="relative group flex-grow">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-all duration-300">
        <Search className="w-5 h-5" />
      </div>
      <input 
        type="text" 
        placeholder="Search for email, name, or document..." 
        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white font-body focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all placeholder:text-on-surface-variant/40 hover:bg-white/[0.03] shadow-inner"
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
      />
      
      {/* Subtle focus indicator */}
      <div className="absolute inset-0 rounded-2xl border border-primary/20 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );
}
