'use client'

export function ResumeSection() {
  return (
    <section 
      id="resume" 
      aria-label="About & Education"
      className="py-20 bg-ui-background"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-ui-text-primary">
            About
          </h2>
          <div className="w-16 h-1 mx-auto bg-brand-primary">
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-xl font-medium mb-6 text-ui-text-primary">
              Professional Background
            </h3>
            <p className="text-ui-text-secondary leading-relaxed mb-6">
              With a passion for creating spaces that seamlessly blend form and function, 
              I specialize in architectural design that responds to both environmental context 
              and human experience. My work spans residential, commercial, and interior design 
              projects, each approached with careful attention to sustainability, innovation, 
              and cultural relevance.
            </p>
            <p className="text-ui-text-secondary leading-relaxed">
              Every project begins with understanding the unique story of the site and the 
              people who will inhabit it. This human-centered approach ensures that each 
              design solution is not only beautiful but meaningful and enduring.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-6 text-ui-text-primary">
              Education & Experience
            </h3>
            
            <div className="space-y-6">
              <div className="border-l-4 border-brand-primary pl-6">
                <h4 className="font-medium text-ui-text-primary">Master of Architecture</h4>
                <p className="text-ui-text-muted text-sm">University Name • 2020</p>
                <p className="text-ui-text-secondary text-sm mt-2">
                  Focused on sustainable design practices and urban planning
                </p>
              </div>
              
              <div className="border-l-4 border-brand-primary pl-6">
                <h4 className="font-medium text-ui-text-primary">Bachelor of Architecture</h4>
                <p className="text-ui-text-muted text-sm">University Name • 2018</p>
                <p className="text-ui-text-secondary text-sm mt-2">
                  Foundation in architectural design and building systems
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <a 
                href="/cv.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border-2 border-brand-primary text-brand-primary font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:bg-brand-primary hover:text-white"
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="mr-2"
                >
                  <path 
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <polyline 
                    points="14,2 14,8 20,8" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <line 
                    x1="16" 
                    y1="13" 
                    x2="8" 
                    y2="13" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                  <line 
                    x1="16" 
                    y1="17" 
                    x2="8" 
                    y2="17" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                  <polyline 
                    points="10,9 9,9 8,9" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}