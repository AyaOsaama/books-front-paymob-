import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_BASE_URL = "https://paymob-test-ten.vercel.app";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("جاري التحقق...");
  const [accessKey, setAccessKey] = useState(null);

useEffect(() => {
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    if (!orderId) {
      setStatus("رقم الطلب غير موجود.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/verify/${orderId}`);
      const data = await res.json();

      if (data.status === "paid") {
        setStatus("تم الدفع بنجاح!");
        setAccessKey(data.accessKey);
      } else {
        setStatus("الدفع لم يكتمل بعد.");
      }
    } catch (err) {
      console.error(err);
      setStatus("حدث خطأ أثناء التحقق من الدفع.");
    }
  };

  verifyPayment();
}, [searchParams]);


  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">{status}</h1>
      {accessKey && (
        <a
          href={`https://paymob-test-ten.vercel.app/books/2/pdf?accessKey=${accessKey}`}
          target="_blank"
          className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl"
        >
          تحميل الكتاب
        </a>
      )}
    </div>
  );
}
