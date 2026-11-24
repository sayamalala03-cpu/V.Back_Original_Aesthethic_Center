import { useEffect } from 'react'

const BASE = 'V.Back Original Aesthetic Center'

/** Sets the browser tab title for a page (and restores the base title when the page unmounts). */
export function useTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : BASE
    return () => { document.title = BASE }
  }, [title])
}
