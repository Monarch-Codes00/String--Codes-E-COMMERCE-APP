// import React, { useState } from "react";
// import { useCart } from "../contexts/CartContext";
// import { useNavigate } from "react-router-dom";
// import "../components/styles/Checkout.css";

// const Checkout = () => {
//   const { cartItems, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [deliveryOption, setDeliveryOption] = useState("delivery");
//   const [shippingAddress, setShippingAddress] = useState(
//     "98 Kile Close, 8-3, Marsfield, Sydney Australia 2723"
//   );
//   const [isEditingAddress, setIsEditingAddress] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("mastercard");
//   const [nameOnCard, setNameOnCard] = useState("");
//   const [cardNumber, setCardNumber] = useState("");
//   const [expiration, setExpiration] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [couponCode, setCouponCode] = useState("");
//   const [couponApplied, setCouponApplied] = useState(false);
//   const [couponDiscount, setCouponDiscount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const deliveryFee = 16.99;
//   const tax = 12.99;

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.product.price * item.quantity,
//     0
//   );

//   const totalExclTax = totalPrice + deliveryFee - couponDiscount;
//   const orderTotal = totalExclTax + tax;

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const handleApplyCoupon = () => {
//     if (couponCode.toUpperCase() === "SAVE10") {
//       setCouponDiscount(10);
//       setCouponApplied(true);
//       setError(null);
//     } else {
//       setCouponDiscount(0);
//       setCouponApplied(false);
//       setError("Invalid coupon code");
//     }
//   };

//   const handleConfirmPayment = () => {
//     setLoading(true);
//     setError(null);
//     setTimeout(() => {
//       setLoading(false);
//       clearCart();
//       alert("Payment confirmed! Order placed successfully.");
//       navigate("/orders");
//     }, 2000);
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="checkout-container">
//         <h2>Your cart is empty</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="checkout-container">
//       <button className="back-button" onClick={handleBack}>
//         &lt; Back
//       </button>

//       <div className="checkout-main">
//         <div className="checkout-left">
//           <div className="delivery-options">
//             <label className={`delivery-option ${deliveryOption === "delivery" ? "selected" : ""}`}>
//               <input
//                 type="radio"
//                 name="delivery"
//                 value="delivery"
//                 checked={deliveryOption === "delivery"}
//                 onChange={() => setDeliveryOption("delivery")}
//               />
//               <span className="icon">🚚</span> Get it delivered in only 30 minutes
//             </label>
//             <label className={`delivery-option ${deliveryOption === "pickup" ? "selected" : ""}`}>
//               <input
//                 type="radio"
//                 name="delivery"
//                 value="pickup"
//                 checked={deliveryOption === "pickup"}
//                 onChange={() => setDeliveryOption("pickup")}
//               />
//               <span className="icon">🛍️</span> Pickup available in 3 stores near you
//             </label>
//           </div>

//           <div className="shipping-address">
//             <label>Shipping address</label>
//             {isEditingAddress ? (
//               <input
//                 type="text"
//                 value={shippingAddress}
//                 onChange={(e) => setShippingAddress(e.target.value)}
//                 onBlur={() => setIsEditingAddress(false)}
//                 autoFocus
//               />
//             ) : (
//               <div className="address-display" onClick={() => setIsEditingAddress(true)}>
//                 {shippingAddress} <span className="edit-icon">✏️</span>
//               </div>
//             )}
//           </div>

//           <div className="payment-info">
//             <label>Payment information</label>
//             <div className="payment-methods">
//               <button
//                 className={`payment-method ${paymentMethod === "mastercard" ? "selected" : ""}`}
//                 onClick={() => setPaymentMethod("mastercard")}
//                 type="button"
//               >
//                 <img src="/mastercard.png" alt="Mastercard" />
//               </button>
//               <button
//                 className={`payment-method ${paymentMethod === "paypal" ? "selected" : ""}`}
//                 onClick={() => setPaymentMethod("paypal")}
//                 type="button"
//               >
//                 <img src="/paypal.png" alt="Paypal" />
//               </button>
//               <button
//                 className={`payment-method ${paymentMethod === "klarna" ? "selected" : ""}`}
//                 onClick={() => setPaymentMethod("klarna")}
//                 type="button"
//               >
//                 <img src="/klarna.png" alt="Klarna" />
//               </button>
//             </div>

//             <label>Name on card</label>
//             <input
//               type="text"
//               value={nameOnCard}
//               onChange={(e) => setNameOnCard(e.target.value)}
//               placeholder="Name on card"
//             />

//             <label>Card number</label>
//             <input
//               type="text"
//               value={cardNumber}
//               onChange={(e) => setCardNumber(e.target.value)}
//               placeholder="1234 5678 9012 3456"
//               maxLength={19}
//             />

//             <div className="card-details-row">
//               <div>
//                 <label>Expiration</label>
//                 <input
//                   type="text"
//                   value={expiration}
//                   onChange={(e) => setExpiration(e.target.value)}
//                   placeholder="MM/YY"
//                   maxLength={5}
//                 />
//               </div>
//               <div>
//                 <label>CVV</label>
//                 <input
//                   type="text"
//                   value={cvv}
//                   onChange={(e) => setCvv(e.target.value)}
//                   placeholder="123"
//                   maxLength={3}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="checkout-right">
//           <h3>Order Summary</h3>
//           <ul className="order-items">
//             {cartItems.map(({ product, quantity }) => (
//               <li key={product._id}>
//                 <span>×{quantity}</span> {product.name}
//                 <span>${(product.price * quantity).toFixed(2)}</span>
//                 <button className="remove-item" onClick={() => {}}>
//                   🗑️
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <div className="order-totals">
//             <p>
//               Delivery <span>${deliveryFee.toFixed(2)}</span>
//             </p>
//             <p>
//               Discount <span>${couponDiscount.toFixed(2)}</span>
//             </p>
//             <p>
//               Total (exc tax) <span>${totalExclTax.toFixed(2)}</span>
//             </p>
//             <p>
//               Tax <span>${tax.toFixed(2)}</span>
//             </p>
//             <p className="order-total">
//               Order Total <span>${orderTotal.toFixed(2)}</span>
//             </p>
//           </div>
//           <div className="coupon-code">
//             <input
//               type="text"
//               placeholder="Coupon code"
//               value={couponCode}
//               onChange={(e) => setCouponCode(e.target.value)}
//               disabled={couponApplied}
//             />
//             <button onClick={handleApplyCoupon} disabled={couponApplied}>
//               Apply
//             </button>
//           </div>
//           <button
//             className="confirm-payment"
//             onClick={handleConfirmPayment}
//             disabled={loading}
//           >
//             {loading ? "Processing..." : `Confirm Payment $${orderTotal.toFixed(2)}`}
//           </button>
//           {error && <p className="error">{error}</p>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../components/styles/Checkout.css";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("mastercard");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deliveryFee = 16.99;
  const tax = 12.99;

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const totalExclTax = totalPrice + deliveryFee;
  const orderTotal = totalExclTax + tax;

  useEffect(() => {
    if (user && user.shippingAddress) {
      setShippingAddress(user.shippingAddress);
    }
  }, [user]);

  const handleConfirmPayment = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);

      // Save order to localStorage for Profile page display
      const order = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        total: orderTotal,
        items: cartItems.map(({ product, quantity }) => ({
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity,
          image: product.image || "/placeholder.png"
        })),
      };
      const storedOrders = localStorage.getItem("userOrders");
      const orders = storedOrders ? JSON.parse(storedOrders) : [];
      orders.push(order);
      localStorage.setItem("userOrders", JSON.stringify(orders));

      clearCart();
      alert("Payment confirmed! Order placed successfully.");
      navigate("/orders");
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-main">
        <div className="checkout-left">
          <div className="shipping-address">
            <label>Shipping address</label>
            {isEditingAddress ? (
              <input
                type="text"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                onBlur={() => setIsEditingAddress(false)}
                autoFocus
              />
            ) : (
              <div className="address-display" onClick={() => setIsEditingAddress(true)}>
                {shippingAddress} <span className="edit-icon">✏️</span>
              </div>
            )}
          </div>

          <div className="payment-info">
            <label>Payment information</label>
            <div className="payment-methods">
              <button
                className={`payment-method ${paymentMethod === "mastercard" ? "selected" : ""}`}
                onClick={() => setPaymentMethod("mastercard")}
                type="button"
              >
                <img src="/mastercard.png" alt="Mastercard" />
              </button>
              <button
                className={`payment-method ${paymentMethod === "paypal" ? "selected" : ""}`}
                onClick={() => setPaymentMethod("paypal")}
                type="button"
              >
                <img src="/paypal.png" alt="Paypal" />
              </button>
              <button
                className={`payment-method ${paymentMethod === "klarna" ? "selected" : ""}`}
                onClick={() => setPaymentMethod("klarna")}
                type="button"
              >
                <img src="/klarna.png" alt="Klarna" />
              </button>
            </div>

            <label>Name on card</label>
            <input
              type="text"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              placeholder="Name on card"
            />

            <label>Card number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />

            <div className="card-details-row">
              <div>
                <label>Expiration</label>
                <input
                  type="text"
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <label>CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-right">
          <h3>Order Summary</h3>
          <ul className="order-items">
            {cartItems.map(({ product, quantity }) => (
              <li key={product._id}>
                <span>×{quantity}</span> {product.name}
                <span>${(product.price * quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="order-totals">
            <p>
              Delivery <span>${deliveryFee.toFixed(2)}</span>
            </p>
            <p>
              Total (exc tax) <span>${totalExclTax.toFixed(2)}</span>
            </p>
            <p>
              Tax <span>${tax.toFixed(2)}</span>
            </p>
            <p className="order-total">
              Order Total <span>${orderTotal.toFixed(2)}</span>
            </p>
          </div>
          <button
            className="confirm-payment"
            onClick={handleConfirmPayment}
            disabled={loading}
          >
            {loading ? "Processing..." : `Confirm Payment $${orderTotal.toFixed(2)}`}
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
