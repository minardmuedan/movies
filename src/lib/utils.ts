import { isEqualWith } from 'lodash'

export { cn } from 'cn'

export function looseEqual(x: unknown, y: unknown): boolean {
  return isEqualWith(x, y, (a, b) => {
    if (Array.isArray(a) || Array.isArray(b)) {
      const A = ([] as unknown[]).concat(a ?? [])
      const B = ([] as unknown[]).concat(b ?? [])
      if (A.length !== B.length) return false

      const used = new Set<number>()
      return A.every((ai) => {
        const i = B.findIndex((bi, idx) => !used.has(idx) && looseEqual(ai, bi))
        if (i === -1) return false
        used.add(i)
        return true
      })
    }
    return undefined
  })
}
