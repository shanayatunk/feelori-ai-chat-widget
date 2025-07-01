import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, Brain, Database, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'

const TrainingDashboard = () => {
  const [trainingStatus, setTrainingStatus] = useState(null)
  const [knowledgeBase, setKnowledgeBase] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchTrainingStatus()
    fetchKnowledgeBase()
  }, [])

  const fetchTrainingStatus = async () => {
    try {
      const response = await fetch('/api/training/status')
      const data = await response.json()
      
      if (data.success) {
        setTrainingStatus(data.training_status)
      }
    } catch (error) {
      console.error('Error fetching training status:', error)
    }
  }

  const fetchKnowledgeBase = async () => {
    try {
      const response = await fetch('/api/training/knowledge-base')
      const data = await response.json()
      
      if (data.success) {
        setKnowledgeBase(data.knowledge_base_summary)
      }
    } catch (error) {
      console.error('Error fetching knowledge base:', error)
    }
  }

  const processProducts = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/training/process-products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
      })
      
      const data = await response.json()
      
      if (data.success) {
        setMessage(`Successfully processed ${data.processed_count} products with ${data.categories.length} categories and ${data.features_count} features.`)
        await fetchTrainingStatus()
        await fetchKnowledgeBase()
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const retrainModel = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/training/retrain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      const data = await response.json()
      
      if (data.success) {
        setMessage(`Model retrained successfully with ${data.products_processed} products.`)
        await fetchTrainingStatus()
        await fetchKnowledgeBase()
      } else {
        setMessage(`Error: ${data.error}`)
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const testSearch = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/training/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: 'comfort pillow',
          limit: 3
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setMessage(`Search test successful! Found ${data.count} results for "comfort pillow".`)
      } else {
        setMessage(`Search test failed: ${data.error}`)
      }
    } catch (error) {
      setMessage(`Search test error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const StatusCard = ({ title, status, description, icon: Icon }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          {status ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <Badge variant={status ? 'default' : 'secondary'}>
            {status ? 'Ready' : 'Not Ready'}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">AI Training Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Train your AI assistant on product data to provide better recommendations and responses.
        </p>
        
        <div className="flex space-x-4 mb-6">
          <Button onClick={processProducts} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Brain className="w-4 h-4 mr-2" />}
            Process Products
          </Button>
          <Button onClick={retrainModel} disabled={loading} variant="outline">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
            Retrain Model
          </Button>
          <Button onClick={testSearch} disabled={loading} variant="secondary">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Database className="w-4 h-4 mr-2" />}
            Test Search
          </Button>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${
            message.includes('Error') ? 'bg-red-50 border border-red-200 text-red-800' : 'bg-green-50 border border-green-200 text-green-800'
          }`}>
            <p>{message}</p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {trainingStatus && (
          <>
            <StatusCard
              title="Training Status"
              status={trainingStatus.is_trained}
              description={trainingStatus.is_trained ? 'AI model is trained and ready' : 'AI model needs training'}
              icon={Brain}
            />
            <StatusCard
              title="Products Data"
              status={trainingStatus.files_status?.products_file}
              description={`${trainingStatus.products_count} products processed`}
              icon={Database}
            />
            <StatusCard
              title="Knowledge Base"
              status={trainingStatus.files_status?.knowledge_base_file}
              description={`${trainingStatus.categories_count} categories available`}
              icon={CheckCircle}
            />
            <StatusCard
              title="Training Data"
              status={trainingStatus.files_status?.training_data_file}
              description="Training examples generated"
              icon={AlertCircle}
            />
          </>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Training Status</h2>
          <Card>
            <CardContent className="p-6">
              {trainingStatus ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Overall Status:</span>
                    <Badge variant={trainingStatus.is_trained ? 'default' : 'secondary'}>
                      {trainingStatus.is_trained ? 'Trained' : 'Not Trained'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Products Count:</span>
                    <span>{trainingStatus.products_count}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Categories:</span>
                    <span>{trainingStatus.categories_count}</span>
                  </div>
                  {trainingStatus.last_training && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Last Training:</span>
                      <span className="text-sm text-gray-600">
                        {new Date(trainingStatus.last_training).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">File Status:</h4>
                    <div className="space-y-2">
                      {Object.entries(trainingStatus.files_status || {}).map(([file, status]) => (
                        <div key={file} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{file.replace('_', ' ')}:</span>
                          <Badge variant={status ? 'default' : 'secondary'} className="text-xs">
                            {status ? 'Ready' : 'Missing'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                  Loading training status...
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Knowledge Base Summary</h2>
          <Card>
            <CardContent className="p-6">
              {knowledgeBase ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Products:</span>
                    <span>{knowledgeBase.products_count}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Features:</span>
                    <span>{knowledgeBase.features_count}</span>
                  </div>
                  <div>
                    <span className="font-medium">Categories:</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {knowledgeBase.categories?.map((category, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">FAQ Topics:</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {knowledgeBase.faq_topics?.map((topic, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {topic.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {knowledgeBase.price_ranges && Object.keys(knowledgeBase.price_ranges).length > 0 && (
                    <div>
                      <span className="font-medium">Price Ranges:</span>
                      <div className="mt-2 space-y-1">
                        {Object.entries(knowledgeBase.price_ranges).map(([category, range]) => (
                          <div key={category} className="text-sm">
                            <span className="font-medium">{category}:</span> ${range.min} - ${range.max}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {knowledgeBase.created_at && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Created:</span>
                      <span className="text-sm text-gray-600">
                        {new Date(knowledgeBase.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <Database className="w-8 h-8 mx-auto mb-2" />
                  No knowledge base found. Process products to create one.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Training Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">1. Process Products</h4>
                <p className="text-sm text-gray-600">
                  Click "Process Products" to fetch product data from Shopify and create training data for the AI assistant.
                  This will analyze product descriptions, extract features, and create a knowledge base.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">2. Retrain Model</h4>
                <p className="text-sm text-gray-600">
                  Use "Retrain Model" to update the AI with the latest product data from your Shopify store.
                  This should be done whenever you add new products or update existing ones.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">3. Test Search</h4>
                <p className="text-sm text-gray-600">
                  Click "Test Search" to verify that the AI can find products based on customer queries.
                  This helps ensure the training was successful.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TrainingDashboard

