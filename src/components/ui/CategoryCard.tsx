import { Link } from 'react-router-dom';

type CategoryCardProps = {
  title: string;
  imageSrc: string;
  linkTo: string;
  count?: number;
};

export default function CategoryCard({ title, imageSrc, linkTo, count }: CategoryCardProps) {
  return (
    <Link to={linkTo} className="group block">
      <div className="relative overflow-hidden rounded-lg shadow-sm">
        <div className="aspect-[4/3]">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-4 text-white">
          <h3 className="text-lg font-medium">{title}</h3>
          {count !== undefined && (
            <p className="text-sm opacity-90">{count} товаров</p>
          )}
        </div>
      </div>
    </Link>
  );
}