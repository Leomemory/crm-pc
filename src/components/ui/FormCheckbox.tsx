import type { InputHTMLAttributes, ReactNode } from 'react'

interface FormCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode
  error?: string
}

export function FormCheckbox({
  label,
  error,
  className,
  ...props
}: FormCheckboxProps) {
  return (
    <label className={className}>
      <span className="form-checkbox">
        <input className="form-checkbox__input" type="checkbox" {...props} />
        <span className="form-checkbox__box" />
        <span>{label}</span>
      </span>
      {error ? <span className="form-field__error">{error}</span> : null}
    </label>
  )
}
