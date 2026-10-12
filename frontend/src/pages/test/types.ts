export type FieldType = 'text' | 'number' | 'email' | 'password' | 'checkbox' | 'textarea' | 'date'

export type FormField = {
  id: string
  name: string
  type: FieldType
  value: string | boolean
}

export type ApiTestResponse = {
  status: number
  statusText: string
  body: string
  durationMs: number
  error?: string
}

export const FIELD_TYPES: FieldType[] = [
  'text',
  'number',
  'email',
  'password',
  'checkbox',
  'textarea',
  'date',
]

export function createField(): FormField {
  return {
    id: crypto.randomUUID(),
    name: '',
    type: 'text',
    value: '',
  }
}
