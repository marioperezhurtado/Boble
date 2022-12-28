import { Link } from 'wouter'

export default function Header() {
  return (
    <header className="flex px-12 py-3 bg-cyan-900 text-cyan-50">
      <Link to="/">
        <h1 className="text-xl cursor-pointer">BOBLE</h1>
      </Link>
    </header>
  )
}
