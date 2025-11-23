import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_BASE_URL = "https://paymob-test-ten.vercel.app";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("جاري التحقق...");
  const [accessKey, setAccessKey] = useState(null);
  const [bookId] = useState(2); // ممكن تخليه ديناميكي حسب الطلب

  useEffect(() => {
    const success = searchParams.get("success");
    const orderId = searchParams.get("order_id");

    if (!orderId) {
      setStatus("رقم الطلب غير موجود.");
      return;
    }

    if (success === "true") {
      setStatus("تم الدفع بنجاح!");
      // استدعاء الـ backend للتحقق من orderId و الحصول على accessKey
      fetch(`${API_BASE_URL}/verify/${orderId}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === "paid") setAccessKey(data.accessKey);
          else setStatus("الدفع لم يكتمل بعد.");
        })
        .catch(err => {
          console.error(err);
          setStatus("حدث خطأ أثناء التحقق من الدفع.");
        });
    } else {
      setStatus("حدث خطأ أو تم إلغاء الدفع.");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">{status}</h1>
        {accessKey && (
          <a
            href={`${API_BASE_URL}/books/${bookId}/pdf?accessKey=${accessKey}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-3 bg-green-600 text-white font-bold rounded-xl transition hover:bg-green-700"
          >
            تحميل الكتاب
          </a>
        )}
      </div>
    </div>
  );
}
