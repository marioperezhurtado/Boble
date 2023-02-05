interface Props {
  isShown: boolean
}

export default function ShowPasswordIcon({ isShown }: Props) {
  if (!isShown) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="800"
        height="800"
        fill="none"
        viewBox="0 0 24 24"
        className="w-5 h-5">
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 6.362A9.707 9.707 0 0112 5c6.307 0 9.367 5.683 9.91 6.808.06.123.06.261 0 .385-.352.728-1.756 3.362-4.41 5.131M14 18.8a9.93 9.93 0 01-2 .2c-6.307 0-9.367-5.683-9.91-6.808a.44.44 0 010-.386c.219-.452.84-1.632 1.91-2.885M10 9.764A3 3 0 0114.236 14M3 3l18 18"
          className="dark:stroke-zinc-300 stroke-zinc-700"></path>
      </svg>
    )
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 0 24 24"
      className="w-5 h-5">
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 5c-6.307 0-9.367 5.683-9.91 6.808a.435.435 0 000 .384C2.632 13.317 5.692 19 12 19s9.367-5.683 9.91-6.808a.435.435 0 000-.384C21.368 10.683 18.308 5 12 5z"
        className="dark:stroke-zinc-300 stroke-zinc-700"></path>
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="dark:stroke-zinc-300 stroke-zinc-700"></circle>
    </svg>
  )
}
