# Bugs found

Add one section per issue. Bug 1 is filled in to show the format — fix it, then write what you changed. Copy the blank template for the rest.

Keep this file in the repo and **commit it** with your fixes.

---

## Bug 1

**How to reproduce:** Open the app. The expense list says “Newest first”. The first row is Wine (7 Mar). Board game (15 Mar) is further down.

**What is wrong:** The list is showing oldest expenses first. Newest should be at the top. In addition, `dateValue` in `format.js` returned the raw date as-is instead of a numeric timestamp, causing string dates to evaluate to `NaN` during subtraction.

**What I changed:** Updated `dateValue` in `src/lib/format.js` to return `new Date(date).getTime()`, and reversed the comparator in `src/components/ExpenseList.jsx` to `dateValue(b.date) - dateValue(a.date)` so newest expenses appear first.

---

## Bug 2

**How to reproduce:** Open the app and observe the Balances panel. Ben (who paid $276 while only consuming $217) is marked as "owes $59.00" in red, while Aisha (who paid $148 while consuming $233.01) is marked as "is owed $85.01" in green.

**What is wrong:** The positive/negative conditions and styling in `src/components/BalancesPanel.jsx` were inverted. Members with a positive balance (creditors who paid more than their share) were displayed as "owes" with red text, and members with a negative balance (debtors who owe money) were displayed as "is owed" with green text.

**What I changed:** Swapped the conditions in `src/components/BalancesPanel.jsx` so that `bal > 0.005` displays `is owed ${formatMoney(bal)}` with the `owed` class (green), and `bal < -0.005` displays `owes ${formatMoney(-bal)}` with the `owe` class (red).

---

## Bug 3

**How to reproduce:** Check the running balance for Diya Patel regarding expense `e2` (Uber to airport: $60 paid by Diya, split only between Aisha and Ben). Diya's balance was computed as +$30 instead of +$60.

**What is wrong:** In `src/lib/balances.js`, lines 16–19 checked if `exp.paidBy` was not in `shares` and subtracted `amount / n` from the payer's balance. According to the specification, someone paying for others without participating in the split is owed the full amount back.

**What I changed:** Removed lines 16–19 from `src/lib/balances.js` so that a payer who is not included in the split is credited the full payment amount without an artificial deduction.

---

## Bug 4

**How to reproduce:** Create balances where a debtor's total debt equals a creditor's total credit (e.g. `d.amount === c.amount`).

**What is wrong:** In `src/lib/settle.js`, the `else` branch of `suggestSettlements` incremented both pointers `i += 1; j += 1;` without adding the transfer to the `transfers` array, omitting the settlement transaction completely.

**What I changed:** Refactored `suggestSettlements` in `src/lib/settle.js` using `Math.min(d.amount, c.amount)` to record the exact transfer and advance both pointers when debts and credits match, preventing dropped settlements and floating-point drift.
