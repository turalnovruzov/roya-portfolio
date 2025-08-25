import React from 'react'
import Link from 'next/link'

export default function ProjectNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Project Not Found
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          The project you&apos;re looking for doesn&apos;t exist or may have been moved. 
          Let&apos;s get you back to exploring the portfolio.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#portfolio"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-portfolio-accent hover:bg-portfolio-accent/90 transition-colors"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H7l5-5m-5 5l5 5m-5-5h12" />
            </svg>
            View Portfolio
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="mt-12 opacity-30">
        <svg 
          className="w-24 h-24 text-gray-300 mx-auto" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H7l5-5m-5 5l5 5m-5-5h12" />
        </svg>
      </div>
    </div>
  )
}