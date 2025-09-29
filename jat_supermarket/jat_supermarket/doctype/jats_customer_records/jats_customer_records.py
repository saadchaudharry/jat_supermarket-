# Copyright (c) 2025, saad and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class JATSCustomerRecords(Document):
	def validate(self):
		credit = 0
		debit = 0
		for i in self.items:
			credit += i.credit or 0
			debit += i.debit or 0

		self.credit = credit
		self.debit = debit
		self.balance = credit - debit

		earn = 0
		redeem = 0
		for i in self.loyalty_item:
			earn += i.earn or 0
			redeem += i.redeem or 0

		self.earn = earn
		self.redeem = redeem
		self.loyalty_point = earn - redeem
