import Header from '@/layout/Header/Header'

interface Props {
  groupId: string
}

export default function GroupInfo({ groupId }: Props) {
  return (
    <div className="flex flex-col h-screen bg-zinc-200 dark:bg-zinc-900">
      <Header />
      <main className="flex flex-grow w-full h-full max-w-screen-xl pt-12 mx-auto shadow-md bg-zinc-50 dark:bg-zinc-800 border dark:border-zinc-700">
        <p>Hey</p>
      </main>
    </div>
  )
}
