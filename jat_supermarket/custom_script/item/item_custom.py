from frappe.model.naming import make_autoname
import frappe


@frappe.whitelist()
def autoname(doc, method=None):
    if doc.custom_code:
        doc.name =  make_autoname(doc.custom_code +'-'+ '.####')