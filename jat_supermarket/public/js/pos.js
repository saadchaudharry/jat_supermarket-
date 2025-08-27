// console.log("Loading custom POS script");
// frappe.provide("erpnext.pos");

// erpnext.pos.Cart = class Cart extends erpnext.pos.Cart {
//     make_cart() {
//         super.make_cart();

//         // Add custom field below the discount box
//         const custom_field = $(
//             `<div class="form-group" style="margin-top:10px;">
//                 <label>Customer Phone</label>
//                 <input type="text" class="form-control" id="custom_customer_phone" placeholder="Enter customer phone">
//             </div>`
//         );

//         this.$cart.append(custom_field);

//         // Save value into POS Invoice doc
//         $("#custom_customer_phone").on("change", (e) => {
//             this.frm.set_value("custom_customer_phone", e.target.value);
//         });
//     }

//     // Hook into checkout
//     async submit_invoice() {
//         console.log("Custom Phone before checkout:", this.frm.doc.custom_customer_phone);
//         await super.submit_invoice();
//     }
// };



















// // frappe.after_ajax(() => {
// //     // Wait until POS is loaded
// //     if (frappe.pages['point-of-sale'] && frappe.pages['point-of-sale'].pos) {
// //         inject_custom_pos_field();
// //     } else {
// //         // Watch until POS initializes
// //         let checkExist = setInterval(() => {
// //             if (frappe.pages['point-of-sale'] && frappe.pages['point-of-sale'].pos) {
// //                 clearInterval(checkExist);
// //                 inject_custom_pos_field();
// //             }
// //         }, 500);
// //     }
// // });

// // function inject_custom_pos_field() {
// //     let pos = frappe.pages['point-of-sale'].pos;

// //     // Add input field in the checkout section
// //     let customInput = $(`
// //         <div class="form-group" style="margin-top:10px;">
// //             <label>Customer Phone</label>
// //             <input type="text" class="form-control" id="custom_customer_phone" placeholder="Enter customer phone">
// //         </div>
// //     `);

// //     // Append field before Checkout button
// //     $(pos.$components_wrapper.find('.pos-cart')).append(customInput);

// //     // Save the value in the POS Invoice doc before checkout
// //     $("#custom_customer_phone").on("change", function() {
// //         let val = $(this).val();
// //         pos.frm.set_value("custom_customer_phone", val);
// //     });

// //     // Hook into checkout to log payload
// //     let oldCheckout = pos.checkout.bind(pos);
// //     pos.checkout = function() {
// //         console.log("Custom Phone:", pos.frm.doc.custom_customer_phone);
// //         oldCheckout();  // call original checkout
// //     };

// //     console.log("Custom POS field loaded!");
// // }












































// // // frappe.pages['point-of-sale'].on_page_load = function(wrapper) {
// // //     let page = frappe.pages['point-of-sale'];
    
// // //     // Wait for POS to fully load
// // //     setTimeout(() => {
// // //         let pos = page.pos;
// // //         if (!pos) return;

// // //         // Add input field in the checkout section
// // //         let customInput = $(`
// // //             <div class="form-group" style="margin-top:10px;">
// // //                 <label>Customer Phone</label>
// // //                 <input type="text" class="form-control" id="custom_customer_phone" placeholder="Enter customer phone">
// // //             </div>
// // //         `);

// // //         // Append field before Checkout button
// // //         $(pos.$components_wrapper.find('.pos-cart')).append(customInput);

// // //         // Save the value in the POS Invoice doc before checkout
// // //         $("#custom_customer_phone").on("change", function() {
// // //             let val = $(this).val();
// // //             pos.frm.set_value("custom_customer_phone", val);
// // //         });

// // //         // Hook into checkout to log payload
// // //         let oldCheckout = pos.checkout.bind(pos);
// // //         pos.checkout = function() {
// // //             console.log("Custom Phone:", pos.frm.doc.custom_customer_phone);
// // //             oldCheckout();  // call original checkout
// // //         };
// // //     }, 1000);
// // // };



















// // // // frappe.pages['point-of-sale'].on_page_load = function(wrapper) {
// // // //     let page = frappe.ui.make_app_page({
// // // //         parent: wrapper,
// // // //         title: 'Point of Sale',
// // // //         single_column: true
// // // //     });

// // // //     // Add custom field dynamically
// // // //     frappe.ui.form.make_control({
// // // //         df: {
// // // //             fieldtype: 'Data',
// // // //             fieldname: 'custom_field',
// // // //             label: 'Custom Field',
// // // //             placeholder: 'Enter value here'
// // // //         },
// // // //         parent: $(wrapper).find('.pos-cart'),  // append near cart or wherever you want
// // // //         render_input: true
// // // //     });
// // // // }
