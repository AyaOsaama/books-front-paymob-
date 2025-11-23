import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_BASE_URL = "https://paymob-test-ten.vercel.app";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("جاري التحقق...");
  const [accessKey, setAccessKey] = useState(null);
  const [bookId, setBookId] = useState(null);

  useEffect(() => {
    const orderId = searchParams.get("order_id");
    if (!orderId) {
      setStatus("رقم الطلب غير موجود.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/verify/${orderId}`);
        const data = await res.json();

        if (data.status === "paid") {
          setStatus("تم الدفع بنجاح!");
          setAccessKey(data.accessKey);
          setBookId(2); // حطي هنا الـ bookId المناسب أو جبيه ديناميكياً
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
      {accessKey && bookId && (
        <a
          href={`${API_BASE_URL}/books/${bookId}/pdf?accessKey=${accessKey}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-3 bg-green-600 text-white font-bold rounded-xl"
        >
          تحميل الكتاب
        </a>
      )}
    </div>
  );
}
