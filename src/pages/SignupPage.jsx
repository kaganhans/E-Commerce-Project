// src/pages/SignupPage.jsx
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRolesIfNeeded } from "../store/client/thunks";
import { api } from "../api/axios"; // /signup POST için lazım

// VALIDASYON REGEX’LERİ
const strongPwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/; // 8+ küçük+büyük+rakam+özel
const trPhoneRegex  = /^(?:\+90|0)?\s?(?:\d{3})\s?\d{3}\s?\d{2}\s?\d{2}$/;   // TR telefon
const trIbanRegex   = /^TR\d{24}$/i;                                          // TR + 24 rakam
const trTaxNoRegex  = /^T\s?\d{4}\s?V\s?\d{6}$/i;                             // "T 1234 V 123456"

export default function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roles = useSelector((s) => s.client.roles); // roller store’dan

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
      role_id: "",
      store: { name: "", phone: "", tax_no: "", bank_account: "" }
    }
  });

  const roleId   = watch("role_id");
  const password = watch("password");

  // ROLLERİ sadece ihtiyaç varsa getir
  useEffect(() => {
    if (!roles || roles.length === 0) {
      dispatch(getRolesIfNeeded());
    }
  }, [dispatch, roles]);

  // ROLLER geldikten sonra "customer"ı varsayılan seç
  useEffect(() => {
    if (roles && roles.length > 0) {
      const customer = roles.find(r => r.name?.toLowerCase() === "customer" || r.code === "customer");
      if (customer) setValue("role_id", String(customer.id));
      else setValue("role_id", String(roles[0].id));
    }
  }, [roles, setValue]);

  const isStore = useMemo(() => {
    const r = roles?.find(r => String(r.id) === String(roleId));
    const codeOrName = r?.code || r?.name?.toLowerCase?.();
    return codeOrName === "store";
  }, [roles, roleId]);

  // ---- SUBMIT AKIŞI (/signup POST) ----
  const onSubmit = async (values) => {
    try {
      if (values.password !== values.password2) {
        setError("password2", { message: "Şifreler eşleşmiyor" });
        return;
      }

      const base = {
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
        role_id: Number(values.role_id),
      };

      const payload = isStore
        ? {
            ...base,
            store: {
              name: values.store.name.trim(),
              phone: values.store.phone.trim(),
              tax_no: values.store.tax_no.trim(),
              bank_account: values.store.bank_account.trim(),
            },
          }
        : base;

      await api.post("/signup", payload);

      alert("Hesabınızı etkinleştirmek için e-postadaki bağlantıya tıklamanız gerekiyor!");
      navigate(-1);
    } catch (err) {
      const status = err?.response?.status;
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        (status === 409
          ? "Bu e-posta veya kullanıcı adı zaten kayıtlı."
          : "Kayıt sırasında bir hata oluştu.");

      setError("root", { message: msg });
    }
  };

  return (
    <div className="min-h-screen bg-white font-['Montserrat']">
      <div className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-[#252B42] mb-6">Sign Up</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Ad (name) */}
          <div>
            <label className="block text-sm font-medium text-[#252B42]">Ad</label>
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              placeholder="Adınız"
              disabled={isSubmitting}
              {...register("name", {
                required: "Ad zorunlu",
                minLength: { value: 3, message: "En az 3 karakter" },
              })}
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
          </div>

          {/* E-posta */}
          <div>
            <label className="block text-sm font-medium text-[#252B42]">E-posta</label>
            <input
              className="mt-1 w-full rounded border px-3 py-2"
              placeholder="ornek@domain.com"
              disabled={isSubmitting}
              {...register("email", {
                required: "E-posta zorunlu",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Geçerli bir e-posta girin" },
              })}
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>

          {/* Şifre */}
          <div>
            <label className="block text-sm font-medium text-[#252B42]">Şifre</label>
            <input
              type="password"
              className="mt-1 w-full rounded border px-3 py-2"
              placeholder="••••••••"
              disabled={isSubmitting}
              {...register("password", {
                required: "Şifre zorunlu",
                pattern: {
                  value: strongPwRegex,
                  message: "8+ karakter; büyük, küçük, rakam ve özel karakter içermeli",
                },
              })}
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>

          {/* Şifre Doğrulama */}
          <div>
            <label className="block text-sm font-medium text-[#252B42]">Şifre Doğrulama</label>
            <input
              type="password"
              className="mt-1 w-full rounded border px-3 py-2"
              placeholder="••••••••"
              disabled={isSubmitting}
              {...register("password2", {
                required: "Tekrar şifre zorunlu",
                validate: (val) => val === password || "Şifreler eşleşmiyor",
              })}
            />
            {errors.password2 && <p className="text-red-600 text-sm">{errors.password2.message}</p>}
          </div>

          {/* Rol */}
          <div>
            <label className="block text-sm font-medium text-[#252B42]">Rol</label>
            <select
              className="mt-1 w-full rounded border px-3 py-2 bg-white"
              disabled={isSubmitting}
              {...register("role_id", { required: "Rol seçin" })}
            >
              {(roles || []).map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
            {errors.role_id && <p className="text-red-600 text-sm">{errors.role_id.message}</p>}
          </div>

          {/* STORE alanları (sadece store seçiliyse) */}
          {isStore && (
            <div className="space-y-4 border rounded p-4 bg-[#FAFAFA]">
              <h2 className="font-semibold text-[#252B42]">Mağaza Bilgileri</h2>

              <div>
                <label className="block text-sm font-medium text-[#252B42]">Mağaza Adı</label>
                <input
                  className="mt-1 w-full rounded border px-3 py-2"
                  placeholder="Mağaza adı"
                  disabled={isSubmitting}
                  {...register("store.name", {
                    required: "Mağaza adı zorunlu",
                    minLength: { value: 3, message: "En az 3 karakter" },
                  })}
                />
                {errors.store?.name && (
                  <p className="text-red-600 text-sm">{errors.store.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#252B42]">Mağaza Telefonu</label>
                <input
                  className="mt-1 w-full rounded border px-3 py-2"
                  placeholder="+90 5xx xxx xx xx"
                  disabled={isSubmitting}
                  {...register("store.phone", {
                    required: "Telefon zorunlu",
                    pattern: { value: trPhoneRegex, message: "Geçerli bir TR telefon girin" },
                  })}
                />
                {errors.store?.phone && (
                  <p className="text-red-600 text-sm">{errors.store.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#252B42]">Vergi Kimlik</label>
                <input
                  className="mt-1 w-full rounded border px-3 py-2"
                  placeholder='T 1234 V 123456'
                  disabled={isSubmitting}
                  {...register("store.tax_no", {
                    required: "Vergi kimlik zorunlu",
                    pattern: { value: trTaxNoRegex, message: 'Biçim: "T 1234 V 123456"' },
                  })}
                />
                {errors.store?.tax_no && (
                  <p className="text-red-600 text-sm">{errors.store.tax_no.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#252B42]">Banka IBAN</label>
                <input
                  className="mt-1 w-full rounded border px-3 py-2"
                  placeholder="TRXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                  disabled={isSubmitting}
                  {...register("store.bank_account", {
                    required: "IBAN zorunlu",
                    pattern: { value: trIbanRegex, message: "TR + 24 rakam (toplam 26 karakter)" },
                  })}
                />
                {errors.store?.bank_account && (
                  <p className="text-red-600 text-sm">{errors.store.bank_account.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Genel Hata */}
          {errors.root?.message && (
            <div className="text-red-700 text-sm border border-red-200 bg-red-50 p-3 rounded">
              {errors.root.message}
            </div>
          )}

          {/* SUBMIT BUTONU + SPINNER */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-lg bg-[#2A7CC7] text-white font-bold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isSubmitting && (
              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {isSubmitting ? "Gönderiliyor..." : "Kaydol"}
          </button>

          <p className="text-sm text-[#737373] text-center">
            Zaten hesabın var mı?{" "}
            <Link to="/login" className="text-[#2A7CC7] underline">
              Giriş yap
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
