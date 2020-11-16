import { useRef, useEffect, useCallback } from 'react'

const useIsMounted = () => {
  const ref = useRef(false)

  useEffect(() => {
    ref.current = true
    return () => {
      ref.current = false
    }
  }, [])

  return useCallback(() => ref.current, [ref])
}

export default useIsMounted
