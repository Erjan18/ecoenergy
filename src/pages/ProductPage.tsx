import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Heart, Minus, Plus, ShoppingCart, Share2, Truck, Clock, ArrowLeft } from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/products';
import ProductGrid from '../components/ui/ProductGrid';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const product = id ? getProductById(id) : null;
  const relatedProducts = id ? getRelatedProducts(id) : [];
  
  const favorite = product ? isFavorite(product.id) : false;

  useEffect(() => {
    if (product) {
      document.title = `${product.name} - ЭкоЭнергия`;
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-medium mb-4">Товар не найден</h1>
        <p className="mb-6">К сожалению, запрашиваемый товар не существует или был удален.</p>
        <Link to="/catalog" className="btn btn-primary">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (value: number) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const specs = Object.entries(product.specs);

  return (
    <div className="py-8">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">Главная</Link>
          <span className="mx-2">/</span>
          <Link to="/catalog" className="hover:text-primary">Каталог</Link>
          <span className="mx-2">/</span>
          <Link to={`/catalog/${product.category}`} className="hover:text-primary">
            {product.category === 'solar-panels' && 'Солнечные панели'}
            {product.category === 'batteries' && 'Аккумуляторы'}
            {product.category === 'inverters' && 'Инверторы'}
            {product.category === 'led-lighting' && 'LED-освещение'}
            {product.category === 'charge-controllers' && 'Контроллеры заряда'}
            {product.category === 'accessories' && 'Аксессуары'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{product.name}</span>
        </div>

        <div className="md:flex md:gap-8 mb-10">
          {/* Product Images */}
          <div className="md:w-1/2 mb-6 md:mb-0">
            <Swiper
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="rounded-lg overflow-hidden mb-3 aspect-square"
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`${product.name} - изображение ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            
            {product.images.length > 1 && (
              <Swiper
                onSwiper={(swiper: any) => setThumbsSwiper(swiper)}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumbs-swiper"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index} className="cursor-pointer">
                    <div className="border rounded-md overflow-hidden h-20">
                      <img
                        src={image}
                        alt={`Миниатюра ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* Product Info */}
          <div className="md:w-1/2">
            <h1 className="text-2xl md:text-3xl font-medium mb-3">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <span className="text-amber-500">★</span>
                <span className="ml-1">{product.rating}</span>
              </div>
              <span className="text-gray-500 mx-2">|</span>
              <span className="text-gray-500">{product.reviews} отзывов</span>
              <span className="text-gray-500 mx-2">|</span>
              <span className={product.stock > 0 ? 'text-success' : 'text-error'}>
                {product.stock > 0 ? 'В наличии' : 'Нет в наличии'}
              </span>
            </div>
            
            <div className="mb-6">
              <div className="flex items-end gap-3">
                <span className="text-2xl font-medium">{product.price.toLocaleString()} сом</span>
                {product.oldPrice && (
                  <span className="text-gray-500 line-through">{product.oldPrice.toLocaleString()} сом</span>
                )}
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {/* Quantity selector and actions */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="border border-gray-300 rounded-md flex items-center mr-4">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleInputChange}
                    className="w-12 text-center border-x border-gray-300 py-2"
                    min="1"
                    max={product.stock}
                  />
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-gray-500">
                  Доступно: {product.stock} шт.
                </span>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={handleAddToCart}
                  className="btn btn-primary flex-grow sm:flex-grow-0 min-w-[200px]"
                  disabled={product.stock <= 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Добавить в корзину
                </button>
                <button 
                  onClick={handleFavoriteToggle}
                  className={`btn ${
                    favorite ? 'bg-red-50 text-red-500 border-red-200' : 'btn-outline'
                  }`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${favorite ? 'fill-red-500' : ''}`} />
                  {favorite ? 'В избранном' : 'В избранное'}
                </button>
              </div>
            </div>
            
            {/* Delivery info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-start mb-3">
                <Truck className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Доставка</h3>
                  <p className="text-sm text-gray-600">Доставка по Бишкеку: 300 сом</p>
                  <p className="text-sm text-gray-600">Доставка по Кыргызстану: от 500 сом</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Сроки доставки</h3>
                  <p className="text-sm text-gray-600">По Бишкеку: 1-2 дня</p>
                  <p className="text-sm text-gray-600">По Кыргызстану: 3-7 дней</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-10">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-3 px-4 text-sm font-medium border-b-2 ${
                  activeTab === 'description'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Характеристики
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-3 px-4 text-sm font-medium border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Отзывы ({product.reviews})
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={`py-3 px-4 text-sm font-medium border-b-2 ${
                  activeTab === 'delivery'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Доставка и оплата
              </button>
            </nav>
          </div>

          <div className="py-6">
            {activeTab === 'description' && (
              <div>
                <h2 className="text-xl font-medium mb-4">Технические характеристики</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specs.map(([key, value], index) => (
                    <div 
                      key={index}
                      className={`flex justify-between py-2 px-3 ${
                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      <span className="text-gray-600">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-xl font-medium mb-4">Отзывы покупателей</h2>
                {product.reviews > 0 ? (
                  <div className="space-y-4">
                    {/* Simulated reviews */}
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="font-medium">Алексей</span>
                          <span className="text-gray-500 text-sm ml-2">12.05.2023</span>
                        </div>
                        <div className="flex">
                          <span className="text-amber-500">★★★★★</span>
                          <span className="ml-1">5.0</span>
                        </div>
                      </div>
                      <p>Отличный товар, полностью соответствует описанию. Доставили быстро, все работает как надо.</p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="font-medium">Мария</span>
                          <span className="text-gray-500 text-sm ml-2">03.04.2023</span>
                        </div>
                        <div className="flex">
                          <span className="text-amber-500">★★★★</span>
                          <span className="ml-1">4.0</span>
                        </div>
                      </div>
                      <p>Хорошее качество за свои деньги. Единственный минус - долгая доставка, но товаром довольна.</p>
                    </div>
                    
                    <button className="btn btn-outline w-full mt-4">
                      Показать все отзывы
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500">У данного товара еще нет отзывов. Будьте первым!</p>
                )}
                
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-3">Оставить отзыв</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ваша оценка
                      </label>
                      <div className="flex text-2xl text-gray-300">
                        <span className="cursor-pointer hover:text-amber-500">★</span>
                        <span className="cursor-pointer hover:text-amber-500">★</span>
                        <span className="cursor-pointer hover:text-amber-500">★</span>
                        <span className="cursor-pointer hover:text-amber-500">★</span>
                        <span className="cursor-pointer hover:text-amber-500">★</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ваш отзыв
                      </label>
                      <textarea 
                        rows={4}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Поделитесь своими впечатлениями о товаре..."
                      ></textarea>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">
                      Отправить отзыв
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div>
                <h2 className="text-xl font-medium mb-4">Доставка и оплата</h2>
                
                <div className="mb-6">
                  <h3 className="font-medium text-lg mb-2">Способы доставки</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="font-medium">Курьерская доставка по Бишкеку</span> - 300 сом. 
                      Срок доставки 1-2 рабочих дня.
                    </li>
                    <li>
                      <span className="font-medium">Доставка по Кыргызстану</span> - от 500 сом, 
                      в зависимости от региона. Срок доставки 3-7 рабочих дней.
                    </li>
                    <li>
                      <span className="font-medium">Самовывоз из офиса в Бишкеке</span> - бесплатно. 
                      Адрес: ул. Киевская 123, офис 45.
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Способы оплаты</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="font-medium">Наличными при получении</span> - 
                      для курьерской доставки и самовывоза.
                    </li>
                    <li>
                      <span className="font-medium">Банковской картой при получении</span> - 
                      через терминал курьера или в офисе при самовывозе.
                    </li>
                    <li>
                      <span className="font-medium">Онлайн-оплата</span> - 
                      банковскими картами Visa, MasterCard или через электронный кошелек.
                    </li>
                    <li>
                      <span className="font-medium">Безналичный расчет</span> - 
                      для юридических лиц. Предоставляем все необходимые документы.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-medium mb-6">Сопутствующие товары</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}