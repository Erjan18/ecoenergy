import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Package, CreditCard, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    document.title = 'Личный кабинет - ЭкоЭнергия';
    
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/profile' } });
    }
    
    // Update form data when user changes
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [isAuthenticated, navigate, user]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    });
    
    setIsEditing(false);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  return (
    <div className="py-8 container-custom">
      <h1 className="text-2xl md:text-3xl font-medium mb-6">Личный кабинет</h1>
      
      <div className="lg:flex lg:gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4 mb-6 lg:mb-0">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                  <span className="text-lg font-medium">
                    {user.name.substring(0, 1)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
            </div>
            
            <nav className="p-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'profile'
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <User className="h-5 w-5 mr-3" />
                <span>Профиль</span>
              </button>
              
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex items-center w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'orders'
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <Package className="h-5 w-5 mr-3" />
                <span>Мои заказы</span>
              </button>
              
              <button
                onClick={() => setActiveTab('payment')}
                className={`flex items-center w-full text-left px-4 py-2 rounded-md ${
                  activeTab === 'payment'
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <CreditCard className="h-5 w-5 mr-3" />
                <span>Способы оплаты</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2 rounded-md text-red-500 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Выйти</span>
              </button>
            </nav>
          </div>
        </div>
        
        {/* Content */}
        <div className="lg:w-3/4">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Личные данные</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-primary hover:text-primary-dark"
                  >
                    Редактировать
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Отмена
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Имя и фамилия
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+996 XXX XXX XXX"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Адрес
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="г. Бишкек, ул. ..."
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Сохранить изменения
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Имя и фамилия</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Телефон</p>
                      <p className="font-medium">
                        {user.phone || 'Не указан'}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Адрес</p>
                      <p className="font-medium">
                        {user.address || 'Не указан'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium mb-6">История заказов</h2>
              
              <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <p>У вас пока нет заказов</p>
              </div>
            </div>
          )}
          
          {activeTab === 'payment' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium mb-6">Способы оплаты</h2>
              
              <div className="text-center py-8 text-gray-500">
                <CreditCard className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <p>У вас нет сохраненных способов оплаты</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}