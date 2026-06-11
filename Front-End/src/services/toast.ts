type Toast = { id: number; type: 'success' | 'error' | 'info'; message: string }

let listeners: ((t: Toast[]) => void)[] = []
let toasts: Toast[] = []
let idCounter = 1

function notify() {
  listeners.forEach((l) => l([...toasts]))
}

export const toast = {
  success(message: string) {
    const t = { id: idCounter++, type: 'success' as const, message }
    toasts.push(t)
    notify()
    setTimeout(() => remove(t.id), 5000)
  },
  error(message: string) {
    const t = { id: idCounter++, type: 'error' as const, message }
    toasts.push(t)
    notify()
    setTimeout(() => remove(t.id), 6000)
  },
  info(message: string) {
    const t = { id: idCounter++, type: 'info' as const, message }
    toasts.push(t)
    notify()
    setTimeout(() => remove(t.id), 4000)
  },
}

export function subscribe(fn: (t: Toast[]) => void) {
  listeners.push(fn)
  fn([...toasts])
  return () => {
    listeners = listeners.filter((l) => l !== fn)
  }
}

export function remove(id: number) {
  toasts = toasts.filter((t) => t.id !== id)
  notify()
}

export default toast
