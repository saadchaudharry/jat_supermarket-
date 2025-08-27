console.log("Custom POS script loaded");

const addCustomerPhoneField = setInterval(() => {
    // Wait until POS is fully loaded
    if (window.cur_pos && window.cur_pos.wrapper) {
        clearInterval(addCustomerPhoneField);

        // Locate the cart totals section (above discount)
        const cartTotalsSection = $(window.cur_pos.wrapper).find('.cart-totals-section');
        if (!cartTotalsSection.length) {
            console.warn("Cart totals section not found!");
            return;
        }

        // Create custom phone input field
        const customerPhoneField = $(`
            <div class="form-group" style="margin:5px;">
                <label>Customer Phone</label>
                <input type="text" class="form-control" id="custom_customer_phone" placeholder="Enter phone number">
            </div>
        `);

        // Insert the field above the totals/discount section
        customerPhoneField.insertBefore(cartTotalsSection);

        // Restore previously saved value if available
        if (window.cur_pos.frm.doc.custom_customer_phone) {
            $("#custom_customer_phone").val(window.cur_pos.frm.doc.custom_customer_phone);
        }

        // Save the value to POS Invoice doc on change
        $("#custom_customer_phone").on("change", function () {
            const phoneNumber = $(this).val();
            window.cur_pos.frm.set_value("custom_customer_phone", phoneNumber);
        });
    }
}, 1000);































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
