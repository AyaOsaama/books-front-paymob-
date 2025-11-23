import { X } from "lucide-react";
import { useEffect } from "react";

// مكون نافذة الدفع
export default function PaymentIframe({ url, onClose, onSuccess }) {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === "payment_success") {
        onSuccess();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onSuccess]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full h-[600px] flex flex-col animate-slideUp">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900">إتمام عملية الدفع</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <iframe
          src={url}
          className="flex-1 w-full rounded-b-2xl"
          title="Payment"
        />
      </div>
    </div>
  );
}
