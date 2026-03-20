import { useEffect, useState } from 'react'

export function useCountdown(initialSeconds = 60) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (seconds <= 0) {
      return
    }

    const timer = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer)
          return 0
        }

        return current - 1
      })
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [seconds])

  return {
    seconds,
    isRunning: seconds > 0,
    start: () => setSeconds(initialSeconds),
  }
}
