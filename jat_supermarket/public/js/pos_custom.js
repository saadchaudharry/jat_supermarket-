// document ready jquery
console.log("Custom POS script loaded 333");


// Event delegation to handle loyalty card clicks
$(document).on('click', '.mode-of-payment.loyalty-card.border-primary', function() {
    console.log('Loyalty card clicked:', this);

    var $posNoti = $("#page-point-of-sale .loyalty-amount.mode-of-payment-control p:nth-child(3)");
    const inputSelector = "#page-point-of-sale > div.container.page-body > div.page-wrapper > div > div.row.layout-main > div > div.layout-main-section > div.point-of-sale-app > section.payment-container > div.payment-modes > div:nth-child(4) > div > div.loyalty-amount.mode-of-payment-control > div > div > div.control-input-wrapper > div.control-input > input";

    if ( !cur_pos.frm.doc.custom_customer_phone  ){
        const inputEl = document.querySelector(inputSelector);
        if (inputEl) {
            inputEl.value = "0.0";         // Set value to 0.0
            inputEl.readOnly = true;
            cur_pos.frm.set_value("loyalty_points", 0);

            console.log("Loyalty input is now read-only");
        }

        if ($posNoti.length) {
            $posNoti.html("Please enter the customer's phone number to redeem loyalty points");
        }
    }
    else {
            frappe.call({
                    method: "get_loyalty_point",
                    args: {
                        customer_phone: cur_pos.frm.doc.custom_customer_phone,
                    },
                    callback: function (r) {
                        if (r && r.message !== undefined) {
                            const loyaltyPoints = r.message;

                            // Update POS notification
                            var posNoti = document.querySelector("#page-point-of-sale .loyalty-amount.mode-of-payment-control p:nth-child(3)");
                            if (posNoti) {
                                posNoti.innerHTML = `User has ${loyaltyPoints} loyalty points`;
                            }

                            // Make input editable
                            const inputSelector = "#page-point-of-sale > div.container.page-body > div.page-wrapper > div > div.row.layout-main > div > div.layout-main-section > div.point-of-sale-app > section.payment-container > div.payment-modes > div:nth-child(4) > div > div.loyalty-amount.mode-of-payment-control > div > div > div.control-input-wrapper > div.control-input > input";
                            const inputEl = document.querySelector(inputSelector);
                            if (inputEl) {
                                inputEl.readOnly = false;
                                // inputEl.value = loyaltyPoints; // optionally set the value
                            }
                        }
                    }
                });
    } 

    
});

// Optional: observe DOM to log when payment container becomes visible
const observer2 = new MutationObserver((mutationsList, observer) => {
    const $paymentContainer = $('.payment-container');
    if ($paymentContainer.is(':visible')) {
        console.log('.payment-container is visible, loyalty card click handler active');
        observer.disconnect(); // Optional: stop observing if you only need it once
    }
});

observer2.observe(document.body, { childList: true, subtree: true });














































































































// const addCustomerPhoneField = setInterval(() => {
//     // Wait until POS is fully loaded
//     if (window.cur_pos && window.cur_pos.wrapper) {
//         clearInterval(addCustomerPhoneField);

//         // Locate the cart totals section (above discount)
//         const cartTotalsSection = $(window.cur_pos.wrapper).find('.cart-totals-section');
//         if (!cartTotalsSection.length) {
//             console.warn("Cart totals section not found!");
//             return;
//         }

//         // Create custom phone input field
//         const customerPhoneField = $(`
//             <div class="form-group" style="margin:5px;">
//                 <label>Customer Phone</label>
//                 <input type="text" class="form-control" id="custom_customer_phone" placeholder="Enter phone number">
//             </div>
//         `);

//         // Insert the field above the totals/discount section
//         customerPhoneField.insertBefore(cartTotalsSection);

