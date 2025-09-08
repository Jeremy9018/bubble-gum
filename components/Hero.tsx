import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-100/50 bg-[size:2rem_2rem] opacity-20" />
      
      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 text-sm font-medium text-purple-800">
            <span className="mr-2">🚀</span>
            Free GEO Analysis Report
          </div>
          
          {/* Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            See How Your Brand Appears in{' '}
            <span className="text-purple-900">
              AI Search Results
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="mb-10 text-xl leading-8 text-gray-600 sm:text-2xl">
            Get your free GEO report and discover how your brand performs across ChatGPT, Claude, Gemini, and other AI platforms.
          </p>
          
          {/* Benefits */}
          <div className="mb-10 flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-700 sm:gap-6">
            <div className="flex items-center">
              <svg className="mr-2 h-4 w-4 text-purple-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No credit card required
            </div>
            <div className="flex items-center">
              <svg className="mr-2 h-4 w-4 text-purple-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Takes 2 minutes
            </div>
            <div className="flex items-center">
              <svg className="mr-2 h-4 w-4 text-purple-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Instant insights
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="mb-12">
            <Link href="/signup/step-1">
              <Button size="lg" className="px-8 py-4 text-lg font-semibold">
                Get My Report
                <svg
                  className="ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
            </Link>
          </div>
          
          {/* Social Proof */}
          <div className="text-center">
            <p className="mb-6 text-sm font-medium text-gray-500">
              Trusted by marketing teams at growing companies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale">
              <div className="text-2xl font-bold text-gray-400">TechCorp</div>
              <div className="text-2xl font-bold text-gray-400">StartupXYZ</div>
              <div className="text-2xl font-bold text-gray-400">GrowthCo</div>
              <div className="text-2xl font-bold text-gray-400">ScaleUp</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="h-20 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-purple-100"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-purple-200"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;