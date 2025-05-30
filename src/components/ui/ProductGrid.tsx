import ProductCard from './ProductCard';
import { Product } from '../../types/product';

type ProductGridProps = {
  products: Product[];
  title?: string;
  emptyMessage?: string;
  className?: string;
};

export default function ProductGrid({
  products,
  title,
  emptyMessage = 'Товары не найдены',
  className = '',
}: ProductGridProps) {
  return (
    <div className={className}>
      {title && (
        <h2 className="text-2xl font-medium mb-4">{title}</h2>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}