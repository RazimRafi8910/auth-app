import { useId, useMemo, useState } from 'react'

type Props = {
  onGoLogin: () => void
}

export default function Register({ onGoLogin }: Props) {
  const nameId = useId()
  const emailId = useId()
  const passwordId = useId()
  const confirmId = useId()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [agree, setAgree] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState<null | { email: string; name: string }>(null)

  const passwordMatch = password.length > 0 && password === confirm

  const canSubmit = useMemo(() => {
    return (
      name.trim().length >= 2 &&
      email.trim().length > 3 &&
      password.length >= 6 &&
      password === confirm &&
      agree
    )
  }, [agree, confirm, email, name, password])

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-white/15 bg-slate-950/55 p-6 shadow-[0_30px_120px_-60px_rgba(0,0,0,0.95)] backdrop-blur md:p-8">
        <div className="mb-6">
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white">
            Get started in minutes
          </h1>
          <p className="mt-2 text-sm text-white/80">
            This is UI-only for now — we’ll connect an API later.
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted({ email: email.trim(), name: name.trim() })
          }}
        >
          <div className="space-y-2">
            <label htmlFor={nameId} className="text-sm font-medium text-white/90">
              Full name
            </label>
            <input
              id={nameId}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="h-11 w-full rounded-xl border border-white/15 bg-black/30 px-3 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-indigo-300/60 focus:outline-none focus:ring-4 focus:ring-indigo-500/25"
              autoComplete="name"
              required
            />
          </div>

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
              className="h-11 w-full rounded-xl border border-white/15 bg-black/30 px-3 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-indigo-300/60 focus:outline-none focus:ring-4 focus:ring-indigo-500/25"
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
                placeholder="At least 6 characters"
                className="h-11 w-full rounded-xl border border-white/15 bg-black/30 px-3 pr-20 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-indigo-300/60 focus:outline-none focus:ring-4 focus:ring-indigo-500/25"
                autoComplete="new-password"
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

          <div className="space-y-2">
            <label htmlFor={confirmId} className="text-sm font-medium text-white/90">
              Confirm password
            </label>
            <input
              id={confirmId}
              type={showPassword ? 'text' : 'password'}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat password"
              className="h-11 w-full rounded-xl border border-white/15 bg-black/30 px-3 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-indigo-300/60 focus:outline-none focus:ring-4 focus:ring-indigo-500/25"
              autoComplete="new-password"
              required
            />
            {confirm.length > 0 && !passwordMatch ? (
              <p className="text-xs text-rose-200/90">Passwords don’t match.</p>
            ) : null}
          </div>

          <label className="flex items-start gap-2 text-sm text-white/80">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500/30"
            />
            <span>
              I agree to the{' '}
              <button
                type="button"
                className="font-semibold text-indigo-200 hover:text-indigo-100"
                onClick={() => alert('UI-only: add terms page later.')}
              >
                Terms
              </button>{' '}
              and{' '}
              <button
                type="button"
                className="font-semibold text-indigo-200 hover:text-indigo-100"
                onClick={() => alert('UI-only: add privacy page later.')}
              >
                Privacy Policy
              </button>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={!canSubmit}
            className="group relative mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 text-sm font-semibold text-white shadow-[0_16px_50px_-20px_rgba(99,102,241,0.8)] transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Create account
            <span className="text-white/80 transition group-hover:translate-x-0.5">→</span>
          </button>

          {submitted ? (
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-50">
              Registered (mock):{' '}
              <span className="font-medium">{submitted.name}</span>{' '}
              <span className="text-emerald-100/80">({submitted.email})</span>
            </div>
          ) : null}
        </form>

        <div className="mt-6 text-center text-sm text-white/80">
          Already have an account?{' '}
          <button
            type="button"
            className="font-semibold text-indigo-200 hover:text-indigo-100"
            onClick={onGoLogin}
          >
            Sign in
          </button>
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-white/50">
        Tip: this layout is fully Tailwind, easy to theme.
      </div>
    </div>
  )
}

