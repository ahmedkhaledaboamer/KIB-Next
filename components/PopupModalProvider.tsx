'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import PopupModal from './PopupModal';
import { ListMinus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/utils/cn';

interface PopupModalContextType {
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
}

const PopupModalContext = createContext<PopupModalContextType | undefined>(undefined);

export function usePopupModal() {
  const context = useContext(PopupModalContext);
  if (!context) {
    throw new Error('usePopupModal must be used within PopupModalProvider');
  }
  return context;
}

export function PopupModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <PopupModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      <PopupModal isOpen={isOpen} onClose={closeModal} />
    </PopupModalContext.Provider>
  );
}

// Component for the trigger button
export function PopupModalTrigger() {
  const { openModal } = usePopupModal();
  const t = useTranslations('navbar');

  return (
    <button
      onClick={openModal}
      className={cn(
        'hidden md:flex items-center justify-center cursor-pointer',
        'w-10 h-10 rounded-md',
        'text-white hover:text-primary',
        'transition-colors duration-200',
        'hover:bg-white/10 focus:outline-none'
      )}
      aria-label={t('openGroupInfo')}
    >
      <ListMinus className="w-6 h-6" />
    </button>
  );
}

