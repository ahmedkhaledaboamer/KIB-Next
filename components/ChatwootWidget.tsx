'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string; position?: 'left' | 'right' }) => void;
      toggle?: () => void;
      open?: () => void;
      close?: () => void;
    };
    $chatwoot?: {
      toggle: () => void;
      open: () => void;
      close: () => void;
    };
  }
}

export default function ChatwootWidget() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const BASE_URL = "https://chatwoot.pro-shazmlc.cloud";
    
    // Add CSS to position Chatwoot widget on the left
    const style = document.createElement('style');
    style.setAttribute('data-chatwoot-position', 'left');
    style.textContent = `
      [class*="woot-widget-bubble"],
      [id*="woot-widget"],
      [data-chatwoot-widget-id],
      iframe[src*="chatwoot"] {
        left: 20px !important;
        right: auto !important;
      }
      [class*="woot-widget-holder"],
      [class*="woot--bubble-holder"] {
        left: 20px !important;
        right: auto !important;
      }
    `;
    document.head.appendChild(style);
    
    // Check if script is already loaded
    if (document.querySelector(`script[src="${BASE_URL}/packs/js/sdk.js"]`)) {
      // Script already exists, wait for it to be ready
      const checkReady = setInterval(() => {
        if (window.chatwootSDK || window.$chatwoot) {
          clearInterval(checkReady);
          if (window.chatwootSDK && typeof window.chatwootSDK.run === 'function') {
            window.chatwootSDK.run({
              websiteToken: 'bwu3GcQDKjsFsqm3irJdcijx',
              baseUrl: BASE_URL,
              position: 'left' // Position widget on the left side
            });
          }
        }
      }, 100);
      
      setTimeout(() => clearInterval(checkReady), 5000);
      return;
    }

    // Create and load script
    const script = document.createElement('script');
    script.src = `${BASE_URL}/packs/js/sdk.js`;
    script.async = true;
    
    script.onload = () => {
      // Wait a bit for SDK to initialize
      setTimeout(() => {
        if (window.chatwootSDK && typeof window.chatwootSDK.run === 'function') {
          window.chatwootSDK.run({
            websiteToken: 'bwu3GcQDKjsFsqm3irJdcijx',
            baseUrl: BASE_URL,
            position: 'left' // Position widget on the left side
          });
        }
      }, 100);
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
      const existingScript = document.querySelector(`script[src="${BASE_URL}/packs/js/sdk.js"]`);
      if (existingScript) {
        existingScript.remove();
      }
      // Remove style if component unmounts
      const styleElement = document.querySelector('style[data-chatwoot-position]');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  return null;
}

// Helper function to open Chatwoot widget
export const openChatwoot = () => {
  if (typeof window === 'undefined') return;
  
  // Wait a bit for SDK to be ready
  const tryOpen = () => {
    // Method 1: Using $chatwoot (most common Chatwoot API)
    if (window.$chatwoot && typeof window.$chatwoot.toggle === 'function') {
      window.$chatwoot.toggle();
      return true;
    }
    
    // Method 2: Using chatwootSDK with toggle
    if (window.chatwootSDK && typeof window.chatwootSDK.toggle === 'function') {
      window.chatwootSDK.toggle();
      return true;
    }
    
    // Method 3: Using chatwootSDK with open
    if (window.chatwootSDK && typeof window.chatwootSDK.open === 'function') {
      window.chatwootSDK.open();
      return true;
    }
    
    // Method 4: Try to find and click the Chatwoot bubble button
    const chatwootBubble = document.querySelector('[class*="woot"], [id*="woot"], [data-chatwoot-widget-id], button[aria-label*="chat"], button[aria-label*="Chat"]') as HTMLElement;
    if (chatwootBubble) {
      chatwootBubble.click();
      return true;
    }
    
    // Method 5: Dispatch custom event
    window.dispatchEvent(new CustomEvent('chatwoot:open'));
    return false;
  };
  
  // Try immediately
  if (tryOpen()) return;
  
  // If not ready, wait and try again
  const interval = setInterval(() => {
    if (tryOpen()) {
      clearInterval(interval);
    }
  }, 100);
  
  // Stop trying after 3 seconds
  setTimeout(() => clearInterval(interval), 3000);
};

