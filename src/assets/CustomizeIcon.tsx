export default function CustomizeIcon() {
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
        r="7"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="stroke-pink-700 dark:stroke-pink-600"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18 7.96c2.59-.125 4.379.274 4.625 1.193.429 1.6-3.98 4.172-9.849 5.745-5.868 1.572-10.972 1.55-11.401-.051-.254-.948 1.188-2.236 3.625-3.455"
        className="stroke-pink-700 dark:stroke-pink-600"
      />
    </svg>
  )
}
