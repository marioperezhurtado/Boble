import { Link } from 'wouter'

import ToggleDarkMode from '../../layout/ToggleDarkMode/ToggleDarkMode'

export default function Home() {
  return (
    <main className="min-h-screen text-center bg-zinc-50 dark:bg-zinc-800">
      <div className="flex items-center gap-1 pt-16 mx-auto w-fit">
        <img src="/boble.svg" alt="boble logo" className="w-7 h-7" />
        <h1 className="text-3xl font-bold">BOBLE</h1>
      </div>

      <p className="mt-5 text-lg">Online free web chat</p>
      <div className="flex gap-2 mx-auto mt-5 w-fit">
        <Link to="/about">
          <button className="bg-white border px-3 py-1.5 rounded-md shadow-md dark:bg-zinc-700 dark:border-zinc-600">
            About this project
          </button>
        </Link>
        <Link to="/chat">
          <button className="bg-cyan-700 text-cyan-50 px-3 py-1.5 rounded-md shadow-md">
            Start chatting
          </button>
        </Link>
      </div>
      <div className="m-10 mx-auto w-fit md:mt-20">
        <ToggleDarkMode />
      </div>
    </main>
  )
}
