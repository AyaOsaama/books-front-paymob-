import { CheckCircle, XCircle, Download, BookOpen, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function PaymentSuccess() {
  // محاكاة الحصول على البيانات من URL parameters
  const [success] = useState(true); // غيّر إلى false لرؤية صفحة الفشل
  const [orderId] = useState("ORD-2024-12345");
  
  // بيانات الكتاب (يمكن جلبها من API بناءً على orderId)
  const [bookData] = useState({
    title: "أساسيات البرمجة بلغة JavaScript",
    author: "محمد أحمد",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
    price: "299 جنيه",
    pages: 350,
    format: "PDF",
    size: "12.5 MB"
  });

  const handleOpenBook = () => {
    alert("سيتم فتح الكتاب في القارئ...");
  };

  const handleDownload = () => {
    alert("جاري تحميل الكتاب...");
  };

  if (!success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-red-100 rounded-full p-4">
              <XCircle className="w-16 h-16 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">فشلت عملية الدفع</h1>
          <p className="text-gray-600 mb-6">عذراً، حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى.</p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105">
            حاول مرة أخرى
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* رسالة النجاح */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 text-center transform hover:scale-105 transition-transform duration-300">
          <div className="mb-6 flex justify-center">
            <div className="bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full p-4 animate-pulse">
              <CheckCircle className="w-20 h-20 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">تمت عملية الدفع بنجاح! 🎉</h1>
          <p className="text-gray-600 text-lg mb-4">شكراً لشرائك. الكتاب جاهز الآن!</p>
          <div className="inline-block bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl px-6 py-3">
            <p className="text-sm text-gray-600">رقم الطلب</p>
            <p className="text-xl font-mono font-bold text-gray-800">{orderId}</p>
          </div>
        </div>

        {/* بطاقة الكتاب */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-7 h-7" />
              الكتاب الخاص بك
            </h2>
          </div>
          
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* صورة الكتاب */}
              <div className="md:w-1/3">
                <div className="relative group">
                  <img 
                    src={bookData.cover} 
                    alt={bookData.title}
                    className="w-full rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* تفاصيل الكتاب */}
              <div className="md:w-2/3 flex flex-col justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">{bookData.title}</h3>
                  <p className="text-lg text-gray-600 mb-6">بواسطة: {bookData.author}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">عدد الصفحات</p>
                      <p className="text-2xl font-bold text-gray-800">{bookData.pages}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                      <p className="text-sm text-gray-600 mb-1">حجم الملف</p>
                      <p className="text-2xl font-bold text-gray-800">{bookData.size}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-semibold text-sm">
                      {bookData.format}
                    </span>
                    <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg font-semibold text-sm">
                      {bookData.price}
                    </span>
                  </div>
                </div>

                {/* أزرار التحكم */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleOpenBook}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-5 h-5" />
                    افتح الكتاب الآن
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  
                  <button 
                    onClick={handleDownload}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    حمّل الكتاب
                  </button>
                </div>

                <p className="text-sm text-gray-500 mt-4 text-center">
                  💡 يمكنك الوصول للكتاب في أي وقت من مكتبتك
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100">
          <p className="text-center text-gray-700">
            📧 تم إرسال رسالة تأكيد إلى بريدك الإلكتروني تحتوي على رابط التحميل
          </p>
        </div>
      </div>
    </div>
  );
}