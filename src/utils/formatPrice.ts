export default function formatPrice(currency: string, price: number, fractionDigits: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits,
  })
    .format(price / 100)
    .split(',')
    .join(' ');
}
