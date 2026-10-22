'use client'

import useDebounce from '@/hooks/use-debounce'
import { SearchIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { InputGroup, InputGroupAddon, InputGroupInput } from './ui/input-group'
import { ScrollArea } from './ui/scroll-area'
import { useEffect, useState } from 'react'
import TMDBImage from './image'

export default function SearchDialog() {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [query, value, setValue] = useDebounce()

  useEffect(() => {
    if (!query) return

    async function getData() {
      setIsLoading(true)
      const result = await fetch(`/api/search?query=${query}`)
      const resultData = await result.json()

      setIsLoading(false)
      setData(resultData.data.results)
    }

    getData()
  }, [query])

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />} className="w-fit justify-start md:w-52">
        <SearchIcon /> <span className="sr-only md:not-sr-only">Search</span>
      </DialogTrigger>

      <DialogContent className="max-h-full max-w-full">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>Search anything..</DialogDescription>
        </DialogHeader>

        <ScrollArea className="px-3 pt-0 pb-6">
          <InputGroup>
            <InputGroupInput placeholder="Search..." value={value} onChange={(e) => setValue(e.target.value)} />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>

          {isLoading && (
            <ul className="mt-6 space-y-2">
              {[...Array(3)].map((_, i) => (
                <li key={i} className="flex h-20 gap-2 rounded border p-2">
                  <div className="bg-accent aspect-2/3 h-full" />

                  <div className="*:bg-accent">
                    <div className="mb-2 h-5 w-40"></div>
                    <div className="mb-0.5 h-4 w-60"></div>
                    <div className="h-4 w-40"></div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {!isLoading && data && (
            <ul className="mt-6 space-y-2">
              {data.map((movie, i) => (
                <li key={i} className="flex h-20 gap-2 rounded border p-2">
                  <TMDBImage type="poster" src={movie.poster_path} alt="" className="aspect-2/3 h-full" />

                  <div className="flex-1">
                    <div className="text-sm">{movie.title}</div>
                    <div className="xs-muted line-clamp-2">{movie.overview}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
