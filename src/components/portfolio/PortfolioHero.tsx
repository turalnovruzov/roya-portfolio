'use client'

export function PortfolioHero() {
  return (
    <section 
      id="hero" 
      aria-label="Introduction"
      className="relative min-h-screen flex items-center justify-center bg-ui-background"
    >
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 text-ui-text-primary">
          Roya Novruzova
        </h1>
        
        <p className="text-xl md:text-2xl text-ui-text-secondary mb-8 font-light">
          Architecture & Design
        </p>
        
        <div className="w-24 h-1 mx-auto mb-8 bg-brand-primary">
        </div>
        
        <p className="text-lg md:text-xl text-ui-text-secondary max-w-3xl mx-auto leading-relaxed mb-12">
          Creating spaces that inspire and transform. Specialized in residential, commercial, 
          and interior design projects that blend functionality with aesthetic excellence.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#portfolio" 
            className="px-8 py-3 bg-brand-primary text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:bg-brand-dark"
          >
            View Portfolio
          </a>
          
          <a 
            href="#contact" 
            className="px-8 py-3 border-2 border-brand-primary text-brand-primary font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:bg-brand-primary hover:text-white"
          >
            Get In Touch
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="text-ui-text-muted"
        >
          <path 
            d="M7 13l3 3 7-7" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            transform="rotate(90 12 12)"
          />
        </svg>
      </div>
    </section>
  )
}