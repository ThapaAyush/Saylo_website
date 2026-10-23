import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-lg',
  className = '',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={`
          relative w-full ${maxWidth} bg-[#111113] border border-white/10 rounded-3xl p-6 sm:p-8 
          shadow-2xl shadow-purple-500/10 z-10 overflow-y-auto max-h-[90vh] 
          animate-in fade-in zoom-in-95 duration-200
          ${className}
        `}
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            {title && <h3 className="text-xl font-extrabold text-[#F5F5F5] tracking-tight">{title}</h3>}
            {subtitle && <p className="text-sm text-[#A1A1AA] mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-white/5 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};
