import type { ReactNode } from 'react'

interface DemoWrapperProps {
  title: string
  description?: string
  children: ReactNode
}

export default function DemoWrapper({ title, description, children }: DemoWrapperProps) {
  return (
    <div className="demo-wrapper">
      <h2>{title}</h2>
      {description && <p className="demo-desc">{description}</p>}
      <div className="demo-body">{children}</div>
    </div>
  )
}
