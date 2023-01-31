export default function InfoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 0 24 24"
      className="w-6 h-6">
      <circle
        cx="12"
        cy="12"
        r="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="stroke-zinc-600 dark:stroke-zinc-400"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 15v-3M12 9v0"
        className="stroke-zinc-600 dark:stroke-zinc-400"
      />
    </svg>
  )
}
