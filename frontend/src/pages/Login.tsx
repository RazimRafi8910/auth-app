import { useId, useMemo, useState } from 'react'

type Props = {
  onGoRegister: () => void
}

export default function Login({ onGoRegister }: Props) {
  const emailId = useId()
  const passwordId = useId()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState<null | { email: string }>(null)

  const canSubmit = useMemo(() => {
    return email.trim().length > 3 && password.length >= 6
  }, [email, password])

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-white/15 bg-slate-950/55 p-6 shadow-[0_30px_120px_-60px_rgba(0,0,0,0.95)] backdrop-blur md:p-8">
        <div className="mb-6">
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-white/80">
            Use any email/password for now — no API hooked up yet.
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted({ email: email.trim() })
          }}
        >
          <div className="space-y-2">
            <label htmlFor={emailId} className="text-sm font-medium text-white/90">
              Email
            </label>
            <input
              id={emailId}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-11 w-full rounded-xl border border-white/15 bg-black/30 px-3 text-sm text-white placeholder:text-white/50 outline-none ring-0 transition focus:border-indigo-300/60 focus:outline-none focus:ring-4 focus:ring-indigo-500/25"
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor={passwordId} className="text-sm font-medium text-white/90">
              Password
            </label>
            <div className="relative">
              <input
                id={passwordId}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="h-11 w-full rounded-xl border border-white/15 bg-black/30 px-3 pr-20 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-indigo-300/60 focus:outline-none focus:ring-4 focus:ring-indigo-500/25"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm text-white/80">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500/30"
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-sm font-semibold text-indigo-200 hover:text-indigo-100"
              onClick={() => alert('No API yet — implement reset later.')}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="group relative mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 text-sm font-semibold text-white shadow-[0_16px_50px_-20px_rgba(99,102,241,0.8)] transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Sign in
            <span className="text-white/80 transition group-hover:translate-x-0.5">→</span>
          </button>

          {submitted ? (
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-50">
              Signed in (mock): <span className="font-medium">{submitted.email}</span>
              {remember ? <span className="text-emerald-100/80"> · remembered</span> : null}
            </div>
          ) : null}
        </form>

        <div className="mt-6 text-center text-sm text-white/80">
          New here?{' '}
          <button
            type="button"
            className="font-semibold text-indigo-200 hover:text-indigo-100"
            onClick={onGoRegister}
          >
            Create an account
          </button>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-white/50">
        By continuing you agree to our Terms & Privacy Policy.
      </div>
    </div>
  )
}

