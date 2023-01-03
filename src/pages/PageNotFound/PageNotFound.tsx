import { Link } from 'wouter'

import Header from '../../layout/Header/Header'

export default function PageNotFound() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 text-center bg-zinc-100 text-zinc-700">
        <p className="text-3xl font-bold">Oops! Page not found</p>
        <h1 className="mt-10 text-xl">
          Sorry, the page you are looking for does not exist.
        </h1>
        <h2 className="mt-3">Are you sure you typed the correct URL?</h2>
        <Link to="/">
          <button className="px-3 py-1.5 mt-5 rounded-md bg-cyan-700 text-cyan-50 shadow-md">
            Back to Homepage
          </button>
        </Link>
      </div>
    </>
  )
}
