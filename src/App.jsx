import { useState } from 'react'
import ChatWidget from './components/ChatWidget'
import ShopifyIntegration from './components/ShopifyIntegration'
import TrainingDashboard from './components/TrainingDashboard'
import { Button } from '@/components/ui/button'
import { MessageCircle, Settings, Brain } from 'lucide-react'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-purple-600">Feelori AI Assistant</h1>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage('shopify')}
                className="flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Shopify Integration</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentPage('training')}
                className="flex items-center space-x-2"
              >
                <Brain className="w-4 h-4" />
                <span>AI Training</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Demo page content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Feelori
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your destination for comfort and wellness products
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
                <h3 className="font-semibold mb-2">Feelori Comfort Pillow</h3>
                <p className="text-gray-600 text-sm mb-3">Ultra-soft memory foam pillow designed for optimal comfort</p>
                <p className="font-bold text-green-600">$49.99</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
                <h3 className="font-semibold mb-2">Aromatherapy Diffuser</h3>
                <p className="text-gray-600 text-sm mb-3">Essential oil diffuser with LED lighting and timer settings</p>
                <p className="font-bold text-green-600">$79.99</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="w-full h-32 bg-gray-200 rounded-lg mb-4"></div>
                <h3 className="font-semibold mb-2">Weighted Blanket</h3>
                <p className="text-gray-600 text-sm mb-3">Premium weighted blanket for better sleep and relaxation</p>
                <p className="font-bold text-green-600">$129.99</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-6">
              Our AI assistant is here to help you find the perfect products, 
              answer questions about shipping and returns, and provide personalized recommendations.
            </p>
            <p className="text-sm text-purple-600 font-medium">
              Click the chat button in the bottom right corner to get started! 💬
            </p>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )

  const ShopifyPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-purple-600">Feelori AI Assistant</h1>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage('home')}
                className="flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Back to Demo</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentPage('training')}
                className="flex items-center space-x-2"
              >
                <Brain className="w-4 h-4" />
                <span>AI Training</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <ShopifyIntegration />
    </div>
  )

  const TrainingPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-purple-600">Feelori AI Assistant</h1>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage('home')}
                className="flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Back to Demo</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentPage('shopify')}
                className="flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Shopify Integration</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <TrainingDashboard />
    </div>
  )

  if (currentPage === 'shopify') return <ShopifyPage />
  if (currentPage === 'training') return <TrainingPage />
  return <HomePage />
}

export default App
