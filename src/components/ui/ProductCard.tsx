import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';

type ProductCardProps = {
  product: Product;
  className?: string;
};

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  const favorite = isFavorite(product.id);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className={`card group ${className}`}>
      <Link to={`/product/${product.id}`} className="block h-full">
        {/* Image and badges */}
        <div className="relative overflow-hidden h-48 sm:h-56">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
          
          <button 
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-sm hover:shadow transition-shadow"
          >
            <Heart 
              className={`h-5 w-5 ${favorite ? 'fill-primary text-primary' : 'text-gray-400'}`} 
            />
          </button>
          
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-secondary text-white text-xs font-medium px-2 py-1 rounded">Новинка</span>
            )}
            {product.isDiscount && product.oldPrice && (
              <span className="bg-accent text-white text-xs font-medium px-2 py-1 rounded">
                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </span>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <span className="text-sm text-amber-500">★</span>
              <span className="text-sm ml-1">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-500 ml-2">({product.reviews} отзывов)</span>
          </div>
          
          <h3 className="font-medium text-text line-clamp-2 mb-2 min-h-[48px]">
            {product.name}
          </h3>
          
          <div className="mb-3">
            <div className="flex items-end gap-2">
              <span className="text-lg font-medium">{product.price.toLocaleString()} сом</span>
              {product.oldPrice && (
                <span className="text-sm text-gray-500 line-through">{product.oldPrice.toLocaleString()} сом</span>
              )}
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="btn btn-primary w-full"
          >
            В корзину
          </button>
        </div>
      </Link>
    </div>
  );
}