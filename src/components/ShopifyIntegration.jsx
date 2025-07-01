import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, ShoppingBag, Package, Truck, DollarSign } from 'lucide-react'

const ShopifyIntegration = () => {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [syncStatus, setSyncStatus] = useState('')

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/shopify/products')
      const data = await response.json()
      
      if (data.success) {
        setProducts(data.products)
        setSyncStatus(`Loaded ${data.products.length} products from ${data.source}`)
      } else {
        setSyncStatus('Failed to load products')
      }
    } catch (error) {
      setSyncStatus('Error loading products: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/shopify/orders')
      const data = await response.json()
      
      if (data.success) {
        setOrders(data.orders)
        setSyncStatus(`Loaded ${data.orders.length} orders from ${data.source}`)
      } else {
        setSyncStatus('Failed to load orders')
      }
    } catch (error) {
      setSyncStatus('Error loading orders: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const syncData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/shopify/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json()
      
      if (data.success) {
        setSyncStatus(data.message)
        // Refresh products after sync
        await fetchProducts()
      } else {
        setSyncStatus('Sync failed: ' + data.error)
      }
    } catch (error) {
      setSyncStatus('Sync error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const ProductCard = ({ product }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">{product.title}</CardTitle>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">{product.product_type}</Badge>
          <Badge variant="outline">{product.vendor}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: product.body_html }} className="text-sm text-gray-600 mb-3" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-green-600">
                ${product.variants?.[0]?.price || 'N/A'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Package className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600">
                Stock: {product.variants?.[0]?.inventory_quantity || 0}
              </span>
            </div>
          </div>
          <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
            {product.status}
          </Badge>
        </div>
        {product.tags && (
          <div className="mt-2">
            <div className="flex flex-wrap gap-1">
              {product.tags.split(',').slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag.trim()}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const OrderCard = ({ order }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Order #{order.number}</CardTitle>
        <div className="flex items-center space-x-2">
          <Badge variant={order.financial_status === 'paid' ? 'default' : 'secondary'}>
            {order.financial_status}
          </Badge>
          <Badge variant={order.fulfillment_status === 'fulfilled' ? 'default' : 'outline'}>
            <Truck className="w-3 h-3 mr-1" />
            {order.fulfillment_status || 'unfulfilled'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Customer: {order.email}</p>
            <p className="text-sm text-gray-600">
              Date: {new Date(order.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-green-600">${order.total_price}</span>
            </div>
            <p className="text-sm text-gray-600">
              {order.line_items?.length || 0} item(s)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Shopify Integration Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Manage your Shopify store integration and sync product data for the AI assistant.
        </p>
        
        <div className="flex space-x-4 mb-4">
          <Button onClick={fetchProducts} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ShoppingBag className="w-4 h-4 mr-2" />}
            Load Products
          </Button>
          <Button onClick={fetchOrders} disabled={loading} variant="outline">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Package className="w-4 h-4 mr-2" />}
            Load Orders
          </Button>
          <Button onClick={syncData} disabled={loading} variant="secondary">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Package className="w-4 h-4 mr-2" />}
            Sync Data
          </Button>
        </div>

        {syncStatus && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">{syncStatus}</p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Products ({products.length})</h2>
          <div className="max-h-96 overflow-y-auto">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  No products loaded. Click "Load Products" to fetch data.
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Recent Orders ({orders.length})</h2>
          <div className="max-h-96 overflow-y-auto">
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  No orders loaded. Click "Load Orders" to fetch data.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopifyIntegration

