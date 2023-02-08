import { useState, useRef } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getTrendingGifs, getSearchGifs } from '@/services/gifs'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import { capitalize } from '@/utils/text'
import { useTranslation } from 'react-i18next'

import LoadSpinner from '@/layout/LoadSpinner/LoadSpinner'

interface Props {
  onClose: () => void
  onSend: (url: string) => void
}

export default function GifModal({ onClose, onSend }: Props) {
  const { t } = useTranslation('global')
  const [search, setSearch] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useOnClickOutside({ ref: modalRef, handler: onClose })

  const {
    data: trendingGifs,
    isLoading: isTrendingLoading,
    isError: isTrendingError
  } = useQuery({
    queryKey: ['trendingGifs'],
    queryFn: getTrendingGifs,
    retry: false,
    refetchOnWindowFocus: false
  })

  const {
    mutate: searchGifs,
    data: searchedGifs,
    isLoading: isSearching,
    isError: isSearchError
  } = useMutation({
    mutationKey: ['searchGifs'],
    mutationFn: getSearchGifs,
    onSuccess: () => {
      setSearch('')
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(capitalize(e.target.value))
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!search) return
    searchGifs(search)
  }

  const handleSend = (url: string) => {
    onSend(url)
    onClose()
  }

  const isLoading = isSearching || isTrendingLoading
  const isError = isSearchError || isTrendingError
  const gifs = searchedGifs ?? trendingGifs

  return (
    <div
      ref={modalRef}
      className="fixed z-10 w-full pt-2 bottom-14 border-y bg-zinc-50 md:absolute dark:bg-zinc-700 dark:border-zinc-600">
      <form
        onSubmit={handleSearch}
        name="searchForm"
        className="flex max-w-md gap-2 px-2 mx-auto mb-2">
        <input
          value={search}
          ref={searchRef}
          onChange={handleChange}
          type="text"
          name="search"
          placeholder={t('gifs.placeholder') ?? ''}
          className="rounded-md border px-2 py-1.5 mx-2 w-full dark:bg-zinc-600 dark:border-zinc-500 dark:placeholder:text-zinc-300"
          autoComplete="off"
        />
        <button className="bg-cyan-700 text-cyan-50 rounded-md px-3 py-1.5 text-sm hover:bg-cyan-600 transition">
          <img src="/search.svg" alt="search" className="w-6 h-6" />
        </button>
      </form>
      <ul className="flex flex-wrap items-center justify-center gap-2 overflow-y-auto border-t h-96 dark:border-zinc-600">
        {isLoading && <LoadSpinner />}
        {isError && (
          <p className="p-1.5 px-5 w-fit  bg-red-100 border-l-4 border-red-600 text-zinc-700 dark:bg-red-200">
            {t('gifs.error')}
          </p>
        )}
        {!isLoading && !gifs?.length && (
          <div className="p-4">
            <p className="mb-2 text-lg font-semibold text-center">
              {t('gifs.no-results.title')}
            </p>
            <p>{t('gifs.no-results.description')}</p>
          </div>
        )}
        {!isLoading &&
          !!gifs?.length &&
          gifs.map((gif) => (
            <li key={gif.id}>
              <img
                onClick={() => {
                  handleSend(gif.images.downsized.url)
                }}
                src={gif.images.downsized.url}
                alt={gif.alt_text}
                className="overflow-hidden border rounded-md shadow-md max-w-screen w-fit max-h-56 dark:border-zinc-600"
              />
            </li>
          ))}
      </ul>
    </div>
  )
}
