import { useEffect, useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import TestHub from './pages/test'

type AppRoute = 'login' | 'register' | 'test'
type TestTab = 'get' | 'post'

function getRouteFromHash(): AppRoute {
  const hash = window.location.hash.replace('#', '').toLowerCase()
  if (hash === 'register') return 'register'
  if (hash.startsWith('test')) return 'test'
  return 'login'
}

function getTestTabFromHash(): TestTab {
  const hash = window.location.hash.replace('#', '').toLowerCase()
  return hash === 'test/post' ? 'post' : 'get'
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => getRouteFromHash())
  const [testTab, setTestTab] = useState<TestTab>(() => getTestTabFromHash())

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRouteFromHash())
      setTestTab(getTestTabFromHash())
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const goLogin = () => {
    window.location.hash = 'login'
  }

  const goRegister = () => {
    window.location.hash = 'register'
  }

  const goTest = (tab: TestTab = 'get') => {
    window.location.hash = tab === 'post' ? 'test/post' : 'test'
  }

  const onTestTabChange = (tab: TestTab) => {
    setTestTab(tab)
    window.location.hash = tab === 'post' ? 'test/post' : 'test'
  }

  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
            <div className="h-4 w-4 rounded-sm bg-linear-to-br from-indigo-400 to-pink-400" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">TASK MANAGER</div>
            <div className="text-xs text-white/70">simple task manager</div>
          </div>
        </div>

        <nav className="flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={goLogin}
            className={[
              'rounded-lg px-3 py-2 font-medium transition',
              route === 'login'
                ? 'bg-white/10 text-white ring-1 ring-white/10'
                : 'text-white/80 hover:bg-white/5 hover:text-white',
            ].join(' ')}
          >
            Login
          </button>
          <button
            type="button"
            onClick={goRegister}
            className={[
              'rounded-lg px-3 py-2 font-medium transition',
              route === 'register'
                ? 'bg-white/10 text-white ring-1 ring-white/10'
                : 'text-white/80 hover:bg-white/5 hover:text-white',
            ].join(' ')}
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => goTest('get')}
            className={[
              'rounded-lg px-3 py-2 font-medium transition',
              route === 'test'
                ? 'bg-white/10 text-white ring-1 ring-white/10'
                : 'text-white/80 hover:bg-white/5 hover:text-white',
            ].join(' ')}
          >
            API Test
          </button>
        </nav>
      </header>

      <main
        className={[
          'mx-auto w-full px-4 pb-14 pt-4',
          route === 'test' ? 'max-w-5xl' : 'grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2',
        ].join(' ')}
      >
        {route === 'test' ? (
          <TestHub tab={testTab} onTabChange={onTestTabChange} />
        ) : (
          <>
            <section className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/85">
                <span className="h-2 w-2 rounded-full bg-indigo-400" />
                Design preview
              </div>
              <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Simple, readable auth UI
              </h2>
              <p className="mt-3 max-w-prose text-sm leading-6 text-white/80">
                Tailwind styling, responsive layout, accessible labels, and local form state — no API calls yet.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { k: 'Responsive', v: 'Mobile-first layout' },
                  { k: 'Accessible', v: 'Labels + focus rings' },
                  { k: 'Modern', v: 'Glass + gradients' },
                  { k: 'No backend', v: 'Mock submit states' },
                ].map((x) => (
                  <div
                    key={x.k}
                    className="rounded-xl border border-white/15 bg-white/7 p-4 backdrop-blur"
                  >
                    <div className="text-sm font-semibold text-white">{x.k}</div>
                    <div className="mt-1 text-xs text-white/75">{x.v}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="order-1 flex justify-center md:order-2">
              {route === 'register' ? (
                <Register onGoLogin={goLogin} />
              ) : (
                <Login onGoRegister={goRegister} />
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}
