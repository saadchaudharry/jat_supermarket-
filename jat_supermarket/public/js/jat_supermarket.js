frappe.provide('frappe.ui.form');


// Function to be triggered when a DOM change is detected
function handleDOMChange(mutationsList, observer) {

    if (frappe.get_route()){

        if (frappe.get_route()[0] == ['point-of-sale'] ){

            const el = document.querySelector('.customer-section');
            if (el) {
                  // console.log("POS page detected");
                  addCustomerPhoneField();
            }

            if ($('.invoice-summary-wrapper').is(':visible')) {
                $('#custom_customer_phone').val('');
            }


            if ($('.loyalty-amount mode-of-payment-control').is(':visible')) {
                    console.log("Loyalty card clicked:")

            }



        }
    }


  
  

// Function to attach loyalty card click handler
function attachLoyaltyClick() {
    var $loyaltyCards = $('.mode-of-payment.loyalty-card.border-primary');
    var $posNoti = $("#page-point-of-sale .loyalty-amount.mode-of-payment-control p:nth-child(3)");

    // Attach click handler with namespace to prevent duplicates
    $loyaltyCards.off('click.customPOS').on('click.customPOS', function() {
        console.log('Loyalty card clicked:', this);
        $posNoti.html('');
    });
}


  
  // functionality to run when a change is detected
  function addCustomerPhoneField() {
    // Wait until POS is fully loaded
      const custom_customer_phone = document.querySelector('#custom_customer_phone');



    if (window.cur_pos && window.cur_pos.wrapper && !custom_customer_phone) {
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
        console.log("Customer Phone field added to POS");
        // Restore previously saved value if available
        // if (window.cur_pos.frm.doc.custom_customer_phone) {
        //     $("#custom_customer_phone").val(window.cur_pos.frm.doc.custom_customer_phone);
        // }

        // Save the value to POS Invoice doc on change
        $("#custom_customer_phone").on("change", function () {
            const phoneNumber = $(this).val();
            console.log("Saving phone number:", phoneNumber);
            window.cur_pos.frm.set_value("custom_customer_phone", phoneNumber);
            updateLoyaltyPoints();
        });
    }



}
  
function updateLoyaltyPoints() {
    // Call Frappe backend method
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






  }
  

  // Create a new MutationObserver with the callback function
  const observer = new MutationObserver(handleDOMChange);
  
  // Specify the target node and the type of mutations to observe
  const targetNode = document.body; // You can choose any DOM element you want to observe
  const config = { attributes: true, childList: true, subtree: true, characterData: false };
  
  // Start observing the target node for changes
  observer.observe(targetNode, config);










































































































// // pos_custom.js
// (() => {
//   // Safe poll until the original exists
//   function waitForPOSAndExtend() {
//     if (window.erpnext && erpnext.PointOfSale && erpnext.PointOfSale.Controller) {
//       extendPOS();
//     } else {
//       // try again shortly
//       setTimeout(waitForPOSAndExtend, 150);
//     }
//   }

//   function extendPOS() {
//     // Keep a reference to original
//     const OriginalPOS = erpnext.PointOfSale.Controller;

//     // Replace with subclass
//     erpnext.PointOfSale.Controller = class extends OriginalPOS {
//       constructor(opts) {
//         super(opts);
//         // your custom initialisation here
//         console.log('Custom POS Controller initialized');
//         // example: add a custom flag
//         this._custom_extension_loaded = true;
//       }

//       // Example: call original on_page_load and then run custom code
//       on_page_load() {
//         // call original behaviour (if it exists)
//         if (super.on_page_load) super.on_page_load();

//         console.log('Custom on_page_load logic here');

//         // your additional on_page_load code
//         // for example: add a button to the page
//         const wrapper = this.wrapper;
//         if (wrapper) {
//           const btn = wrapper.querySelector('.pos-custom-btn') 
//                     || (function() {
//                         const b = document.createElement('button');
//                         b.className = 'btn btn-secondary pos-custom-btn';
//                         b.innerText = 'My POS Action';
//                         // place it somewhere sensible
//                         const header = wrapper.querySelector('.pos-header') || wrapper;
//                         header.appendChild(b);
//                         return b;
//                       })();

//           btn.addEventListener('click', () => {
//             frappe.msgprint('Custom POS action clicked!');
//           });
//         }
//       }

//       // Example: override some method (preserve original by calling super)
//       some_method_to_override() {
//         // pre-behaviour
//         console.log('Before original some_method');

//         // call original
//         if (super.some_method_to_override) super.some_method_to_override();

//         // post-behaviour
//         console.log('After original some_method');
//       }
//     };

//     console.log('erpnext.PointOfSale.Controller extended.');
//   }

//   // start waiting
//   waitForPOSAndExtend();
// })();

























// // console.log("Loading custom POS script");
// // frappe.provide("erpnext.pos");

// // erpnext.pos.Cart = class Cart extends erpnext.pos.Cart {
// //     make_cart() {
// //         super.make_cart();

// //         // Add custom field below the discount box
// //         const custom_field = $(
// //             `<div class="form-group" style="margin-top:10px;">
// //                 <label>Customer Phone</label>
// //                 <input type="text" class="form-control" id="custom_customer_phone" placeholder="Enter customer phone">
// //             </div>`
// //         );

// //         this.$cart.append(custom_field);

// //         // Save value into POS Invoice doc
// //         $("#custom_customer_phone").on("change", (e) => {
// //             this.frm.set_value("custom_customer_phone", e.target.value);
// //         });
// //     }

// //     // Hook into checkout
// //     async submit_invoice() {
// //         console.log("Custom Phone before checkout:", this.frm.doc.custom_customer_phone);
// //         await super.submit_invoice();
// //     }
// // };



















// // // frappe.after_ajax(() => {
// // //     // Wait until POS is loaded
// // //     if (frappe.pages['point-of-sale'] && frappe.pages['point-of-sale'].pos) {
// // //         inject_custom_pos_field();
// // //     } else {
// // //         // Watch until POS initializes
// // //         let checkExist = setInterval(() => {
// // //             if (frappe.pages['point-of-sale'] && frappe.pages['point-of-sale'].pos) {
// // //                 clearInterval(checkExist);
// // //                 inject_custom_pos_field();
// // //             }
// // //         }, 500);
// // //     }
// // // });

// // // function inject_custom_pos_field() {
// // //     let pos = frappe.pages['point-of-sale'].pos;

// // //     // Add input field in the checkout section
// // //     let customInput = $(`
// // //         <div class="form-group" style="margin-top:10px;">
// // //             <label>Customer Phone</label>
// // //             <input type="text" class="form-control" id="custom_customer_phone" placeholder="Enter customer phone">
// // //         </div>
// // //     `);

// // //     // Append field before Checkout button
// // //     $(pos.$components_wrapper.find('.pos-cart')).append(customInput);

// // //     // Save the value in the POS Invoice doc before checkout
// // //     $("#custom_customer_phone").on("change", function() {
// // //         let val = $(this).val();
// // //         pos.frm.set_value("custom_customer_phone", val);
// // //     });

// // //     // Hook into checkout to log payload
// // //     let oldCheckout = pos.checkout.bind(pos);
// // //     pos.checkout = function() {
// // //         console.log("Custom Phone:", pos.frm.doc.custom_customer_phone);
// // //         oldCheckout();  // call original checkout
// // //     };

// // //     console.log("Custom POS field loaded!");
// // // }












































// // // // frappe.pages['point-of-sale'].on_page_load = function(wrapper) {
// // // //     let page = frappe.pages['point-of-sale'];
    
// // // //     // Wait for POS to fully load
// // // //     setTimeout(() => {
// // // //         let pos = page.pos;
// // // //         if (!pos) return;

// // // //         // Add input field in the checkout section
// // // //         let customInput = $(`
// // // //             <div class="form-group" style="margin-top:10px;">
// // // //                 <label>Customer Phone</label>
// // // //                 <input type="text" class="form-control" id="custom_customer_phone" placeholder="Enter customer phone">
// // // //             </div>
// // // //         `);

// // // //         // Append field before Checkout button
// // // //         $(pos.$components_wrapper.find('.pos-cart')).append(customInput);

// // // //         // Save the value in the POS Invoice doc before checkout
// // // //         $("#custom_customer_phone").on("change", function() {
// // // //             let val = $(this).val();
// // // //             pos.frm.set_value("custom_customer_phone", val);
// // // //         });

// // // //         // Hook into checkout to log payload
// // // //         let oldCheckout = pos.checkout.bind(pos);
// // // //         pos.checkout = function() {
// // // //             console.log("Custom Phone:", pos.frm.doc.custom_customer_phone);
// // // //             oldCheckout();  // call original checkout
// // // //         };
// // // //     }, 1000);
// // // // };



















// // // // // frappe.pages['point-of-sale'].on_page_load = function(wrapper) {
// // // // //     let page = frappe.ui.make_app_page({
// // // // //         parent: wrapper,
// // // // //         title: 'Point of Sale',
// // // // //         single_column: true
// // // // //     });

// // // // //     // Add custom field dynamically
// // // // //     frappe.ui.form.make_control({
// // // // //         df: {
// // // // //             fieldtype: 'Data',
// // // // //             fieldname: 'custom_field',
// // // // //             label: 'Custom Field',
// // // // //             placeholder: 'Enter value here'
// // // // //         },
// // // // //         parent: $(wrapper).find('.pos-cart'),  // append near cart or wherever you want
// // // // //         render_input: true
// // // // //     });
// // // // // }
