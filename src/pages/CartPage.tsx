import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice } = useCart();

  useEffect(() => {
    document.title = 'Корзина - ЭкоЭнергия';
  }, []);

  if (items.length === 0) {
    return (
      <div className="py-16 container-custom">
        <div className="text-center max-w-md mx-auto">
          <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-medium mb-2">Ваша корзина пуста</h1>
          <p className="text-gray-600 mb-6">
            Похоже, вы еще не добавили товары в корзину.
          </p>
          <Link to="/catalog" className="btn btn-primary">
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 container-custom">
      <h1 className="text-2xl md:text-3xl font-medium mb-6">Корзина</h1>
      
      <div className="lg:flex lg:gap-8">
        {/* Cart items */}
        <div className="lg:w-2/3 mb-8 lg:mb-0">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">Товар</th>
                    <th className="py-3 px-4 text-center">Цена</th>
                    <th className="py-3 px-4 text-center">Количество</th>
                    <th className="py-3 px-4 text-right">Сумма</th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.product.id}>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                            <img 
                              src={item.product.images[0]} 
                              alt={item.product.name} 
                              className="w-16 h-16 object-cover rounded"
                            />
                          </Link>
                          <div className="ml-4">
                            <Link to={`/product/${item.product.id}`} className="font-medium hover:text-primary">
                              {item.product.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        {item.product.price.toLocaleString()} сом
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-medium">
                        {(item.product.price * item.quantity).toLocaleString()} сом
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-gray-500 hover:text-red-500"
                          aria-label="Удалить"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Order summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Сумма заказа</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Товары ({totalItems})</span>
                <span>{totalPrice.toLocaleString()} сом</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Доставка</span>
                <span>300 сом</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-medium text-lg">
                <span>Итого</span>
                <span>{(totalPrice + 300).toLocaleString()} сом</span>
              </div>
            </div>
            
            <Link to="/checkout" className="btn btn-primary w-full">
              Оформить заказ
            </Link>
            
            <Link to="/catalog" className="mt-4 text-primary text-center block">
              Продолжить покупки
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}