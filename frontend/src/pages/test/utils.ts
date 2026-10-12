import type { FormField } from './types'

export function buildPayload(fields: FormField[]) {
  const payload: Record<string, string | number | boolean> = {}

  for (const field of fields) {
    if (!field.name.trim()) continue

    if (field.type === 'checkbox') {
      payload[field.name] = Boolean(field.value)
      continue
    }

    if (field.type === 'number') {
      const num = Number(field.value)
      payload[field.name] = Number.isNaN(num) ? String(field.value) : num
      continue
    }

    payload[field.name] = String(field.value)
  }

  return payload
}

export function buildQueryString(fields: FormField[]) {
  const params = new URLSearchParams()

  for (const field of fields) {
    if (!field.name.trim()) continue
    params.set(field.name, field.type === 'checkbox' ? String(Boolean(field.value)) : String(field.value))
  }

  const query = params.toString()
  return query ? `?${query}` : ''
}

export function joinUrl(baseUrl: string, path: string) {
  const base = baseUrl.replace(/\/$/, '')
  const endpoint = path.startsWith('/') ? path : `/${path}`
  return `${base}${endpoint}`
}
