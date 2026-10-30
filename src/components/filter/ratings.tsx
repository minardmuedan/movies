import { Fragment, type Dispatch, type SetStateAction } from 'react'
import { Slider } from '../ui/slider'
import type { TFilterData } from './dialog'
import { ratingsSchema } from '@/schema & types/params'

export default function FilterRatings({ filter, setFilter }: { filter: TFilterData; setFilter: Dispatch<SetStateAction<TFilterData>> }) {
  const parsedRatings = ratingsSchema.parse(filter.ratings)

  function handleChange(v: number[]) {
    setFilter((f) => ({ ...f, ratings: v.join('-') }))
  }

  return (
    <div>
      <h3 className="flex items-center justify-between">
        Ratings <span className="xs-muted">{parsedRatings.join(' -> ')}</span>
      </h3>
      <div>
        <ul className="sm-muted mb-2 flex justify-between">
          {[...Array(6)].map((_, i) => (
            <Fragment key={i}>
              <li>{i * 2}</li>
              {i !== 5 && <li>&middot;</li>}
            </Fragment>
          ))}
        </ul>

        <Slider value={parsedRatings} max={10} step={1} onValueChange={(v) => handleChange(v as number[])} />
      </div>
    </div>
  )
}
