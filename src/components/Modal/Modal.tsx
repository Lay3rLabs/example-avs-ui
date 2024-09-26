import { useEffect } from "react";
import {
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
} from "@/types/ui";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    // Function to handle the scroll lock
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scroll
    } else {
      document.body.style.overflow = ""; // Re-enable scroll
    }

    // Cleanup function to reset overflow when the component unmounts or isOpen changes
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black w-full max-w-lg">
        <div className="relative bg-background-primary border-border-primary text-text-body border rounded-lg shadow-lg w-full max-w-lg">
          {children}
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

const ModalHeader: React.FC<ModalHeaderProps> = ({ children }) => (
  <div className="px-6 py-4 border-b border-border-primary">{children}</div>
);

const ModalBody: React.FC<ModalBodyProps> = ({ children }) => (
  <div className="px-6 py-4">{children}</div>
);

const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => (
  <div className="px-6 py-4 border-t border-border-primary flex justify-end space-x-4">
    {children}
  </div>
);

export { Modal, ModalHeader, ModalBody, ModalFooter };
