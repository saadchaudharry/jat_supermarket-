import frappe


@frappe.whitelist()
def after_insert(doc,method=None):
    if doc.invoice_type == "POS Invoice":
        custom_customer_phone = frappe.db.get_value("POS Invoice", doc.invoice, "custom_customer_phone")

        if custom_customer_phone:
            if frappe.db.exists('JATS Customer Records', custom_customer_phone):
                customer_doc = frappe.get_doc('JATS Customer Records',custom_customer_phone)
            else:
                # Create new record if not exists
                customer_doc = frappe.new_doc('JATS Customer Records')
                customer_doc.phone = custom_customer_phone  # If name is same as phone
                customer_doc.customer_phone =custom_customer_phone  # If there's a field for phone


            if doc.loyalty_points != 0:
                # Append new item in child table
                if doc.redeem_against:
                    customer_doc.append('loyalty_item', {
                        "pos_inv": doc.invoice,
                        "earn": 0,
                        "redeem": abs(doc.loyalty_points),
                    })
                else:
                    customer_doc.append('loyalty_item', {
                        "pos_inv": doc.invoice,
                        "earn": abs(doc.loyalty_points),
                        "redeem": 0,
                    })

                # Save and commit changes
                customer_doc.save(ignore_permissions=True)
                frappe.db.commit()