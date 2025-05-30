import { Link } from 'react-router-dom';
import { PhoneCall, Mail, MapPin, Facebook, Instagram, Youtube, SunMedium } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <SunMedium className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-white">ЭкоЭнергия</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Ваш надежный поставщик оборудования для альтернативных источников энергии в Кыргызстане.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Категории</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog/solar-panels" className="text-gray-300 hover:text-primary transition-colors">
                  Солнечные панели
                </Link>
              </li>
              <li>
                <Link to="/catalog/batteries" className="text-gray-300 hover:text-primary transition-colors">
                  Аккумуляторы
                </Link>
              </li>
              <li>
                <Link to="/catalog/inverters" className="text-gray-300 hover:text-primary transition-colors">
                  Инверторы
                </Link>
              </li>
              <li>
                <Link to="/catalog/led-lighting" className="text-gray-300 hover:text-primary transition-colors">
                  LED-освещение
                </Link>
              </li>
              <li>
                <Link to="/catalog/charge-controllers" className="text-gray-300 hover:text-primary transition-colors">
                  Контроллеры заряда
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="text-gray-300 hover:text-primary transition-colors">
                  Доставка и оплата
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-gray-300 hover:text-primary transition-colors">
                  Гарантия
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-primary transition-colors">
                  Блог
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-gray-300 hover:text-primary transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">г. Бишкек, ул. Панфилова 333</span>
              </li>
              <li className="flex items-center space-x-3">
                <PhoneCall className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+996555123456" className="text-gray-300 hover:text-primary transition-colors">
                  +996 (555) 111-000
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:info@ecoenergy.kg" className="text-gray-300 hover:text-primary transition-colors">
                  info@ecoenergy.kg
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} ЭкоЭнергия. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}