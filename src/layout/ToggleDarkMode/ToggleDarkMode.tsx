import useDarkTheme from '../../hooks/useDarkTheme'

export default function ToggleDarkMode() {
  const { theme, toggleTheme } = useDarkTheme()

  if (theme === 'dark') {
    return (
      <button
        title="Toggle dark mode"
        onClick={toggleTheme}
        className="mx-auto border rounded-md shadow-md lg:mx-0 w-fit bg-zinc-700 border-zinc-600 hover:bg-zinc-600">
        <img src="/dark.svg" alt="Toggle light mode" className="w-8 h-8 p-2" />
      </button>
    )
  }

  return (
    <button
      title="Toggle dark mode"
      onClick={toggleTheme}
      className="mx-auto bg-white border rounded-md shadow-md w-fit lg:mx-0 hover:bg-zinc-100">
      <img src="/light.svg" alt="Toggle light mode" className="w-8 h-8 p-1.5" />
    </button>
  )
}
