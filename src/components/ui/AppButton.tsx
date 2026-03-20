import type { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'pill'
  block?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

export function AppButton({
  children,
  className,
  variant = 'primary',
  block,
  leadingIcon,
  trailingIcon,
  ...props
}: AppButtonProps) {
  return (
    <button
      className={clsx(
        'app-button',
        `app-button--${variant}`,
        block && 'app-button--block',
        className,
      )}
      {...props}
    >
      {leadingIcon ? <span className="app-button__icon">{leadingIcon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? (
        <span className="app-button__icon">{trailingIcon}</span>
      ) : null}
    </button>
  )
}
