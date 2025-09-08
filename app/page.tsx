import Hero from '@/components/Hero';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      
      {/* Features Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why GEO Matters for Your Brand
            </h2>
            <p className="text-lg leading-8 text-gray-600">
              AI search engines are becoming the primary way people discover brands. Make sure you're visible.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  AI Search Visibility
                </h3>
                <p className="text-gray-600">
                  Discover how your brand appears in ChatGPT, Claude, and Gemini search results.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-green-100">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Competitor Analysis
                </h3>
                <p className="text-gray-600">
                  See how you stack up against competitors in AI-generated responses.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-purple-100">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Optimization Insights
                </h3>
                <p className="text-gray-600">
                  Get actionable recommendations to improve your AI search rankings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-50 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="border-t border-gray-200 pt-8">
            <p className="text-center text-sm text-gray-500">
              © 2025 BubbleShare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
