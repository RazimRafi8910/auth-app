import type { ApiTestResponse } from './types'

type Props = {
  response: ApiTestResponse | null
  loading: boolean
}

export default function ResponsePanel({ response, loading }: Props) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-white">Response</h3>
      <div className="min-h-48 rounded-xl border border-white/10 bg-black/30 p-4">
        {loading ? (
          <p className="text-sm text-white/60">Sending request...</p>
        ) : !response ? (
          <p className="text-sm text-white/50">Response will appear here after you send a request.</p>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span
                className={[
                  'rounded-full px-2.5 py-1 text-xs font-semibold',
                  response.status >= 200 && response.status < 300
                    ? 'bg-emerald-500/15 text-emerald-200'
                    : response.status >= 400
                      ? 'bg-rose-500/15 text-rose-200'
                      : 'bg-amber-500/15 text-amber-200',
                ].join(' ')}
              >
                {response.status} {response.statusText}
              </span>
              <span className="text-white/50">{response.durationMs}ms</span>
            </div>

            {response.error ? (
              <p className="text-sm text-rose-200">{response.error}</p>
            ) : null}

            <pre className="overflow-x-auto whitespace-pre-wrap break-words text-xs leading-5 text-white/85">
              {response.body}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
