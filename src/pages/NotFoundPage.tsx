import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Страница не найдена - ЭкоЭнергия';
  }, []);
  
  return (
    <div className="py-16 container-custom text-center">
      <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
      <h2 className="text-2xl font-medium mb-4">Страница не найдена</h2>
      <p className="text-gray-600 max-w-md mx-auto mb-8">
        Извините, но страница, которую вы пытаетесь найти, не существует или была перемещена.
      </p>
      <Link to="/" className="btn btn-primary">
        Вернуться на главную
      </Link>
    </div>
  );
}