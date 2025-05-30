import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  
  useEffect(() => {
    document.title = 'Вход - ЭкоЭнергия';
    
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      await login(email, password);
    } catch (err) {
      setError('Неверный email или пароль');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="py-12 container-custom">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-medium mb-6 text-center">Вход в аккаунт</h1>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="example@mail.com"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <div className="flex justify-end mt-1">
                <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-dark">
                  Забыли пароль?
                </Link>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full flex justify-center items-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                    <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Вход...
                </>
              ) : (
                'Войти'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              У вас нет аккаунта?{' '}
              <Link to="/register" className="text-primary hover:text-primary-dark font-medium">
                Зарегистрироваться
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-8 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-700 mb-2 font-medium">Демо данные для входа:</p>
            <p className="text-sm text-gray-600">Email: demo@example.com</p>
            <p className="text-sm text-gray-600">Пароль: password123</p>
            <p className="text-xs text-gray-500 mt-2">
              Вы можете использовать любой email и пароль для демонстрационного входа.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}