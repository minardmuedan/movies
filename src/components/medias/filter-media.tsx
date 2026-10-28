'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { looseEqual } from '@/lib/utils'
import { cn } from 'cn'
import { ChevronDownIcon, Wand2Icon, XIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createContext, useContext, useState, type Dispatch, type SetStateAction } from 'react'
import { Button } from '../ui/button'
import { ScrollArea } from '../ui/scroll-area'
import { TagInput } from '../tag-input'

type FilterBarState = { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }
const context = createContext<FilterBarState | null>(null)

const useFilterBarContext = () => {
  const filterBarContext = useContext(context)
  if (!filterBarContext) throw 'Filter bar must be used inside its parent'
  return filterBarContext
}

const FilterBar = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams()

  const genres = searchParams.getAll('genres')
  const certifications = searchParams.getAll('certifications')
  const language = searchParams.get('language') || 'en'
  const keywords = searchParams.getAll('keywords')

  const defaultOpen = genres.length > 1 || certifications.length > 1 || language !== 'en' || keywords.length > 1

  const [open, setOpen] = useState(defaultOpen)

  return (
    <context.Provider value={{ open, setOpen }}>
      <div aria-expanded={open} className="group flex">
        {children}
      </div>
    </context.Provider>
  )
}

const FilterBarTrigger = ({ variant = 'accentMuted', children, ...props }: React.ComponentProps<typeof Button>) => {
  const { setOpen } = useFilterBarContext()

  return (
    <Button variant={variant} onClick={() => setOpen((v) => !v)} {...props}>
      {children}
    </Button>
  )
}

const FilterBarContent = ({ className, onSave }: { className?: string; onSave?: () => void }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const genres = searchParams.getAll('genres')
  const certifications = searchParams.getAll('certifications')
  const language = searchParams.get('language') || 'en'
  const keywords = searchParams.getAll('keywords')

  const activeDefaultFilter = { genres, certifications, language, keywords }
  const [filter, setFilter] = useState(activeDefaultFilter)

  function handleFilter() {
    const params = new URLSearchParams()
    Object.entries(filter).map(([key, value]) => (Array.isArray(value) ? value.map((v) => params.append(key, v)) : params.set(key, value)))

    onSave?.()
    router.push(`/movies?${params}`)
  }

  const sections = [
    [
      'Genre',
      <ul className="flex flex-wrap gap-1">
        {GENRES.map((genre) => {
          const id = String(genre.id)
          return (
            <li key={genre.id}>
              <Button
                variant={filter.genres.includes(id) ? 'default' : 'accentMuted'}
                size="sm"
                onClick={() => setFilter((f) => ({ ...f, genres: f.genres.includes(id) ? f.genres.filter((g) => g != id) : [id, ...f.genres] }))}
              >
                {genre.name}
              </Button>
            </li>
          )
        })}
      </ul>,
    ],
    ['Ratings', <></>],
    [
      'Certifications',
      <ul className="flex flex-wrap gap-1">
        {['NR', 'G', 'PG', 'R-13', 'R-16', 'R-18', 'X'].map((certificate) => (
          <li key={certificate}>
            <Button
              variant={filter.certifications.includes(certificate) ? 'default' : 'accentMuted'}
              size="sm"
              onClick={() =>
                setFilter((f) => ({
                  ...f,
                  certifications: f.certifications.includes(certificate)
                    ? f.certifications.filter((c) => c != certificate)
                    : [certificate, ...f.certifications],
                }))
              }
            >
              {certificate}
            </Button>
          </li>
        ))}
      </ul>,
    ],
    [
      'Language',
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />} className="w-full justify-between">
          Language <ChevronDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="overflow-hidden p-0">
          <ScrollArea className="max-h-(--available-height) p-1">
            {[
              LANGUAGE.sort((a, b) => a.english_name.localeCompare(b.english_name)).map(({ iso_639_1, english_name }) => (
                <DropdownMenuItem
                  key={iso_639_1}
                  onClick={() => setFilter((f) => ({ ...f, language: iso_639_1 }))}
                  className={filter.language === iso_639_1 ? 'bg-primary/50 pointer-events-none' : ''}
                >
                  {english_name}
                </DropdownMenuItem>
              )),
            ]}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>,
    ],
    ['Keywords', <TagInput value={filter.keywords} onChange={(v) => setFilter((f) => ({ ...f, keywords: v }))} />],
  ]

  return (
    <ScrollArea className={cn('[&_h3]:text-muted-foreground px-6 py-2 *:space-y-12 *:data-[slot=scroll-area-viewport]:px-1 [&_h3]:mb-2', className)}>
      {sections.map(([title, comp], i) => (
        <div key={i}>
          <h3>{title}</h3>
          {comp}
        </div>
      ))}

      <div className="bg-popover sticky bottom-0 space-y-2">
        {!looseEqual(activeDefaultFilter, filter) && (
          <Button className="animate-in fade-in w-full" onClick={handleFilter}>
            Save Changes
          </Button>
        )}

        <Button variant="outline" className="w-full" onClick={() => setFilter({ genres: [], certifications: [], language: 'en', keywords: [] })}>
          Clear Filters
        </Button>
      </div>
    </ScrollArea>
  )
}

