// src/pages/LoginPage.jsx
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login } from "../store/client/thunks";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    mode: "onChange",
    defaultValues: { email: "", password: "", remember: true },
  });

  const onSubmit = async (vals) => {
    const { ok, error } = await dispatch(login(vals));
    if (!ok) {
      setError("root", { message: error });
      return;
    }
    // geri dön; geçmiş yoksa home
    const histIdx = window.history.state?.idx ?? 0;
    if (histIdx > 0) navigate(-1);
    else navigate("/");
  };

  return (
    <div className="min-h-screen bg-white font-['Montserrat']">
      <div className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-[#252B42] mb-6">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
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
              placeholder="••••••"
              disabled={isSubmitting}
              {...register("password", { required: "Şifre zorunlu" })}
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-2 select-none">
            <input type="checkbox" {...register("remember")} disabled={isSubmitting} />
            <span className="text-sm text-[#252B42]">Beni hatırla</span>
          </label>

          {/* Genel hata (toaster gibi) */}
          {errors.root?.message && (
            <div className="text-red-700 text-sm border border-red-200 bg-red-50 p-3 rounded">
              {errors.root.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-lg bg-[#2A7CC7] text-white font-bold flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isSubmitting && (
              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {isSubmitting ? "Gönderiliyor..." : "Giriş Yap"}
          </button>

          <p className="text-sm text-[#737373] text-center">
            Henüz hesabın yok mu?{" "}
            <Link to="/signup" className="text-[#2A7CC7] underline">
              Kayıt ol
            </Link>
          </p>

          {/* Test kullanıcıları ipucu */}
          <div className="text-xs text-[#737373] mt-4">
            Test kullanıcıları (şifre <b>123456</b>):<br />
            customer@commerce.com — store@commerce.com — admin@commerce.com
          </div>
        </form>
      </div>
    </div>
  );
}
