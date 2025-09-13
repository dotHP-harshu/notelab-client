import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
const PWAInstallContext = createContext();

export const usePWAInstall = () => useContext(PWAInstallContext);

export const PWAInstallProvider = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkInstallStatus = () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true);
      } else {
        setIsInstalled(false);
      }
    };

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Stop default browser prompt
      setDeferredPrompt(e); // Save it for later use
      console.log("Captured beforeinstallprompt");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    checkInstallStatus();

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    setDeferredPrompt(null);
  };

  return (
    <PWAInstallContext.Provider
      value={{ isInstalled, installApp, deferredPrompt }}
    >
      {children}
    </PWAInstallContext.Provider>
  );
};
