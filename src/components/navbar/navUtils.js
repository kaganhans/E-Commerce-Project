// küçük yardımcılar: slug, id, cinsiyet ayrımı, fiyat
export const norm = (v) => String(v ?? "").trim().toLowerCase();

export const ascii = (s) =>
  norm(s)
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u");

export const showName = (c) =>
  c?.displayName ??
  c?.name ??
  c?.categoryName ??
  c?.title ??
  c?.label ??
  `cat-${c?.id ?? ""}`;

export const safeSlug = (c) =>
  c?.slug ||
  ascii(showName(c))
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const slugify = (txt) =>
  ascii(txt).replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "");

export const getId = (c, fallbackIndex = 0) =>
  c?.id ?? c?.categoryId ?? c?._id ?? String(fallbackIndex + 1);

export const genderOf = (c) => {
  const g = norm(
    c?.genderSlug ?? c?.gender ?? c?.genderType ?? c?.group ?? c?.type ?? c?.sex
  );
  if (["kadin", "kadın", "women", "woman", "female", "f"].includes(g)) return "kadin";
  if (["erkek", "men", "man", "male", "m"].includes(g)) return "erkek";
  return "";
};

export const fmtPrice = (n) =>
  (Number(n) || 0).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₺";
