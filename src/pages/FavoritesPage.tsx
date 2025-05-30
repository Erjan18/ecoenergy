import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import ProductGrid from '../components/ui/ProductGrid';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  
  useEffect(() => {
    document.title = 'Избранное - ЭкоЭнергия';
  }, []);
  
  return (
    <div className="py-8 container-custom">
      <h1 className="text-2xl md:text-3xl font-medium mb-6">Избранное</h1>
      
      {favorites.length > 0 ? (
        <ProductGrid products={favorites} />
      ) : (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-medium mb-2">В избранном пока пусто</h2>
          <p className="text-gray-600 mb-6">
            Добавляйте товары в избранное, чтобы не потерять их.
          </p>
          <Link to="/catalog" className="btn btn-primary">
            Перейти в каталог
          </Link>
        </div>
      )}
    </div>
  );
}