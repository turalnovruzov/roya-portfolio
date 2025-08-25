'use client'

export function ContactSection() {
  return (
    <section 
      id="contact" 
      aria-label="Get In Touch"
      className="py-20 bg-white dark:bg-black"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-gray-900 dark:text-white">
            Get In Touch
          </h2>
          <div className="w-16 h-1 mx-auto mb-6" 
               style={{ backgroundColor: 'hsl(var(--portfolio-accent))' }}>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to bring your vision to life? Let&apos;s discuss your project and 
            explore how we can create something extraordinary together.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-medium mb-6 text-gray-900 dark:text-white">
              Let&apos;s Connect
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                  style={{ backgroundColor: 'hsl(var(--portfolio-accent-light))' }}
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    style={{ color: 'hsl(var(--portfolio-accent))' }}
                  >
                    <path 
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    />
                    <polyline 
                      points="22,6 12,13 2,6" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Email</h4>
                  <p className="text-gray-600 dark:text-gray-400">hello@royanovruzova.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                  style={{ backgroundColor: 'hsl(var(--portfolio-accent-light))' }}
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    style={{ color: 'hsl(var(--portfolio-accent))' }}
                  >
                    <path 
                      d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    />
                    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400">Available for projects worldwide</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
                  style={{ backgroundColor: 'hsl(var(--portfolio-accent-light))' }}
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    style={{ color: 'hsl(var(--portfolio-accent))' }}
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <polyline 
                      points="12,6 12,12 16,14" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">Response Time</h4>
                  <p className="text-gray-600 dark:text-gray-400">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form Placeholder */}
          <div>
            <h3 className="text-xl font-medium mb-6 text-gray-900 dark:text-white">
              Send a Message
            </h3>
            
            {/* Note: Full contact form functionality will be implemented in RW-5 */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
              <svg 
                width="48" 
                height="48" 
                viewBox="0 0 24 24" 
                fill="none"
                className="mx-auto mb-4 text-gray-400"
              >
                <path 
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Contact Form Coming Soon
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                A contact form will be available here in the next update. 
                For now, please reach out via email.
              </p>
              <a 
                href="mailto:hello@royanovruzova.com"
                className="inline-flex items-center px-6 py-3 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: 'hsl(var(--portfolio-accent))' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'hsl(var(--portfolio-accent-hover))'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'hsl(var(--portfolio-accent))'}
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}