import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X, SunMedium } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { totalItems } = useCart();
  const { favorites } = useFavorites();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const categories = [
    { name: 'Солнечные панели', path: '/catalog/solar-panels' },
    { name: 'Аккумуляторы', path: '/catalog/batteries' },
    { name: 'Инверторы', path: '/catalog/inverters' },
    { name: 'LED-освещение', path: '/catalog/led-lighting' },
    { name: 'Контроллеры заряда', path: '/catalog/charge-controllers' },
    { name: 'Аксессуары', path: '/catalog/accessories' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        {/* Top Bar */}
        <div className="py-2 text-sm border-b border-gray-100 flex justify-between items-center">
          <div>
            <span className="inline-flex items-center">
              <SunMedium className="h-4 w-4 text-accent mr-1" />
              <span>Доставка по Бишкеку и всему Кыргызстану</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="dropdown relative">
                <button className="flex items-center space-x-1 nav-link">
                  <span>{user?.name}</span>
                </button>
                <div className="dropdown-menu hidden">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Мой профиль</Link>
                  <button 
                    onClick={logout} 
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="nav-link">Войти</Link>
                <Link to="/register" className="nav-link">Регистрация</Link>
              </>
            )}
          </div>
        </div>

        {/* Main Header */}
        <div className="py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <SunMedium className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">ЭкоЭнергия</span>
          </Link>

          {/* Search - hide on mobile */}
          <form 
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-grow max-w-lg mx-8 relative"
          >
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button 
              type="submit"
              className="absolute right-3"
            >
              <Search className="h-5 w-5 text-gray-500" />
            </button>
          </form>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/favorites" className="relative p-2">
              <Heart className="h-6 w-6" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to={isAuthenticated ? "/profile" : "/login"} className="hidden md:block p-2">
              <User className="h-6 w-6" />
            </Link>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block py-3 border-t border-gray-100">
          <ul className="flex space-x-6">
            {categories.map((category, index) => (
              <li key={index}>
                <Link to={category.path} className="nav-link font-medium">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-white h-full w-80 max-w-full overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                <SunMedium className="h-7 w-7 text-primary" />
                <span className="text-xl font-bold">ЭкоЭнергия</span>
              </Link>
              <button onClick={toggleMenu}>
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Search */}
            <form 
              onSubmit={(e) => {
                handleSearch(e);
                setIsMenuOpen(false);
              }}
              className="p-4 border-b"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-2"
                >
                  <Search className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </form>

            {/* Mobile Categories */}
            <ul className="p-4 border-b">
              {categories.map((category, index) => (
                <li key={index} className="mb-3">
                  <Link 
                    to={category.path} 
                    className="block py-2 nav-link font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* User Actions */}
            <div className="p-4">
              {isAuthenticated ? (
                <>
                  <p className="font-medium mb-3">Здравствуйте, {user?.name}</p>
                  <Link 
                    to="/profile" 
                    className="block py-2 nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Мой профиль
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }} 
                    className="block py-2 nav-link"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block py-2 nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Войти
                  </Link>
                  <Link 
                    to="/register" 
                    className="block py-2 nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}