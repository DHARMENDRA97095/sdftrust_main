// import React, { useEffect } from "react";

// const RazorpayButton = () => {
//   // Load Razorpay script dynamically
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   const handlePayment = () => {
//     const options = {
//       key: "rzp_test_SatDp8kEpcJUJn", // Replace with your key
//       amount: "1000",
//       currency: "INR",
//       description: "Dharmendra Kumar",
//       image: "https://via.placeholder.com/150",

//       prefill: {
//         email: "dharmendra97095@gmail.com",
//         contact: "9709544166",
//       },

//       config: {
//     display: {
//       blocks: {
//         banks: {
//           name: 'All Payment Options',
//           instruments: [
//             {
//               method: 'upi'
//             },
//             {
//               method: 'card'
//             },
//             {
//                 method: 'wallet'
//             },
//             {
//                 method: 'netbanking'
//             }
//           ],
//         },
//       },
//       sequence: ['block.banks'],
//       preferences: {
//         show_default_blocks: false,
//       },
//     },
//   },

//       handler: function (response) {
//         alert("Payment ID: " + response.razorpay_payment_id);
//       },

//       modal: {
//         ondismiss: function () {
//           if (window.confirm("Are you sure, you want to close the form?")) {
//             console.log("Checkout closed");
//           } else {
//             console.log("Continue payment");
//           }
//         },
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <button
//         onClick={handlePayment}
//         className="flex items-center gap-2 px-6 py-3 text-lg font-semibold text-gray-800 bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition"
//       >
//         💰 Own Checkout
//       </button>
//     </div>
//   );
// };

// export default RazorpayButton;
