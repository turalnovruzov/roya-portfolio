import React from 'react'

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`mb-8 ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        {items.map((item, index) => (
          <React.Fragment key={`breadcrumb-${index}`}>
            {index > 0 && (
              <li className="text-gray-400" aria-hidden="true">
                /
              </li>
            )}
            <li className={item.current ? 'text-gray-900 font-medium' : ''}>
              {item.href && !item.current ? (
                <a 
                  href={item.href} 
                  className="hover:text-portfolio-accent transition-colors duration-200"
                >
                  {item.label}
                </a>
              ) : (
                <span 
                  className={`${item.current ? 'truncate max-w-[200px] sm:max-w-none' : ''}`}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  )
}