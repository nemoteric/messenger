'use client'

import clsx from 'clsx'

// The Button component takes an optional type prop that determines the type of the button,
// with a default value of 'button'. It also takes a fullWidth prop that determines whether
// the button should take up the full width of its container, with a default value of false.
// The children prop takes any valid React node, and is rendered inside the button.
// The onClick prop is a function that is called when the button is clicked.
// The secondary prop determines whether the button should be rendered as a secondary button,
// with a default value of false. The danger prop determines whether the button should be
// rendered as a danger button, with a default value of false. The disabled prop determines
// whether the button should be disabled, with a default value of false.
interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined
  fullWidth?: boolean
  children?: React.ReactNode
  onClick?: () => void
  secondary?: boolean
  danger?: boolean
  disabled?: boolean
}

// The Button component is a reusable button that can be used anywhere
// a button is needed. It has a number of different styles that can be
// used to customize its appearance and behavior.
const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
            flex
            justify-center
            rounded-md
            px-3
            py-2
            text-sm
            font-semibold
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
          `,
        disabled && 'opacity-50 cursor-default',
        fullWidth && 'w-full',
        secondary ? 'text-gray-900' : 'text-white',
        danger &&
          'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
        !secondary &&
          !danger &&
          'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
      )}
    >
      {children}
    </button>
  )
}

export default Button
