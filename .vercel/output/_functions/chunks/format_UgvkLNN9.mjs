function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(price);
}
function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export { formatPrice as a, capitalize as c, formatDate as f };
