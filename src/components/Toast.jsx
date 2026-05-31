import { createContext, useContext, useState } from "react";
import "../css/toast.css";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: "",
    type: "error",
  });

  const showToast = (message, type = "error") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast({
        message: "",
        type: "error",
      });
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast.message && (
        <div className={`custom-toast ${toast.type}`}>
          <p>{toast.message}</p>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);