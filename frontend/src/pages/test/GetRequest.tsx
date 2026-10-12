import { useState } from 'react'
import FormFieldBuilder from './FormFieldBuilder'
import ResponsePanel from './ResponsePanel'
import type { ApiTestResponse, FormField } from './types'
import { buildQueryString, joinUrl } from './utils'

const inputClass =
  'h-10 w-full rounded-xl border border-white/15 bg-black/30 px-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-indigo-300/60 focus:ring-2 focus:ring-indigo-500/25'

export default function GetRequest() {
  const [baseUrl, setBaseUrl] = useState('http://localhost:3001')
  const [path, setPath] = useState('/api/v1/auth/me')
  const [withCredentials, setWithCredentials] = useState(true)
  const [fields, setFields] = useState<FormField[]>([])
  const [response, setResponse] = useState<ApiTestResponse | null>(null)
  const [loading, setLoading] = useState(false)

  const sendRequest = async () => {
    setLoading(true)
    const start = performance.now()

    try {
      const url = joinUrl(baseUrl, path) + buildQueryString(fields)
      const res = await fetch(url, {
        method: 'GET',
        credentials: withCredentials ? 'include' : 'same-origin',
      })

      const text = await res.text()
      let body = text

      try {
        body = JSON.stringify(JSON.parse(text), null, 2)
      } catch {
        // keep raw text
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        body,
        durationMs: Math.round(performance.now() - start),
      })
    } catch (error) {
      setResponse({
        status: 0,
        statusText: 'Network Error',
        body: '',
        durationMs: Math.round(performance.now() - start),
        error: error instanceof Error ? error.message : 'Request failed',
      })
    } finally {
      setLoading(false)
    }
  }

  const previewUrl = joinUrl(baseUrl, path) + buildQueryString(fields)

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">GET Request Tester</h1>
        <p className="mt-1 text-sm text-white/70">
          Build query params dynamically and send GET requests to your API.
        </p>
      </div>

      <div className="rounded-2xl border border-white/15 bg-slate-950/55 p-6 backdrop-blur">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-xs text-white/60">Base URL</label>
            <input
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="http://localhost:3001"
              className={inputClass}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-white/60">Path</label>
            <input
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="/api/v1/auth/me"
              className={inputClass}
            />
          </div>
        </div>

        <label className="mt-4 flex items-center gap-2 text-sm text-white/80">
          <input
            type="checkbox"
            checked={withCredentials}
            onChange={(e) => setWithCredentials(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-white/5"
          />
          Send cookies (credentials: include)
        </label>

        <div className="mt-4 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
          <p className="text-xs text-white/50">Preview URL</p>
          <p className="mt-1 break-all text-sm text-indigo-200">{previewUrl}</p>
        </div>

        <div className="mt-6">
          <FormFieldBuilder fields={fields} onChange={setFields} label="Query parameters" />
        </div>

        <button
          type="button"
          onClick={sendRequest}
          disabled={loading}
          className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-indigo-500 px-5 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Send GET
        </button>
      </div>

      <ResponsePanel response={response} loading={loading} />
    </div>
  )
}
