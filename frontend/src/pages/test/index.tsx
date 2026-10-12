import GetRequest from './GetRequest'
import PostRequest from './PostRequest'

type TestTab = 'get' | 'post'

type Props = {
  tab: TestTab
  onTabChange: (tab: TestTab) => void
}

export default function TestHub({ tab, onTabChange }: Props) {
  return (
    <div className="w-full">
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onTabChange('get')}
          className={[
            'rounded-lg px-4 py-2 text-sm font-semibold transition',
            tab === 'get'
              ? 'bg-indigo-500 text-white'
              : 'bg-white/10 text-white/80 hover:bg-white/15 hover:text-white',
          ].join(' ')}
        >
          GET
        </button>
        <button
          type="button"
          onClick={() => onTabChange('post')}
          className={[
            'rounded-lg px-4 py-2 text-sm font-semibold transition',
            tab === 'post'
              ? 'bg-indigo-500 text-white'
              : 'bg-white/10 text-white/80 hover:bg-white/15 hover:text-white',
          ].join(' ')}
        >
          POST
        </button>
      </div>

      {tab === 'get' ? <GetRequest /> : <PostRequest />}
    </div>
  )
}
