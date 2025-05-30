import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    title: 'Солнечные панели со скидкой до 15%',
    subtitle: 'Используйте энергию солнца с максимальной выгодой',
    imageUrl: 'https://www.basenton.com/wp-content/uploads/2024/04/Solar-Panels-Image.jpg',
    linkTo: '/catalog/solar-panels',
    linkText: 'Выбрать панель',
    align: 'left',
  },
  {
    id: 2,
    title: 'Литиевые аккумуляторы LiFePO4',
    subtitle: 'Более 4000 циклов заряда и длительный срок службы',
    imageUrl: 'https://www.esludger.com.ua/images/Content/Li_Ion/RELiON-Blog-Building-Safer-Lithium-ion-Batteries.png',
    linkTo: '/catalog/batteries',
    linkText: 'Подробнее',
    align: 'right',
  },
  {
    id: 3,
    title: 'LED-освещение для любых задач',
    subtitle: 'Экономия электроэнергии до 80% по сравнению с обычными лампами',
    imageUrl: 'https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    linkTo: '/catalog/led-lighting',
    linkText: 'Смотреть каталог',
    align: 'left',
  },
];

export default function HeroSlider() {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="h-[300px] sm:h-[400px] md:h-[500px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="relative h-full w-full bg-cover bg-center flex items-center"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className={`container-custom relative z-10 text-white ${
                slide.align === 'right' ? 'text-right ml-auto' : 'text-left mr-auto'
              }`}>
                <div className={`max-w-lg ${slide.align === 'right' ? 'ml-auto' : 'mr-auto'}`}>
                  <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">{slide.title}</h2>
                  <p className="text-sm md:text-base mb-4 md:mb-6">{slide.subtitle}</p>
                  <Link 
                    to={slide.linkTo}
                    className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-md transition-colors"
                  >
                    {slide.linkText}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}