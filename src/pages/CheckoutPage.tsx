import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

type DeliveryMethod = 'courier' | 'pickup' | 'transport';
type PaymentMethod = 'online' | 'cash' | 'card';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: 'Бишкек',
    comment: '',
  });
  
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('courier');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    document.title = 'Оформление заказа - ЭкоЭнергия';
    
    // Redirect to cart if cart is empty
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Введите имя';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Введите фамилию';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    } else if (!/^\+?[0-9]{10,13}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Неверный формат номера';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }
    
    if (deliveryMethod === 'courier' && !formData.address.trim()) {
      newErrors.address = 'Введите адрес доставки';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate order processing
      setTimeout(() => {
        clearCart();
        navigate('/checkout/success');
        setIsSubmitting(false);
      }, 1500);
    }
  };

  const getDeliveryPrice = () => {
    switch (deliveryMethod) {
      case 'courier':
        return 300;
      case 'transport':
        return 500;
      case 'pickup':
        return 0;
      default:
        return 0;
    }
  };

  const deliveryPrice = getDeliveryPrice();
  const totalWithDelivery = totalPrice + deliveryPrice;

  return (
    <div className="py-8 container-custom">
      <h1 className="text-2xl md:text-3xl font-medium mb-6">Оформление заказа</h1>
      
      <div className="lg:flex lg:gap-8">
        <div className="lg:w-2/3 mb-8 lg:mb-0">
          <form onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Контактная информация</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Имя <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full border ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Фамилия <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full border ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+996 XXX XXX XXX"
                    className={`w-full border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              
              {!isAuthenticated && (
                <p className="text-sm text-gray-600 mt-2">
                  Уже зарегистрированы? <Link to="/login" className="text-primary">Войдите</Link> для быстрого оформления заказа.
                </p>
              )}
            </div>
            
            {/* Delivery */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Способ доставки</h2>
              
              <div className="space-y-3 mb-4">
                <label className="flex items-center cursor-pointer p-3 border rounded-md hover:bg-gray-50">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={deliveryMethod === 'courier'}
                    onChange={() => setDeliveryMethod('courier')}
                    className="mr-3"
                  />
                  <div>
                    <span className="font-medium">Курьерская доставка</span>
                    <p className="text-sm text-gray-600">
                      Доставка по Бишкеку в течение 1-2 дней
                      <span className="ml-2 font-medium">300 сом</span>
                    </p>
                  </div>
                </label>
                
                <label className="flex items-center cursor-pointer p-3 border rounded-md hover:bg-gray-50">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={deliveryMethod === 'pickup'}
                    onChange={() => setDeliveryMethod('pickup')}
                    className="mr-3"
                  />
                  <div>
                    <span className="font-medium">Самовывоз</span>
                    <p className="text-sm text-gray-600">
                      г. Бишкек, ул. Панфилова 333
                      <span className="ml-2 font-medium">Бесплатно</span>
                    </p>
                  </div>
                </label>
                
                <label className="flex items-center cursor-pointer p-3 border rounded-md hover:bg-gray-50">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    checked={deliveryMethod === 'transport'}
                    onChange={() => setDeliveryMethod('transport')}
                    className="mr-3"
                  />
                  <div>
                    <span className="font-medium">Доставка по Кыргызстану</span>
                    <p className="text-sm text-gray-600">
                      Доставка в регионы в течение 3-7 дней
                      <span className="ml-2 font-medium">от 500 сом</span>
                    </p>
                  </div>
                </label>
              </div>
              
              {deliveryMethod !== 'pickup' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Город
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Адрес доставки <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Улица, дом, квартира"
                      className={`w-full border ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Payment */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Способ оплаты</h2>
              
              <div className="space-y-3 mb-4">
                <label className="flex items-center cursor-pointer p-3 border rounded-md hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mr-3"
                  />
                  <div>
                    <span className="font-medium">Оплата картой при получении</span>
                    <p className="text-sm text-gray-600">
                      Visa, MasterCard, Элкарт
                    </p>
                  </div>
                </label>
                
                <label className="flex items-center cursor-pointer p-3 border rounded-md hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                    className="mr-3"
                  />
                  <div>
                    <span className="font-medium">Наличными при получении</span>
                  </div>
                </label>
                
                <label className="flex items-center cursor-pointer p-3 border rounded-md hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === 'online'}
                    onChange={() => setPaymentMethod('online')}
                    className="mr-3"
                  />
                  <div>
                    <span className="font-medium">Онлайн-оплата</span>
                    <p className="text-sm text-gray-600">
                      Банковской картой, электронными деньгами
                    </p>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Comment */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Комментарий к заказу</h2>
              
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                rows={3}
                placeholder="Дополнительная информация к заказу..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              ></textarea>
            </div>
          </form>
        </div>
        
        {/* Order summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-lg font-medium mb-4">Ваш заказ</h2>
            
            <div className="mb-4">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between py-2 border-b">
                  <div className="flex-1">
                    <span className="font-medium">{item.product.name}</span>
                    <span className="text-gray-600 block text-sm">
                      {item.quantity} × {item.product.price.toLocaleString()} сом
                    </span>
                  </div>
                  <div className="text-right">
                    {(item.product.price * item.quantity).toLocaleString()} сом
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Сумма товаров</span>
                <span>{totalPrice.toLocaleString()} сом</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Доставка</span>
                <span>{deliveryPrice.toLocaleString()} сом</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-medium text-lg">
                <span>Итого</span>
                <span>{totalWithDelivery.toLocaleString()} сом</span>
              </div>
            </div>
            
            <button 
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn btn-primary w-full flex justify-center items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                    <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Оформление...
                </>
              ) : (
                'Оформить заказ'
              )}
            </button>
            
            <p className="text-sm text-gray-500 mt-4 text-center">
              Нажимая кнопку "Оформить заказ", вы соглашаетесь с условиями
              обработки персональных данных и публичной офертой.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}