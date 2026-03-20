import clsx from 'clsx'

interface BrandMarkProps {
  className?: string
  variant?: 'light' | 'dark'
}

export function BrandMark({
  className,
  variant = 'light',
}: BrandMarkProps) {
  return (
    <span className={clsx('brand-mark', `brand-mark--${variant}`, className)}>
      <span className="brand-mark__base">ACC</span>
      <span className="brand-mark__accent">M</span>
    </span>
  )
}
