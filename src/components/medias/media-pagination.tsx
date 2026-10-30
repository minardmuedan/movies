import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination'

export default function MediaPagination({ page, totalPages, route }: { page: number; totalPages: number; route: string }) {
  const href = (p: number) => `${route}${route.includes('?') ? '&' : '?'}page=${p}`

  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={href(page - 1)} className={`${page <= 1 ? 'pointer-events-none opacity-50' : ''}`} />
        </PaginationItem>

        {getPageRange(page, totalPages).map((item, i) => (
          <PaginationItem key={i}>
            {item === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink href={href(item)} isActive={item === page}>
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext href={href(page + 1)} className={`${page >= totalPages ? 'pointer-events-none opacity-50' : ''}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

function getPageRange(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  if (current <= 4) return [1, 2, 3, 4, 5, '...', total]
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]

  return [1, '...', current - 1, current, current + 1, '...', total]
}
