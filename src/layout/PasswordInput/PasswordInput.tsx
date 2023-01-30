import { useState } from 'react'

import ShowPasswordIcon from '@/assets/ShowPasswordIcon'

export default function PasswordInput(
  inputProps: React.InputHTMLAttributes<HTMLInputElement>
) {
  const [showPassword, setShowPassword] = useState(false)
  const passwordType = showPassword ? 'text' : 'password'

  const toggleShowPassword = () => setShowPassword((prev) => !prev)

  const passwordProps = {
    ...inputProps,
    className: `${inputProps.className ?? ''} w-full`,
    type: passwordType
  }

  return (
    <div className="relative">
      <input {...passwordProps} />
      <button
        onClick={toggleShowPassword}
        type="button"
        className="w-fit absolute right-2 top-1/2 -translate-y-1/2">
        <ShowPasswordIcon isShown={showPassword} />
      </button>
    </div>
  )
}
