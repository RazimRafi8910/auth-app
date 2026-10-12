import { FIELD_TYPES, type FormField } from './types'

type Props = {
  fields: FormField[]
  onChange: (fields: FormField[]) => void
  label: string
}

export default function FormFieldBuilder({ fields, onChange, label }: Props) {
  const updateField = (id: string, patch: Partial<FormField>) => {
    onChange(fields.map((field) => (field.id === id ? { ...field, ...patch } : field)))
  }

  const removeField = (id: string) => {
    onChange(fields.filter((field) => field.id !== id))
  }

  const addField = () => {
    onChange([...fields, { id: crypto.randomUUID(), name: '', type: 'text', value: '' }])
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">{label}</h3>
        <button
          type="button"
          onClick={addField}
          className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/15"
        >
          + Add field
        </button>
      </div>

      {fields.length === 0 ? (
        <p className="rounded-xl border border-dashed border-white/15 px-4 py-6 text-center text-sm text-white/50">
          No fields yet. Click &quot;Add field&quot; to build your form.
        </p>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 gap-3 rounded-xl border border-white/10 bg-black/20 p-3 sm:grid-cols-[1fr_140px_1fr_auto]"
            >
              <div className="space-y-1">
                <label className="text-xs text-white/60">Field name</label>
                <input
                  value={field.name}
                  onChange={(e) => updateField(field.id, { name: e.target.value })}
                  placeholder={`field_${index + 1}`}
                  className="h-9 w-full rounded-lg border border-white/15 bg-black/30 px-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-indigo-300/60 focus:ring-2 focus:ring-indigo-500/25"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white/60">Input type</label>
                <select
                  value={field.type}
                  onChange={(e) => {
                    const type = e.target.value as FormField['type']
                    updateField(field.id, {
                      type,
                      value: type === 'checkbox' ? false : '',
                    })
                  }}
                  className="h-9 w-full rounded-lg border border-white/15 bg-black/30 px-3 text-sm text-white outline-none focus:border-indigo-300/60 focus:ring-2 focus:ring-indigo-500/25"
                >
                  {FIELD_TYPES.map((type) => (
                    <option key={type} value={type} className="bg-slate-900">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-white/60">Value</label>
                {field.type === 'checkbox' ? (
                  <label className="flex h-9 items-center gap-2 text-sm text-white/80">
                    <input
                      type="checkbox"
                      checked={Boolean(field.value)}
                      onChange={(e) => updateField(field.id, { value: e.target.checked })}
                      className="h-4 w-4 rounded border-white/20 bg-white/5"
                    />
                    {field.value ? 'true' : 'false'}
                  </label>
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={String(field.value)}
                    onChange={(e) => updateField(field.id, { value: e.target.value })}
                    rows={2}
                    className="w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-indigo-300/60 focus:ring-2 focus:ring-indigo-500/25"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={String(field.value)}
                    onChange={(e) => updateField(field.id, { value: e.target.value })}
                    className="h-9 w-full rounded-lg border border-white/15 bg-black/30 px-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-indigo-300/60 focus:ring-2 focus:ring-indigo-500/25"
                  />
                )}
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeField(field.id)}
                  className="h-9 rounded-lg px-3 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/10"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
