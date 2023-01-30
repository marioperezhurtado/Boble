import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import GifModal from './GifModal'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    },
    mutations: {
      retry: false
    }
  }
})

vi.mock('@/services/gifs')

describe('GifModal', async () => {
  const {
    getTrendingGifs,
    getSearchGifs
  }: {
    getTrendingGifs: any
    getSearchGifs: any
  } = await import('@/services/gifs')

  const onClose = vi.fn()
  const onSend = vi.fn()

  test('Renders trending gifs', async () => {
    getTrendingGifs.mockResolvedValueOnce([
      {
        id: '1',
        images: {
          downsized: {
            url: 'https://test.com'
          }
        },
        alt_text: 'Trending gif 1'
      },
      {
        id: '2',
        images: {
          downsized: {
            url: 'https://test2.com'
          }
        },
        alt_text: 'Trending gif 2'
      }
    ])

    render(
      <QueryClientProvider client={queryClient}>
        <GifModal onClose={onClose} onSend={onSend} />
      </QueryClientProvider>
    )

    await waitFor(() =>
      expect(screen.getAllByAltText('Trending gif 1')).toBeTruthy()
    )
    await waitFor(() =>
      expect(screen.getAllByAltText('Trending gif 2')).toBeTruthy()
    )
  })

  test('Does not search gifs if search input is empty', async () => {
    getTrendingGifs.mockResolvedValueOnce([
      {
        id: '1',
        images: {
          downsized: {
            url: 'https://test.com'
          }
        },
        alt_text: 'Test input empty'
      }
    ])
    getSearchGifs.mockResolvedValueOnce([
      {
        id: '1',
        images: {
          downsized: {
            url: 'https://test.com'
          }
        },
        alt_text: 'This should not be rendered'
      }
    ])

    render(
      <QueryClientProvider client={queryClient}>
        <GifModal onClose={onClose} onSend={onSend} />
      </QueryClientProvider>
    )
    const searchButton = screen.getAllByRole('button')[0]

    fireEvent.click(searchButton)

    await waitFor(() =>
      expect(screen.queryByAltText('This sould not be rendered')).toBeNull()
    )
  })

  test('Searchs capitalized term', async () => {
    const searchInput = screen.getAllByRole<HTMLInputElement>('textbox')[0]

    fireEvent.change(searchInput, { target: { value: 'test search' } })

    await waitFor(() => expect(searchInput.value).toBe('Test search'))
  })

  test('Shows message if there are no results', async () => {
    getTrendingGifs.mockResolvedValueOnce([])
    getSearchGifs.mockResolvedValueOnce([])

    render(
      <QueryClientProvider client={queryClient}>
        <GifModal onClose={onClose} onSend={onSend} />
      </QueryClientProvider>
    )

    const searchInput = screen.getAllByRole<HTMLInputElement>('textbox')[0]
    const searchButton = screen.getAllByRole('button')[0]

    fireEvent.change(searchInput, { target: { value: 'test search' } })
    fireEvent.click(searchButton)

    await waitFor(() =>
      expect(screen.getByText('gifs.no-results.title')).toBeTruthy()
    )
  })

  test('Shows error message if search fails', async () => {
    getTrendingGifs.mockRejectedValueOnce(new Error('Test error'))
    getSearchGifs.mockRejectedValueOnce(new Error('Test error'))

    render(
      <QueryClientProvider client={queryClient}>
        <GifModal onClose={onClose} onSend={onSend} />
      </QueryClientProvider>
    )

    const searchInput = screen.getAllByRole<HTMLInputElement>('textbox')[0]
    const searchButton = screen.getAllByRole('button')[0]

    fireEvent.change(searchInput, { target: { value: 'test search' } })
    fireEvent.click(searchButton)

    await waitFor(() => expect(screen.getByText('gifs.error')).toBeTruthy())
  })
})
