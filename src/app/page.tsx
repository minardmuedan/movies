export default function Homepage() {
  const obj = { ewan: '', hello: '1', thre: '' }

  const params = new URLSearchParams()

  Object.entries(obj).map(([key, value]) => {
    if (value) params.append(key, value)
  })

  const route = `/movies?${params}`

  return <div>{route}</div>
}
