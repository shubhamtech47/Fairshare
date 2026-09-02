export function formatMoney(amount) {
  const n = Number(amount);
  if (!Number.isFinite(n)) return "$0.00";
  const sign = n < 0 ? "-" : "";
  return `${sign}$${Math.abs(n).toFixed(2)}`;
}

export function splitEqual(amount, ids) {
  if (!ids || ids.length === 0) return {};
  const n = ids.length;
  const totalCents = Math.round(Number(amount) * 100);
  const baseCents = Math.floor(totalCents / n);
  const remainder = totalCents - baseCents * n;

  const shares = {};
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const centShare = baseCents + (i < remainder ? 1 : 0);
    shares[id] = centShare / 100;
  }
  return shares;
}

export function percentsSumTo100(percents, splitWith) {
  const keys = splitWith ? splitWith.map(String) : Object.keys(percents);
  if (keys.length === 0) return false;
  const values = keys.map((k) => Number(percents[k]));
  if (values.some((v) => !Number.isFinite(v) || v <= 0)) {
    return false;
  }
  const sum = values.reduce((a, b) => a + b, 0);
  return Math.abs(sum - 100) < 0.01;
}

export function splitByPercent(amount, percents, splitWith) {
  const totalCents = Math.round(Number(amount) * 100);
  const keys = splitWith ? splitWith.map(String) : Object.keys(percents);
  const entries = keys.map((k) => [k, percents[k]]);
  if (entries.length === 0) return {};

  const shares = {};
  let allocatedCents = 0;
  entries.forEach(([id, pct], index) => {
    if (index === entries.length - 1) {
      shares[id] = (totalCents - allocatedCents) / 100;
    } else {
      const shareCents = Math.round((totalCents * Number(pct)) / 100);
      shares[id] = shareCents / 100;
      allocatedCents += shareCents;
    }
  });
  return shares;
}

export function sharesForExpense(expense) {
  if (expense.splitType === "percent" && expense.percents) {
    return splitByPercent(expense.amount, expense.percents, expense.splitWith);
  }
  return splitEqual(expense.amount, expense.splitWith);
}
