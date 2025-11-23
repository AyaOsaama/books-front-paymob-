import { useState } from "react";
import { ShoppingCart, BookOpen, Loader2, Sparkles, TrendingUp } from "lucide-react";

const API_BASE_URL = "https://paymob-test-ten.vercel.app";

export default function BookCard({ book }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleBuy = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: book.price, bookId: book.id }),
      });
      const data = await res.json();

      if (data.url) {
        // Redirect مباشر لصفحة الدفع
        window.location.href = data.url;
      } else {
        alert("رابط الدفع غير موجود");
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء معالجة الدفع");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      {/* صورة الكتاب */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
        {book.cover ? (
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-90 object-fill transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-20 h-20 text-gray-300" />
          </div>
        )}
      </div>

      {/* محتوى البطاقة */}
      <div className="p-6 space-y-3">
        <h3 className="font-bold text-xl text-gray-900 truncate w-full block whitespace-nowrap group-hover:text-purple-600 transition-colors">
          {book.title}
        </h3>
        {book.author && <p className="text-sm text-gray-600">{book.author}</p>}
        {book.description && (
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed min-h-[3.2rem]">
            {book.description}
          </p>
        )}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {book.price}
          </span>
          <span className="text-sm text-gray-500">جنيه</span>
        </div>
      </div>

      {/* زر الدفع */}
      <div className="p-6 pt-0 flex">
        <button
          onClick={handleBuy}
          disabled={isLoading}
          className="w-full justify-end bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              جاري المعالجة...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              اشتري الآن
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
