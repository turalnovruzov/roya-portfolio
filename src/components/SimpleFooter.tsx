import React from 'react'

export const SimpleFooter: React.FC = () => {
  return (
    <footer className="border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Roya Novruzova. All rights reserved.
          </div>
          <div className="text-sm text-gray-400">Architecture & Design Portfolio</div>
        </div>
      </div>
    </footer>
  )
}
