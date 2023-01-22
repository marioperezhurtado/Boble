import './Bubbles.css'

export default function Bubbles() {
  return (
    <div className="relative w-12 md:w-24 top-5 -left-2 md:left-0 md:top-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="800"
        height="800"
        fill="none"
        viewBox="0 0 24 24"
        className="absolute w-12 h-12 md:w-24 md:h-24 bubble1">
        <circle
          cx="6.5"
          cy="9.5"
          r="2.5"
          strokeWidth="1"
          className="stroke-cyan-700 dark:stroke-cyan-600"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="800"
        height="800"
        fill="none"
        viewBox="0 0 24 24"
        className="absolute w-12 h-12 md:w-24 md:h-24 bubble2">
        <circle
          cx="17"
          cy="8"
          r="4"
          strokeWidth="1"
          className="stroke-cyan-700 dark:stroke-cyan-600"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="800"
        height="800"
        fill="none"
        viewBox="0 0 24 24"
        className="absolute w-12 h-12 md:w-24 md:h-24 bubble3">
        <circle
          cx="12"
          cy="17"
          r="3"
          strokeWidth="1"
          className="stroke-cyan-700 dark:stroke-cyan-600"
        />
      </svg>
      <div className="absolute bottom-0 hidden w-16 h-3 md:block left-4 bg-zinc-200 bubbleShadow dark:bg-zinc-700" />
    </div>
  )
}
