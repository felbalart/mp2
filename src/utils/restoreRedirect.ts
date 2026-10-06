const REDIRECT_PARAM = 'redirect'

export function restoreRedirect(base: string): void {
  const url = new URL(window.location.href)
  const redirect = url.searchParams.get(REDIRECT_PARAM)
  if (!redirect) return

  const isSafe = redirect.startsWith(base) && !redirect.startsWith('//')
  window.history.replaceState(null, '', isSafe ? redirect : base)
}
