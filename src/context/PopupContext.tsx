import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

// Define options for openPopup
interface PopupOptions {
  onSubmit?: () => Promise<void>; // Asynchronous function to be called on OK
  okText?: string; // Custom OK button text
  loading?: boolean; // Loading state for the submit button
}

// Define context types
interface PopupContextType {
  openModal: (content: ReactNode, options?: PopupOptions) => void;
  closeModal: () => void;
  isModalOpen: boolean;
  openDrawer: (content: ReactNode, options?: PopupOptions) => void;
  closeDrawer: () => void;
  isDrawerOpen: boolean;
}

// Create Popup Context
const PopupContext = createContext<PopupContextType | undefined>(undefined);

// Custom hook to use popup context
export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};

// Popup Provider Component
export const PopupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [popupContent, setPopupContent] = useState<ReactNode>(null);

  const openModal = (content: ReactNode) => {
    setPopupContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setPopupContent(null);
  };

  const openDrawer = (content: ReactNode) => {
    setPopupContent(content);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setPopupContent(null);
  };

  return (
    <PopupContext.Provider
      value={{
        openModal,
        closeModal,
        isModalOpen,
        openDrawer,
        closeDrawer,
        isDrawerOpen,
      }}
    >
      {children}
      {popupContent} {/* Render popup globally */}
    </PopupContext.Provider>
  );
};
