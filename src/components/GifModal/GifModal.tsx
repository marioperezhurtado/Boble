import { useState, useRef } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getTrendingGifs, getSearchGifs } from '../../hooks/useGifs'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { capitalize } from '../../utils/text'

import LoadSpinner from '../../layout/LoadSpinner/LoadSpinner'

interface Props {
  onClose: () => void
  onSend: (url: string) => void
}

export default function GifModal({ onClose, onSend }: Props) {
  const [search, setSearch] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)

  useOnClickOutside({ ref: modalRef, handler: onClose })

  const {
    data: trendingGifs,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['trendingGifs'],
    queryFn: getTrendingGifs,
    retry: false,
    refetchOnWindowFocus: false
  })

  const { mutate: searchGifs, data: searchedGifs } = useMutation({
    mutationKey: ['searchGifs'],
    mutationFn: getSearchGifs,
    onSuccess: () => setSearch('')
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

  const gifs = searchedGifs ?? trendingGifs

  return (
    <div
      ref={modalRef}
      className="fixed z-10 w-full p-2 bottom-14 border-y bg-zinc-50 md:absolute dark:bg-zinc-700 dark:border-zinc-600">
      <form
        onSubmit={handleSearch}
        className="flex max-w-md gap-2 mx-auto mb-2">
        <input
          value={search}
          onChange={handleChange}
          type="text"
          name="search"
          placeholder={"Search GIF's..."}
          className="rounded-md border px-2 py-1.5 w-full dark:bg-zinc-600 dark:border-zinc-500 dark:placeholder:text-zinc-300"
        />
        <button className="bg-cyan-700 text-cyan-50 rounded-md px-3 py-1.5 text-sm hover:bg-cyan-600 transition">
          <img src="/search.svg" alt="search" className="w-6 h-6" />
        </button>
      </form>
      <ul className="flex flex-wrap items-center justify-center gap-2 overflow-y-auto rounded-md max-h-60">
        {isLoading && <LoadSpinner />}
        {isError && (
          <p className="p-1.5 px-5 w-fit  bg-red-100 border-l-4 border-red-600">
            {"Failed to get trending GIF's"}
          </p>
        )}
        {!isLoading && !gifs?.length && (
          <div className="p-4">
            <p className="mb-2 text-lg font-semibold text-center">
              {"No GIF's found"}
            </p>
            <p>Try again with other search.</p>
          </div>
        )}
        {!!gifs?.length &&
          gifs.map((gif) => (
            <li key={gif.id}>
              <img
                onClick={() => handleSend(gif.images.downsized.url)}
                src={gif.images.downsized.url}
                alt={gif.alt_text}
                className="max-w-screen overflow-hidden rounded-md shadow-md w-fit max-h-56 border dark:border-zinc-600"
              />
            </li>
          ))}
      </ul>
    </div>
  )
}
