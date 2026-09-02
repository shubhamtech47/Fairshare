# Bugs found

Add one section per issue. Bug 1 is filled in to show the format — fix it, then write what you changed. Copy the blank template for the rest.

Keep this file in the repo and **commit it** with your fixes.

---

## Bug 1

**How to reproduce:** Open the app. The expense list says “Newest first”. The first row is Wine (7 Mar). Board game (15 Mar) is further down.

**What is wrong:** The list is showing oldest expenses first. Newest should be at the top. In addition, `dateValue` in `format.js` returned the raw date as-is instead of a numeric timestamp, causing string dates to evaluate to `NaN` during subtraction.

**What I changed:** Updated `dateValue` in `src/lib/format.js` to return `new Date(date).getTime()`, and reversed the comparator in `src/components/ExpenseList.jsx` to `dateValue(b.date) - dateValue(a.date)` so newest expenses appear first.
