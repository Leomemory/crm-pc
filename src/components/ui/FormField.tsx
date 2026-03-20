import type { ReactNode } from 'react'
import clsx from 'clsx'

interface FormFieldProps {
  label: string
  required?: boolean
  error?: string
  hint?: ReactNode
  children: ReactNode
  className?: string
}

export function FormField({
  label,
  required,
  error,
  hint,
  children,
  className,
}: FormFieldProps) {
  return (
    <label className={clsx('form-field', className)}>
      <span className="form-field__label">
        {required ? <span className="form-field__required">*</span> : null}
        {label}
      </span>
      <div className={clsx('form-field__control', error && 'is-error')}>
        {children}
      </div>
      {hint ? <span className="form-field__hint">{hint}</span> : null}
      {error ? <span className="form-field__error">{error}</span> : null}
    </label>
  )
}
