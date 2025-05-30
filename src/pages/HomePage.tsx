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
      imageSrc: 'https://volta.kg/wp-content/uploads/2023/12/solnechnye-paneli.jpg',
      linkTo: '/catalog/solar-panels',
      count: 3
    },
    {
      title: 'Аккумуляторы',
      imageSrc: 'https://rovo.org.ua/media/thumb/25/79/product-Akumulyator-dlya-avtomobilya-litiieviy-LP-LiFePO4-zliva-12V-230-Ah_257910465ee940aeaf3bb61a5e67cc63.ipthumb850x850prop.jpg',
      linkTo: '/catalog/batteries',
      count: 2
    },
    {
      title: 'Инверторы',
      imageSrc: 'https://volta.kg/wp-content/uploads/2023/12/1.jpg',
      linkTo: '/catalog/inverters',
      count: 2
    },
    {
      title: 'LED-освещение',
      imageSrc: 'https://stroit.ru/wp-content/uploads/2020/10/svetodiodnoe-osveschenie-v-interere.jpg',
      linkTo: '/catalog/led-lighting',
      count: 3
    },
    {
      title: 'Контроллеры заряда',
      imageSrc: 'https://volta.kg/wp-content/uploads/2024/09/MPPT_1.png',
      linkTo: '/catalog/charge-controllers',
      count: 2
    },
    {
      title: 'Аксессуары',
      imageSrc: 'https://insolenergy.com.ua/image/cache/catalog/12222/AksesuariSolnechniepanelizastavka-777x777.jpg',
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