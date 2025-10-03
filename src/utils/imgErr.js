export const imgErr =
  (label) =>
  (e) =>
    console.warn(`Görsel bulunamadı [${label}]:`, e.currentTarget.src);
