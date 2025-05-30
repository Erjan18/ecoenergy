import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 'sp-001',
    name: 'Солнечная панель MonoCrystal 400Вт',
    category: 'solar-panels',
    subcategory: 'Монокристаллические',
    price: 15500,
    oldPrice: 17000,
    rating: 4.8,
    reviews: 24,
    stock: 15,
    images: [
      'https://reenergo.ru/wp-content/uploads/delta-bst-360m.jpg',
      'https://solar-energy.com.ua/image/cache/catalog/ja_solar/6d118e1f9b5f710c75536fa6b657864b-380x380.jpg',
    ],
    description: 'Высокоэффективная монокристаллическая солнечная панель мощностью 400 Вт с КПД 21.3%. Идеально подходит для домашних и коммерческих солнечных электростанций. Гарантия производителя 10 лет.',
    isPopular: true,
    isDiscount: true,
    specs: {
      'Мощность': '400 Вт',
      'Тип': 'Монокристаллическая',
      'КПД': '21.3%',
      'Напряжение макс.': '48 В',
      'Рабочая температура': '-40°C до +85°C',
      'Размеры': '1755×1038×35 мм',
      'Вес': '21 кг',
      'Гарантия': '10 лет'
    },
    relatedProducts: ['sp-002', 'inv-001', 'bat-001', 'cc-001']
  },
  {
    id: 'sp-002',
    name: 'Солнечная панель PolyCrystal 380Вт',
    category: 'solar-panels',
    subcategory: 'Поликристаллические',
    price: 13800,
    rating: 4.5,
    reviews: 18,
    stock: 23,
    images: [
      'https://reenergo.ru/wp-content/uploads/hevel_hvl_72_gg_2.jpg',
      'https://resources.cdn-kaspi.kz/img/m/p/h5b/h96/64107513675806.jpg?format=gallery-large'
    ],
    description: 'Надежная поликристаллическая солнечная панель мощностью 380 Вт с КПД 18.7%. Отличное соотношение цены и производительности для небольших и средних систем.',
    specs: {
      'Мощность': '380 Вт',
      'Тип': 'Поликристаллическая',
      'КПД': '18.7%',
      'Напряжение макс.': '48 В',
      'Рабочая температура': '-40°C до +85°C',
      'Размеры': '1650×992×35 мм',
      'Вес': '19.5 кг',
      'Гарантия': '10 лет'
    },
    relatedProducts: ['sp-001', 'inv-001', 'bat-002', 'cc-001']
  },
  {
    id: 'sp-003',
    name: 'Солнечная панель MonoPerc 450Вт',
    category: 'solar-panels',
    subcategory: 'Монокристаллические',
    price: 18900,
    rating: 4.9,
    reviews: 12,
    stock: 8,
    images: [
      'https://images.prom.ua/3015584399_w600_h600_3015584399.jpg',
      'https://energy-dk.com.ua/wp-content/uploads/soniachna-panel-ja-solar-jam72d30-560-lb-1500v-560-vt-1-600x600.webp'
    ],
    description: 'Премиальная монокристаллическая солнечная панель мощностью 450 Вт с технологией PERC и КПД 22.1%. Высочайшая эффективность в своем классе.',
    isNew: true,
    specs: {
      'Мощность': '450 Вт',
      'Тип': 'Монокристаллическая PERC',
      'КПД': '22.1%',
      'Напряжение макс.': '48 В',
      'Рабочая температура': '-40°C до +85°C',
      'Размеры': '1855×1048×35 мм',
      'Вес': '22.5 кг',
      'Гарантия': '12 лет'
    },
    relatedProducts: ['sp-001', 'inv-002', 'bat-001', 'cc-002']
  },
  {
    id: 'bat-001',
    name: 'Аккумулятор LiFePO4 200Ач 12В',
    category: 'batteries',
    subcategory: 'LiFePO4',
    price: 65000,
    rating: 4.9,
    reviews: 32,
    stock: 7,
    images: [
      'https://basket-16.wbbasket.ru/vol2562/part256281/256281898/images/big/1.webp',
      'https://litime.com.ua/wp-content/uploads/2024/08/litime12v200ahlifepo4lithiumbatterie-1_74b087b5-8331-48c5-b54a-f651068733f8.jpg'
    ],
    description: 'Литий-железо-фосфатный аккумулятор емкостью 200Ач и напряжением 12В. Идеальное решение для солнечных электростанций с длительным сроком службы и высокой энергоэффективностью.',
    isPopular: true,
    specs: {
      'Тип': 'LiFePO4',
      'Ёмкость': '200 Ач',
      'Напряжение': '12 В',
      'Циклов заряда': '4000+',
      'Рабочая температура': '-20°C до +60°C',
      'Вес': '22 кг',
      'Размеры': '485×170×240 мм',
      'Гарантия': '5 лет'
    },
    relatedProducts: ['bat-002', 'sp-001', 'inv-001', 'cc-001']
  },
  {
    id: 'bat-002',
    name: 'Аккумулятор AGM 100Ач 12В',
    category: 'batteries',
    subcategory: 'AGM',
    price: 18500,
    oldPrice: 20000,
    rating: 4.5,
    reviews: 45,
    stock: 15,
    images: [
      'https://mtsbaza.com.ua/image/cache/catalog/AKB/Volt/VOLT%20FM%2012V%20100Ah%20(6AKUXAG100)-500x500-product_popup.jpg',
      'https://www.avtotool.com.ua/image/cache/wp/cj/products/91/akkumuljator-agm-dlja-ibp-i-inverterov-12v-100ah-agm-100-1-750x750.webp'
    ],
    description: 'Свинцово-кислотный аккумулятор AGM емкостью 100Ач и напряжением 12В. Не требует обслуживания, устойчив к глубоким разрядам.',
    isDiscount: true,
    specs: {
      'Тип': 'AGM VRLA',
      'Ёмкость': '100 Ач',
      'Напряжение': '12 В',
      'Циклов заряда': '500+',
      'Рабочая температура': '-20°C до +50°C',
      'Вес': '29 кг',
      'Размеры': '330×173×220 мм',
      'Гарантия': '2 года'
    },
    relatedProducts: ['bat-001', 'sp-002', 'inv-001', 'cc-001']
  },
  {
    id: 'inv-001',
    name: 'Инвертор Off-Grid 3000Вт 24В',
    category: 'inverters',
    subcategory: 'Off-Grid',
    price: 28900,
    rating: 4.7,
    reviews: 19,
    stock: 11,
    images: [
      'https://i.ebayimg.com/images/g/uNwAAOSw6zlkinx6/s-l400.jpg',
      'https://richsolar.com/cdn/shop/files/NOVA_MAX_3K_3000_Watt_3kW_24_Volt_Off-Grid_Hybrid_Solar_Inverter_4.jpg?v=1727340350&width=1214'
    ],
    description: 'Мощный инвертор 3000Вт для автономных солнечных систем. Преобразует постоянный ток 24В в переменный 220В с чистой синусоидой.',
    isPopular: true,
    specs: {
      'Мощность': '3000 Вт',
      'Входное напряжение': '24 В DC',
      'Выходное напряжение': '220 В AC',
      'Тип волны': 'Чистый синус',
      'Пиковая мощность': '6000 Вт',
      'КПД': '93%',
      'Вес': '10.5 кг',
      'Размеры': '400×300×120 мм',
      'Гарантия': '2 года'
    },
    relatedProducts: ['inv-002', 'sp-001', 'bat-001', 'cc-001']
  },
  {
    id: 'inv-002',
    name: 'Гибридный инвертор 5000Вт 48В',
    category: 'inverters',
    subcategory: 'Гибридные',
    price: 75000,
    rating: 4.9,
    reviews: 8,
    stock: 5,
    images: [
      'https://basket-15.wbbasket.ru/vol2206/part220692/220692803/images/big/1.webp',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuN9mZW7LrT7rJXLKtYpxyh_zecalcuEDPzA&s'
    ],
    description: 'Профессиональный гибридный инвертор 5000Вт для систем с подключением к сети. Поддерживает работу с аккумуляторами и без них.',
    isNew: true,
    specs: {
      'Мощность': '5000 Вт',
      'Входное напряжение': '48 В DC',
      'Выходное напряжение': '220 В AC',
      'Тип волны': 'Чистый синус',
      'Пиковая мощность': '10000 Вт',
      'КПД': '96%',
      'Вес': '18 кг',
      'Размеры': '500×330×145 мм',
      'Wi-Fi мониторинг': 'Да',
      'Гарантия': '5 лет'
    },
    relatedProducts: ['inv-001', 'sp-003', 'bat-001', 'cc-002']
  },
  {
    id: 'led-001',
    name: 'Светодиодная лампа 15Вт E27',
    category: 'led-lighting',
    subcategory: 'Лампы',
    price: 450,
    oldPrice: 590,
    rating: 4.6,
    reviews: 112,
    stock: 150,
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt6pSrFgR8LAAM_gFjso-8o6nVt_qObekmSw&s',
      'https://basket-01.wbbasket.ru/vol101/part10184/10184833/images/big/1.webp'
    ],
    description: 'Энергоэффективная светодиодная лампа 15Вт с цоколем E27. Яркий дневной свет, низкое потребление энергии и долгий срок службы.',
    isPopular: true,
    isDiscount: true,
    specs: {
      'Мощность': '15 Вт',
      'Цоколь': 'E27',
      'Световой поток': '1500 лм',
      'Цветовая температура': '4000K (дневной)',
      'Срок службы': '25000 часов',
      'Энергоэффективность': 'A++',
      'Диммирование': 'Нет',
      'Гарантия': '2 года'
    },
    relatedProducts: ['led-002', 'led-003', 'sp-001', 'bat-001']
  },
  {
    id: 'led-002',
    name: 'Светодиодный светильник на солнечной батарее 30Вт',
    category: 'led-lighting',
    subcategory: 'Уличные светильники',
    price: 3800,
    rating: 4.7,
    reviews: 34,
    stock: 23,
    images: [
      'https://ecshop.com.ua/imgs/b147642.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdspo968r-hj-ICjuid-HeMOFGpQHkpeXqRA&s'
    ],
    description: 'Автономный уличный светильник с солнечной панелью и датчиком движения. Идеален для освещения двора, сада, парковки без прокладки электрических кабелей.',
    isNew: true,
    specs: {
      'Мощность': '30 Вт',
      'Мощность солнечной панели': '6 Вт',
      'Ёмкость аккумулятора': '6000 мАч',
      'Световой поток': '3000 лм',
      'Угол освещения': '120°',
      'Датчик движения': 'Да',
      'Режимы работы': '3',
      'Защита': 'IP65',
      'Время работы': 'до 12 часов',
      'Гарантия': '2 года'
    },
    relatedProducts: ['led-001', 'led-003', 'sp-001', 'bat-002']
  },
  {
    id: 'led-003',
    name: 'Светодиодная лента 12В 14.4Вт/м',
    category: 'led-lighting',
    subcategory: 'Ленты',
    price: 850,
    rating: 4.8,
    reviews: 56,
    stock: 45,
    images: [
      'https://diodonline.ru/wa-data/public/shop/products/69/08/869/images/3201/3201.970.jpg',
      'https://72tsk.ru/wp-content/uploads/2021/09/4led_60led_spi.jpg'
    ],
    description: 'Гибкая светодиодная лента 12В, мощность 14.4 Вт/м. Используется для декоративной подсветки мебели, ниш, потолков и других элементов интерьера.',
    specs: {
      'Напряжение питания': '12 В DC',
      'Мощность': '14.4 Вт/м',
      'Количество светодиодов': '60 шт/м',
      'Длина катушки': '5 м',
      'Цветовая температура': '3000K (теплый белый)',
      'Класс защиты': 'IP20 (для внутреннего использования)',
      'Срок службы': '30000 часов',
      'Возможность диммирования': 'Да'
    },
    relatedProducts: ['led-001', 'led-002', 'inv-001', 'bat-002']
  },
  {
    id: 'cc-001',
    name: 'Контроллер заряда PWM 30A 12В/24В',
    category: 'charge-controllers',
    subcategory: 'PWM',
    price: 3200,
    rating: 4.5,
    reviews: 27,
    stock: 19,
    images: [
      'https://delta-paneli.ru/images/watermarked/1/detailed/2/Delta-2420L-9_vi98-xf.jpg',
      'https://reenergo.ru/wp-content/uploads/delta_pwm_l.jpg'
    ],
    description: 'Контроллер заряда с технологией PWM (широтно-импульсная модуляция) для солнечных панелей. Автоматически определяет напряжение системы 12В/24В.',
    specs: {
      'Тип': 'PWM',
      'Максимальный ток': '30A',
      'Напряжение системы': '12В/24В (автоопределение)',
      'Максимальное напряжение СБ': '50В',
      'USB-выход': '5В, 2A',
      'Защита': 'От перезаряда, переразряда, КЗ, перегрузки',
      'Дисплей': 'ЖК',
      'Размеры': '150×100×40 мм',
      'Вес': '350 г',
      'Гарантия': '2 года'
    },
    relatedProducts: ['cc-002', 'sp-001', 'bat-001', 'inv-001']
  },
  {
    id: 'cc-002',
    name: 'Контроллер заряда MPPT 40A 12В/24В/48В',
    category: 'charge-controllers',
    subcategory: 'MPPT',
    price: 12500,
    rating: 4.9,
    reviews: 15,
    stock: 7,
    images: [
      'https://ae04.alicdn.com/kf/HTB1gPFCNXXXXXXfXVXXq6xXFXXX2.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR05yc8DiDsKxx9T5eeKErOrJUWZwH0tmO3rw&s'
    ],
    description: 'Профессиональный контроллер заряда с технологией MPPT (отслеживание точки максимальной мощности). Повышает эффективность солнечных панелей до 30% по сравнению с PWM.',
    isNew: true,
    specs: {
      'Тип': 'MPPT',
      'Максимальный ток': '40A',
      'Напряжение системы': '12В/24В/48В (автоопределение)',
      'Максимальное напряжение СБ': '150В',
      'Эффективность преобразования': '≥99%',
      'Порт связи': 'RS485',
      'Дисплей': 'ЖК с подсветкой',
      'Размеры': '260×180×80 мм',
      'Вес': '4.2 кг',
      'Гарантия': '3 года'
    },
    relatedProducts: ['cc-001', 'sp-003', 'bat-001', 'inv-002']
  },
  {
    id: 'acc-001',
    name: 'Комплект кабелей для солнечных панелей',
    category: 'accessories',
    subcategory: 'Кабели',
    price: 2800,
    rating: 4.7,
    reviews: 31,
    stock: 25,
    images: [
      'https://goprokat.ua/image/cache/catalog/ecoplay/snimokekrana2023-05-24v14.25.371-1000x1000.png',
      'https://2e.ua/wp-content/uploads/2025/01/649af42518ec1_2e-asp-mc4-3t1-600x478.jpg'
    ],
    description: 'Комплект специализированных кабелей для подключения солнечных панелей. Двойная изоляция, устойчивость к УФ-излучению и температурным колебаниям.',
    specs: {
      'Тип кабеля': 'PV1-F',
      'Сечение': '6 мм²',
      'Длина': '2×5 метров',
      'Коннекторы': 'MC4',
      'Максимальное напряжение': '1000В DC',
      'Рабочая температура': '-40°C до +90°C',
      'Устойчивость к УФ': 'Да',
      'Гарантия': '2 года'
    },
    relatedProducts: ['acc-002', 'sp-001', 'cc-001', 'inv-001']
  },
  {
    id: 'acc-002',
    name: 'Крепления для солнечных панелей',
    category: 'accessories',
    subcategory: 'Крепления',
    price: 4500,
    rating: 4.6,
    reviews: 22,
    stock: 14,
    images: [
      'https://realsolar.ru/images/companies/4/icons/menu/solar-panel/banner_krepl_1.jpg',
      'https://green-energy.by/upload/resize_cache/iblock/fff/450_450_140cd750bba9870f18aada2478b24840a/kreplenie_solnechnih_batarey_na_krishu-2.jpg'
    ],
    description: 'Универсальные алюминиевые крепления для монтажа солнечных панелей на плоскую крышу. Регулируемый угол наклона для оптимальной выработки электроэнергии.',
    specs: {
      'Материал': 'Анодированный алюминий',
      'Тип установки': 'Для плоской крыши',
      'Регулировка угла': '20°-40°',
      'Максимальная нагрузка': '60 кг/м²',
      'Ветроустойчивость': 'до 160 км/ч',
      'Комплектация': '4 опоры, крепежные элементы',
      'Для панелей': 'до 2000×1000 мм',
      'Гарантия': '5 лет'
    },
    relatedProducts: ['acc-001', 'sp-001', 'sp-002', 'sp-003']
  }
];

export function getProductsByCategory(category: string) {
  return products.filter(product => product.category === category);
}

export function getPopularProducts() {
  return products.filter(product => product.isPopular);
}

export function getNewProducts() {
  return products.filter(product => product.isNew);
}

export function getDiscountProducts() {
  return products.filter(product => product.isDiscount);
}

export function getRelatedProducts(productId: string) {
  const product = products.find(p => p.id === productId);
  if (!product || !product.relatedProducts) return [];
  
  return products.filter(p => product.relatedProducts?.includes(p.id));
}

export function getProductById(id: string) {
  return products.find(product => product.id === id);
}

export function searchProducts(query: string) {
  const searchTerm = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm)
  );
}