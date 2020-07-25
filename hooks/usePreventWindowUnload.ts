import React from 'react'

export const usePreventWindowUnload: (boolean: boolean) => void = (boolean) => {
  React.useEffect(() => {
    if (!boolean) return
    const handleBeforeUnload: (event: BeforeUnloadEvent) => void = (event) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [boolean])
}
