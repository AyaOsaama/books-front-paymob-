import { useState, useEffect } from "react";
import { BookOpen, Sparkles, Loader2 } from "lucide-react";
import BookCard from "../components/BookCard"; 
import { api } from "../api/api"; 

export default function EnhancedBookStore() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  fetchBooks();
}, []);



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* الرأس */}
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg transform hover:rotate-12 transition-transform duration-300">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  مكتبة الكتب
                </h1>
                <p className="text-xs text-gray-500">عالم من المعرفة</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 font-semibold text-sm">
                {books.length} كتاب
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="container mx-auto px-4 md:px-8 py-12">
        {/* قسم البطل */}
        <div className="text-center mb-16 space-y-6 animate-fadeIn">
          <div className="inline-block">
            <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-600 font-semibold text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              عروض حصرية
            </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            اكتشف عالم
            <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              المعرفة والإبداع
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            مجموعة مختارة بعناية من أفضل الكتب الإلكترونية في مختلف المجالات
          </p>
        </div>

        {/* شبكة الكتب */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
            <div className="relative">
              <Loader2 className="h-16 w-16 animate-spin text-purple-600" />
              <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full bg-purple-400 opacity-20"></div>
            </div>
            <p className="text-gray-600 text-lg font-medium">جاري تحميل الكتب الرائعة...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">حدث خطأ في تحميل البيانات</h3>
            <p className="text-gray-500 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="h-20 w-20 mx-auto mb-6 text-gray-300" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">لا توجد كتب متاحة حالياً</h3>
            <p className="text-gray-500">تحقق مرة أخرى قريباً للحصول على كتب جديدة</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </main>

      {/* التذييل */}
      <footer className="mt-24 border-t border-purple-100 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-8 py-12">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">مكتبة الكتب</span>
            </div>
            <p className="text-gray-600">
              © 2024 مكتبة الكتب. جميع الحقوق محفوظة
            </p>
            <p className="text-sm text-gray-500">
              اقرأ، تعلم، وابدع
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }

        * {
          font-family: 'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
      `}</style>
    </div>
  );
}