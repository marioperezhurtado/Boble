import { Link } from 'wouter'

export default function Home() {
  return (
    <main className="text-center">
      <h1 className="mt-16 text-3xl font-bold">BOBLE Web Chat</h1>
      <p className="mt-5 text-lg">Online free chat</p>
      <div className="flex gap-2 mx-auto mt-5 w-fit">
        <Link to="/about">
          <button className="bg-white border px-3 py-1.5 rounded-md shadow-md">
            About this project
          </button>
        </Link>
        <Link to="/chat">
          <button className="bg-cyan-700 text-cyan-50 px-3 py-1.5 rounded-md shadow-md">
            Start chatting
          </button>
        </Link>
      </div>
    </main>
  )
}
