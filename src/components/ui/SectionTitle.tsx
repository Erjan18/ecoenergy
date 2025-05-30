import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  linkTo?: string;
  linkText?: string;
  children?: ReactNode;
};

export default function SectionTitle({ 
  title, 
  subtitle, 
  linkTo, 
  linkText = 'Смотреть все',
  children
}: SectionTitleProps) {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl md:text-3xl font-medium">{title}</h2>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
        
        {linkTo && (
          <Link 
            to={linkTo} 
            className="text-primary hover:text-primary-dark font-medium text-sm transition-colors hidden sm:block"
          >
            {linkText} →
          </Link>
        )}
      </div>
      
      {children}
      
      {linkTo && (
        <Link 
          to={linkTo} 
          className="text-primary hover:text-primary-dark font-medium text-sm transition-colors block sm:hidden mt-4 text-center"
        >
          {linkText} →
        </Link>
      )}
    </div>
  );
}