//         // Restore previously saved value if available
//         if (window.cur_pos.frm.doc.custom_customer_phone) {
//             $("#custom_customer_phone").val(window.cur_pos.frm.doc.custom_customer_phone);
//         }

//         // Save the value to POS Invoice doc on change
//         $("#custom_customer_phone").on("change", function () {
//             const phoneNumber = $(this).val();
//             console.log("Saving phone number:", phoneNumber);
//             window.cur_pos.frm.set_value("custom_customer_phone", phoneNumber);
//         });
//     }
// }, 1500);































// console.log("Custom POS script loaded");

// const addCustomerPhoneField = setInterval(() => {
//     if (window.cur_pos && window.cur_pos.wrapper) {
//         clearInterval(addCustomerPhoneField);

//         const cartTotalsSection = $(window.cur_pos.wrapper).find('.cart-totals-section');
//         if (!cartTotalsSection.length) {
//             console.warn("Cart totals section not found!");
//             return;
//         }

//         // Add custom phone input
//         const customerPhoneField = $(`
//             <div class="form-group" style="margin:10px;">
//                 <label>Customer Phone</label>
//                 <input type="text" class="form-control" id="custom_customer_phone" placeholder="Enter phone number">
//                 <small id="phone_error" style="color:red;display:none;">Enter a valid 10-digit phone number</small>
//             </div>
//         `);
//         customerPhoneField.insertBefore(cartTotalsSection);

//         // Restore saved value if any
//         if (window.cur_pos.frm.doc.custom_customer_phone) {
//             $("#custom_customer_phone").val(window.cur_pos.frm.doc.custom_customer_phone);
//         }

//         // Find checkout button
//         const checkoutBtn = $(window.cur_pos.wrapper).find(".pos-checkout-btn");

//         // Phone validation function
//         function validatePhone() {
//             const phone = $("#custom_customer_phone").val().trim();
//             const isValid = /^\d{10}$/.test(phone);

//             if (window.cur_pos.frm.doc.is_return == 1) {
//                 if (!isValid) {
//                     $("#phone_error").show();
//                     checkoutBtn.prop("disabled", true);
//                 } else {
//                     $("#phone_error").hide();
//                     checkoutBtn.prop("disabled", false);
//                 }
//             } else {
//                 $("#phone_error").hide();
//                 checkoutBtn.prop("disabled", false);
//             }
//             return isValid;
//         }

//         // Save value and validate on change
//         $("#custom_customer_phone").on("input", function () {
//             const phoneNumber = $(this).val().trim();
//             window.cur_pos.frm.set_value("custom_customer_phone", phoneNumber);
//             validatePhone();
//         });

//         // Initial validation check
//         validatePhone();

//         // Prevent checkout if invalid when return
//         checkoutBtn.on("click", function (e) {
//             if (window.cur_pos.frm.doc.is_return == 1 && !validatePhone()) {
//                 e.preventDefault();
//                 frappe.msgprint("Please enter a valid 10-digit phone number before checkout.");
//             }
//         });
//     }
// }, 1000);






















































// // frappe.require("point-of-sale.bundle.js", function () {
// //     // const originalPOS = erpnext.PointOfSale.Controller;

// //     // erpnext.PointOfSale.Controller = originalPOS.extend({
// //     //     make() {
// //     //         this._super();
// //     //         console.log("Custom POS Loaded!");

// //     //         // Example: Add custom field input
// //     //         let customInput = $(`
// //     //             <div class="form-group" style="margin:10px;">
// //     //                 <label>Customer Phone</label>
// //     //                 <input type="text" class="form-control" id="custom_customer_phone">
// //     //             </div>
// //     //         `);
// //     //         this.wrapper.append(customInput);

// //     //         // Save to doc before checkout
// //     //         $("#custom_customer_phone").on("change", (e) => {
// //     //             this.frm.set_value("custom_customer_phone", e.target.value);
// //     //         });
// //     //     },
// //     // });
// // });