const FilterSidebarContent = () => {
  const { open } = useFilterBarContext()

  return (
    <div inert={!open} style={{ width: open ? 300 + 24 : 0 }} className="sticky top-14 overflow-hidden transition-[width] duration-300 ease-out">
      <div className="bg-background/50 mr-6 flex h-[calc(100svh-4rem)] min-w-75 flex-col rounded-xl border backdrop-blur-sm">
        <div className="relative flex justify-between border-b p-6 pb-3">
          <div>
            <h2 className="text-lg">Filters</h2>
            <div className="sm-muted">Customize the experience</div>
          </div>

          <FilterBarTrigger variant="ghost" size="icon-sm" className="absolute top-3 right-3">
            <XIcon />
            <span className="sr-only">close the filter sidebar</span>
          </FilterBarTrigger>
        </div>

        <FilterBarContent />
      </div>
    </div>
  )
}

const FilterBarDialog = () => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" className="mx-auto w-3/4 lg:hidden" />}>
        Filter
        <Wand2Icon />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>Customize the experience</DialogDescription>
        </DialogHeader>

        <FilterBarContent onSave={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export { FilterBar, FilterBarContent, FilterBarDialog, FilterBarTrigger, FilterSidebarContent }

const GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
]

const LANGUAGE = [
  { iso_639_1: 'bi', english_name: 'Bislama' },
  { iso_639_1: 'cs', english_name: 'Czech' },
  { iso_639_1: 'ba', english_name: 'Bashkir' },
  { iso_639_1: 'ae', english_name: 'Avestan' },
  { iso_639_1: 'av', english_name: 'Avaric' },
  { iso_639_1: 'de', english_name: 'German' },
  { iso_639_1: 'mt', english_name: 'Maltese' },
  { iso_639_1: 'om', english_name: 'Oromo' },
  { iso_639_1: 'rm', english_name: 'Raeto-Romance' },
  { iso_639_1: 'so', english_name: 'Somali' },
  { iso_639_1: 'ts', english_name: 'Tsonga' },
  { iso_639_1: 'vi', english_name: 'Vietnamese' },
  { iso_639_1: 'gn', english_name: 'Guarani' },
  { iso_639_1: 'ig', english_name: 'Igbo' },
  { iso_639_1: 'it', english_name: 'Italian' },
  { iso_639_1: 'ki', english_name: 'Kikuyu' },
  { iso_639_1: 'ku', english_name: 'Kurdish' },
  { iso_639_1: 'la', english_name: 'Latin' },
  { iso_639_1: 'ln', english_name: 'Lingala' },
  { iso_639_1: 'lb', english_name: 'Letzeburgesch' },
  { iso_639_1: 'ny', english_name: 'Chichewa; Nyanja' },
  { iso_639_1: 'pl', english_name: 'Polish' },
  { iso_639_1: 'si', english_name: 'Sinhalese' },
  { iso_639_1: 'to', english_name: 'Tonga' },
  { iso_639_1: 'az', english_name: 'Azerbaijani' },
  { iso_639_1: 'ce', english_name: 'Chechen' },
  { iso_639_1: 'cu', english_name: 'Slavic' },
  { iso_639_1: 'da', english_name: 'Danish' },
  { iso_639_1: 'hz', english_name: 'Herero' },
  { iso_639_1: 'ie', english_name: 'Interlingue' },
  { iso_639_1: 'rw', english_name: 'Kinyarwanda' },
  { iso_639_1: 'mi', english_name: 'Maori' },
  { iso_639_1: 'no', english_name: 'Norwegian' },
  { iso_639_1: 'pi', english_name: 'Pali' },
  { iso_639_1: 'sk', english_name: 'Slovak' },
  { iso_639_1: 'se', english_name: 'Northern Sami' },
  { iso_639_1: 'sm', english_name: 'Samoan' },
  { iso_639_1: 'uk', english_name: 'Ukrainian' },
  { iso_639_1: 'en', english_name: 'English' },
  { iso_639_1: 'ay', english_name: 'Aymara' },
  { iso_639_1: 'ca', english_name: 'Catalan' },
  { iso_639_1: 'eo', english_name: 'Esperanto' },
  { iso_639_1: 'ha', english_name: 'Hausa' },
  { iso_639_1: 'ho', english_name: 'Hiri Motu' },
  { iso_639_1: 'hu', english_name: 'Hungarian' },
  { iso_639_1: 'io', english_name: 'Ido' },
  { iso_639_1: 'ii', english_name: 'Yi' },
  { iso_639_1: 'kn', english_name: 'Kannada' },
  { iso_639_1: 'kv', english_name: 'Komi' },
  { iso_639_1: 'li', english_name: 'Limburgish' },
  { iso_639_1: 'oj', english_name: 'Ojibwa' },
  { iso_639_1: 'ru', english_name: 'Russian' },
  { iso_639_1: 'sr', english_name: 'Serbian' },
  { iso_639_1: 'sv', english_name: 'Swedish' },
  { iso_639_1: 'ty', english_name: 'Tahitian' },
  { iso_639_1: 'zu', english_name: 'Zulu' },
  { iso_639_1: 'ka', english_name: 'Georgian' },
  { iso_639_1: 'ch', english_name: 'Chamorro' },
  { iso_639_1: 'be', english_name: 'Belarusian' },
  { iso_639_1: 'br', english_name: 'Breton' },
  { iso_639_1: 'kw', english_name: 'Cornish' },
  { iso_639_1: 'fi', english_name: 'Finnish' },
  { iso_639_1: 'sh', english_name: 'Serbo-Croatian' },
  { iso_639_1: 'nn', english_name: 'Norwegian Nynorsk' },
  { iso_639_1: 'tt', english_name: 'Tatar' },
  { iso_639_1: 'tg', english_name: 'Tajik' },
  { iso_639_1: 'vo', english_name: 'Volapük' },
  { iso_639_1: 'ps', english_name: 'Pushto' },
  { iso_639_1: 'mk', english_name: 'Macedonian' },
  { iso_639_1: 'fr', english_name: 'French' },
  { iso_639_1: 'bm', english_name: 'Bambara' },
  { iso_639_1: 'eu', english_name: 'Basque' },
  { iso_639_1: 'fj', english_name: 'Fijian' },
  { iso_639_1: 'id', english_name: 'Indonesian' },
  { iso_639_1: 'mg', english_name: 'Malagasy' },
  { iso_639_1: 'na', english_name: 'Nauru' },
  { iso_639_1: 'xx', english_name: 'No Language' },
  { iso_639_1: 'qu', english_name: 'Quechua' },
  { iso_639_1: 'sq', english_name: 'Albanian' },
  { iso_639_1: 'ti', english_name: 'Tigrinya' },
  { iso_639_1: 'tw', english_name: 'Twi' },
  { iso_639_1: 'wa', english_name: 'Walloon' },
  { iso_639_1: 'ab', english_name: 'Abkhazian' },
  { iso_639_1: 'bs', english_name: 'Bosnian' },
  { iso_639_1: 'af', english_name: 'Afrikaans' },
  { iso_639_1: 'an', english_name: 'Aragonese' },
  { iso_639_1: 'fy', english_name: 'Frisian' },
  { iso_639_1: 'gu', english_name: 'Gujarati' },
  { iso_639_1: 'ik', english_name: 'Inupiaq' },
  { iso_639_1: 'ja', english_name: 'Japanese' },
  { iso_639_1: 'ko', english_name: 'Korean' },
  { iso_639_1: 'lg', english_name: 'Ganda' },
  { iso_639_1: 'nl', english_name: 'Dutch' },
  { iso_639_1: 'os', english_name: 'Ossetian; Ossetic' },
  { iso_639_1: 'el', english_name: 'Greek' },
  { iso_639_1: 'bn', english_name: 'Bengali' },
  { iso_639_1: 'cr', english_name: 'Cree' },
  { iso_639_1: 'km', english_name: 'Khmer' },
  { iso_639_1: 'lo', english_name: 'Lao' },
  { iso_639_1: 'nd', english_name: 'Ndebele' },
  { iso_639_1: 'ne', english_name: 'Nepali' },
  { iso_639_1: 'sc', english_name: 'Sardinian' },
  { iso_639_1: 'sw', english_name: 'Swahili' },
  { iso_639_1: 'tl', english_name: 'Tagalog' },
  { iso_639_1: 'ur', english_name: 'Urdu' },
  { iso_639_1: 'ee', english_name: 'Ewe' },
  { iso_639_1: 'aa', english_name: 'Afar' },
  { iso_639_1: 'co', english_name: 'Corsican' },
  { iso_639_1: 'et', english_name: 'Estonian' },
  { iso_639_1: 'is', english_name: 'Icelandic' },
  { iso_639_1: 'ks', english_name: 'Kashmiri' },
  { iso_639_1: 'kr', english_name: 'Kanuri' },
  { iso_639_1: 'ky', english_name: 'Kirghiz' },
  { iso_639_1: 'kj', english_name: 'Kuanyama' },
  { iso_639_1: 'nr', english_name: 'Ndebele' },
  { iso_639_1: 'or', english_name: 'Oriya' },
  { iso_639_1: 'wo', english_name: 'Wolof' },
  { iso_639_1: 'za', english_name: 'Zhuang' },
  { iso_639_1: 'ar', english_name: 'Arabic' },
  { iso_639_1: 'cv', english_name: 'Chuvash' },
  { iso_639_1: 'fo', english_name: 'Faroese' },
  { iso_639_1: 'hr', english_name: 'Croatian' },
  { iso_639_1: 'ms', english_name: 'Malay' },
  { iso_639_1: 'nb', english_name: 'Norwegian Bokmål' },
  { iso_639_1: 'rn', english_name: 'Rundi' },
  { iso_639_1: 'sn', english_name: 'Shona' },
  { iso_639_1: 'st', english_name: 'Sotho' },
  { iso_639_1: 'tr', english_name: 'Turkish' },
  { iso_639_1: 'am', english_name: 'Amharic' },
  { iso_639_1: 'fa', english_name: 'Persian' },
  { iso_639_1: 'hy', english_name: 'Armenian' },
  { iso_639_1: 'pa', english_name: 'Punjabi' },
  { iso_639_1: 'as', english_name: 'Assamese' },
  { iso_639_1: 'ia', english_name: 'Interlingua' },
  { iso_639_1: 'lv', english_name: 'Latvian' },
  { iso_639_1: 'lu', english_name: 'Luba-Katanga' },
  { iso_639_1: 'mr', english_name: 'Marathi' },
  { iso_639_1: 'mn', english_name: 'Mongolian' },
  { iso_639_1: 'pt', english_name: 'Portuguese' },
  { iso_639_1: 'th', english_name: 'Thai' },
  { iso_639_1: 'tk', english_name: 'Turkmen' },
  { iso_639_1: 've', english_name: 'Venda' },
  { iso_639_1: 'dv', english_name: 'Divehi' },
  { iso_639_1: 'gv', english_name: 'Manx' },
  { iso_639_1: 'kl', english_name: 'Kalaallisut' },
  { iso_639_1: 'kk', english_name: 'Kazakh' },
  { iso_639_1: 'lt', english_name: 'Lithuanian' },
  { iso_639_1: 'my', english_name: 'Burmese' },
  { iso_639_1: 'sl', english_name: 'Slovenian' },
  { iso_639_1: 'sd', english_name: 'Sindhi' },
  { iso_639_1: 'cn', english_name: 'Cantonese' },
  { iso_639_1: 'hi', english_name: 'Hindi' },
  { iso_639_1: 'cy', english_name: 'Welsh' },
  { iso_639_1: 'ht', english_name: 'Haitian; Haitian Creole' },
  { iso_639_1: 'iu', english_name: 'Inuktitut' },
  { iso_639_1: 'jv', english_name: 'Javanese' },
  { iso_639_1: 'mh', english_name: 'Marshall' },
  { iso_639_1: 'sa', english_name: 'Sanskrit' },
  { iso_639_1: 'ss', english_name: 'Swati' },
  { iso_639_1: 'te', english_name: 'Telugu' },
  { iso_639_1: 'kg', english_name: 'Kongo' },
  { iso_639_1: 'ml', english_name: 'Malayalam' },
  { iso_639_1: 'uz', english_name: 'Uzbek' },
  { iso_639_1: 'sg', english_name: 'Sango' },
  { iso_639_1: 'xh', english_name: 'Xhosa' },
  { iso_639_1: 'es', english_name: 'Spanish' },
  { iso_639_1: 'su', english_name: 'Sundanese' },
  { iso_639_1: 'ug', english_name: 'Uighur' },
  { iso_639_1: 'yi', english_name: 'Yiddish' },
  { iso_639_1: 'yo', english_name: 'Yoruba' },
  { iso_639_1: 'zh', english_name: 'Mandarin' },
  { iso_639_1: 'he', english_name: 'Hebrew' },
  { iso_639_1: 'bo', english_name: 'Tibetan' },
  { iso_639_1: 'ak', english_name: 'Akan' },
  { iso_639_1: 'mo', english_name: 'Moldavian' },
  { iso_639_1: 'ng', english_name: 'Ndonga' },
  { iso_639_1: 'dz', english_name: 'Dzongkha' },
  { iso_639_1: 'ff', english_name: 'Fulah' },
  { iso_639_1: 'gd', english_name: 'Gaelic' },
  { iso_639_1: 'ga', english_name: 'Irish' },
  { iso_639_1: 'gl', english_name: 'Galician' },
  { iso_639_1: 'nv', english_name: 'Navajo' },
  { iso_639_1: 'oc', english_name: 'Occitan' },
  { iso_639_1: 'ro', english_name: 'Romanian' },
  { iso_639_1: 'ta', english_name: 'Tamil' },
  { iso_639_1: 'tn', english_name: 'Tswana' },
  { iso_639_1: 'bg', english_name: 'Bulgarian' },
]
