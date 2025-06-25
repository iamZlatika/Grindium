
export function convertDonationToExp(sepoliaEth: string): string {
  const amount = parseFloat(sepoliaEth);
  if (isNaN(amount) || amount < 0) return '0';
  const xpPerUnit = 10000;
  const xp = Math.floor(amount * xpPerUnit);
  return xp.toString();
}
export function convertExpToDonation(ExpStr: string): string {
  const xp = parseInt(ExpStr, 10);
  if (isNaN(xp) || xp < 0) return '0';
  const unitPerXP = 0.0001;
  const amount = xp * unitPerXP;
  return amount.toFixed(6).replace(/\.?0+$/, '');
}

export function isValidNumberInput(value: string): boolean {
  return value === '' || /^(\d+(\.\d*)?)?$/.test(value);
}