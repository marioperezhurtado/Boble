import { Link } from 'wouter'

import BackIcon from '@/assets/BackIcon'

export default function Back({ to }: { to: string }) {
  return (
    <Link to={to}>
      <button className="fixed top-0 z-20 pr-20 mt-3 ml-6 md:ml-8 lg:hidden bg-cyan-900">
        <BackIcon />
      </button>
    </Link>
  )
}
