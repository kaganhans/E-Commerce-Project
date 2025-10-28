// src/utils/slug.js
const TR_MAP = {
  ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i", ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u",
};
export function slugify(str = "") {
  return String(str)
    .replace(/[çğıöşüÇĞİÖŞÜ]/g, (ch) => TR_MAP[ch] || ch)
    .toLowerCase()
    .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
