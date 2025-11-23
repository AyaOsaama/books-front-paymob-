import { useSearchParams } from "react-router-dom";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success") === "true";
  const orderId = searchParams.get("order_id");

  return (
    <div className="p-6 text-center">
      {success ? (
        <>
          <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
          <p>Your order ID: {orderId}</p>
        </>
      ) : (
        <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
      )}
    </div>
  );
}
