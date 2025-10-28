// src/sections/checkout/AddressFormModal.jsx
import { useForm } from "react-hook-form";

const defaultValues = {
  title: "",
  name: "",
  surname: "",
  phone: "",
  city: "",
  district: "",
  neighborhood: "",
  address: "",
};

export default function AddressFormModal({ initialValues, onClose, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
  } = useForm({
    defaultValues: initialValues || defaultValues,
    mode: "onChange", // alanlar doldukça valid olsun
  });

  const submit = async (data) => {
    try {
      // backend'in beklediği alan adları birebir
      await onSubmit(data);
    } catch (err) {
      // thunk/istek hata dönerse kullanıcıya göster
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Adres kaydedilemedi. Lütfen tekrar deneyin.";
      setError("root", { type: "server", message: msg });
    }
  };

  const inputCls = (hasErr) =>
    `w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${
      hasErr ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-black/70"
    }`;

  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center p-4 z-50">
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white w-full max-w-xl rounded-xl p-4 md:p-5 space-y-3"
        noValidate
      >
        <div className="text-lg font-semibold">Adres {initialValues ? "Düzenle" : "Ekle"}</div>

        {/* Sunucu/genel hata */}
        {"root" in errors && (
          <div className="rounded-md bg-red-50 text-red-700 text-sm px-3 py-2">
            {errors.root.message}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <input
              {...register("title", { required: "Adres başlığı zorunludur" })}
              placeholder="Adres Başlığı"
              className={inputCls(!!errors.title)}
              aria-invalid={!!errors.title}
            />
            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
          </div>

          <div>
            <input
              {...register("name", { required: "Ad zorunludur" })}
              placeholder="Ad"
              className={inputCls(!!errors.name)}
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <input
              {...register("surname", { required: "Soyad zorunludur" })}
              placeholder="Soyad"
              className={inputCls(!!errors.surname)}
              aria-invalid={!!errors.surname}
            />
            {errors.surname && <p className="mt-1 text-xs text-red-600">{errors.surname.message}</p>}
          </div>

          <div>
            <input
              {...register("phone", {
                required: "Telefon zorunludur",
                pattern: {
                  value: /^\d{10,11}$/,
                  message: "Telefon 10-11 haneli olmalı (sadece rakam)",
                },
              })}
              placeholder="Telefon"
              className={inputCls(!!errors.phone)}
              aria-invalid={!!errors.phone}
              inputMode="numeric"
            />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
          </div>

          <div>
            <select
              {...register("city", { required: "Şehir seçiniz" })}
              className={inputCls(!!errors.city)}
              aria-invalid={!!errors.city}
            >
              <option value="">Şehir</option>
              <option value="istanbul">istanbul</option>
              <option value="ankara">ankara</option>
              <option value="izmir">izmir</option>
              {/* TODO: illerin tam listesi */}
            </select>
            {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>}
          </div>

          <div>
            <input
              {...register("district", { required: "İlçe zorunludur" })}
              placeholder="İlçe"
              className={inputCls(!!errors.district)}
              aria-invalid={!!errors.district}
            />
            {errors.district && <p className="mt-1 text-xs text-red-600">{errors.district.message}</p>}
          </div>

          <div className="md:col-span-2">
            <input
              {...register("neighborhood", { required: "Mahalle zorunludur" })}
              placeholder="Mahalle"
              className={inputCls(!!errors.neighborhood)}
              aria-invalid={!!errors.neighborhood}
            />
            {errors.neighborhood && (
              <p className="mt-1 text-xs text-red-600">{errors.neighborhood.message}</p>
            )}
          </div>
        </div>

        <div>
          <textarea
            {...register("address", {
              required: "Adres detaylarını giriniz",
              minLength: { value: 10, message: "Daha açıklayıcı bir adres yazın" },
            })}
            rows={3}
            placeholder="Sokak, bina, kapı no..."
            className={inputCls(!!errors.address)}
            aria-invalid={!!errors.address}
          />
          {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>}
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">
            Vazgeç
          </button>
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`px-4 py-2 rounded-lg text-white ${
              !isValid || isSubmitting ? "bg-black/50 cursor-not-allowed" : "bg-black hover:bg-black/90"
            }`}
          >
            {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </form>
    </div>
  );
}
