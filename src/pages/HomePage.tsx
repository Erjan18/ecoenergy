import { useEffect } from 'react';
import HeroSlider from '../components/ui/HeroSlider';
import CategoryCard from '../components/ui/CategoryCard';
import ProductGrid from '../components/ui/ProductGrid';
import SectionTitle from '../components/ui/SectionTitle';
import { getPopularProducts, getNewProducts, getDiscountProducts } from '../data/products';

export default function HomePage() {
  useEffect(() => {
    document.title = 'ЭкоЭнергия - Альтернативные источники энергии';
  }, []);

  const categories = [
    {
      title: 'Солнечные панели',
      imageSrc: 'https://images.pexels.com/photos/9875458/pexels-photo-9875458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      linkTo: '/catalog/solar-panels',
      count: 3
    },
    {
      title: 'Аккумуляторы',
      imageSrc: 'https://images.pexels.com/photos/9875425/pexels-photo-9875425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      linkTo: '/catalog/batteries',
      count: 2
    },
    {
      title: 'Инверторы',
      imageSrc: 'https://images.pexels.com/photos/14781026/pexels-photo-14781026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      linkTo: '/catalog/inverters',
      count: 2
    },
    {
      title: 'LED-освещение',
      imageSrc: 'https://images.pexels.com/photos/3566359/pexels-photo-3566359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      linkTo: '/catalog/led-lighting',
      count: 3
    },
    {
      title: 'Контроллеры заряда',
      imageSrc: 'https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      linkTo: '/catalog/charge-controllers',
      count: 2
    },
    {
      title: 'Аксессуары',
      imageSrc: 'https://images.pexels.com/photos/3709436/pexels-photo-3709436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      linkTo: '/catalog/accessories',
      count: 2
    }
  ];

  const popularProducts = getPopularProducts();
  const newProducts = getNewProducts();
  const discountProducts = getDiscountProducts();

  return (
    <div>
      <HeroSlider />
      
      <section className="py-10">
        <div className="container-custom">
          <SectionTitle 
            title="Категории товаров" 
            subtitle="Выберите интересующую вас категорию"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-10 bg-gray-50">
        <div className="container-custom">
          <SectionTitle 
            title="Популярные товары" 
            subtitle="Наиболее востребованные позиции"
            linkTo="/catalog"
          />
          
          <ProductGrid products={popularProducts} />
        </div>
      </section>
      
      <section className="py-10">
        <div className="container-custom">
          <SectionTitle 
            title="Новинки" 
            subtitle="Недавно добавленные в наш каталог"
            linkTo="/catalog"
          />
          
          <ProductGrid products={newProducts} />
        </div>
      </section>
      
      <section className="py-10 bg-gray-50">
        <div className="container-custom">
          <SectionTitle 
            title="Товары со скидкой" 
            subtitle="Выгодные предложения"
            linkTo="/catalog"
          />
          
          <ProductGrid products={discountProducts} />
        </div>
      </section>
      
      <section className="py-10">
        <div className="container-custom">
          <div className="bg-primary/10 rounded-lg p-6 md:p-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl md:text-3xl font-medium mb-2">О компании ЭкоЭнергия</h2>
                <p className="text-gray-700">
                  Мы специализируемся на поставках оборудования для альтернативных источников энергии в Кыргызстане с 2015 года. 
                  Наша миссия — делать современные экологичные технологии доступными для каждого.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Только сертифицированное оборудование</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Бесплатная консультация и расчет системы</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Гарантия и сервисное обслуживание</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span>Доставка по всему Кыргызстану</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}