const TIMEOUT_MS = 10000

export const getApiBaseUrl = () => (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '')

export const isApiConfigured = () => {
  const url = getApiBaseUrl()
  return Boolean(url) && !/YOUR_PROJECT_ID|x{4,}/i.test(url)
}

export class ApiError extends Error {
  constructor(key, { status = 0, params = {} } = {}) {
    super(key)
    this.key = key
    this.status = status
    this.params = { status, ...params }
  }
}

export async function request(path, { method = 'GET', body } = {}) {
  if (!isApiConfigured()) throw new ApiError('api.notConfigured')

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  let response
  try {
    response = await fetch(`${getApiBaseUrl()}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    })
  } catch (err) {
    throw new ApiError(err.name === 'AbortError' ? 'api.timeout' : 'api.network')
  } finally {
    clearTimeout(timer)
  }

  if (!response.ok) {
    throw new ApiError(response.status === 404 ? 'api.notFound' : 'api.http', {
      status: response.status,
    })
  }

  return response.status === 204 ? null : response.json()
}
