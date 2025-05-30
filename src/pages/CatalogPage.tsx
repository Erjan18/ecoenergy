import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import ProductGrid from '../components/ui/ProductGrid';
import { Product, ProductFilter } from '../types/product';
import { products, getProductsByCategory, searchProducts } from '../data/products';

export default function CatalogPage() {
  const { category } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search');

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilter>({});
  const [showFilters, setShowFilters] = useState(false);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedPower, setSelectedPower] = useState<string[]>([]);
  const [selectedVoltage, setSelectedVoltage] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('');

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Get power options for current category
  const getPowerOptions = () => {
    const options = new Set<string>();
    
    let categoryProducts = category 
      ? getProductsByCategory(category)
      : products;
      
    categoryProducts.forEach(product => {
      if (product.specs.Мощность) {
        options.add(product.specs.Мощность as string);
      }
    });
    
    return Array.from(options);
  };

  // Get voltage options for current category
  const getVoltageOptions = () => {
    const options = new Set<string>();
    
    let categoryProducts = category 
      ? getProductsByCategory(category)
      : products;
      
    categoryProducts.forEach(product => {
      const voltage = product.specs.Напряжение || product.specs['Входное напряжение'] || product.specs['Напряжение макс.'];
      if (voltage) {
        options.add(voltage as string);
      }
    });
    
    return Array.from(options);
  };

  // Apply filters to products
  const applyFilters = () => {
    // Start with all products or category-specific products
    let result = category 
      ? getProductsByCategory(category)
      : products;
      
    // Apply search query if exists
    if (searchQuery) {
      result = searchProducts(searchQuery);
    }
    
    // Apply price filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply power filter
    if (selectedPower.length > 0) {
      result = result.filter(product => 
        selectedPower.includes(product.specs.Мощность as string)
      );
    }
    
    // Apply voltage filter
    if (selectedVoltage.length > 0) {
      result = result.filter(product => {
        const voltage = product.specs.Напряжение || product.specs['Входное напряжение'] || product.specs['Напряжение макс.'];
        return voltage && selectedVoltage.includes(voltage as string);
      });
    }
    
    // Apply sorting
    if (sortOption) {
      switch (sortOption) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'popular':
          result.sort((a, b) => b.reviews - a.reviews);
          break;
        case 'new':
          // Sort by "isNew" first, then by id to ensure stable sorting
          result.sort((a, b) => {
            if (a.isNew && !b.isNew) return -1;
            if (!a.isNew && b.isNew) return 1;
            return 0;
          });
          break;
      }
    }
    
    setFilteredProducts(result);
  };

  // Get page title based on category
  const getPageTitle = () => {
    if (searchQuery) {
      return `Результаты поиска: ${searchQuery}`;
    }
    
    switch(category) {
      case 'solar-panels':
        return 'Солнечные панели';
      case 'batteries':
        return 'Аккумуляторы';
      case 'inverters':
        return 'Инверторы';
      case 'led-lighting':
        return 'LED-освещение';
      case 'charge-controllers':
        return 'Контроллеры заряда';
      case 'accessories':
        return 'Аксессуары';
      default:
        return 'Каталог товаров';
    }
  };

  // Initialize and apply filters when category or search changes
  useEffect(() => {
    const minPrice = Math.min(...products.map(p => p.price));
    const maxPrice = Math.max(...products.map(p => p.price));
    setPriceRange([minPrice, maxPrice]);
    
    applyFilters();
    
    // Update document title
    document.title = `${getPageTitle()} - ЭкоЭнергия`;
  }, [category, searchQuery]);

  // Reapply filters when filter options change
  useEffect(() => {
    applyFilters();
  }, [priceRange, selectedPower, selectedVoltage, selectedBrands, sortOption]);

  return (
    <div className="py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-medium mb-6">{getPageTitle()}</h1>
        
        <div className="lg:flex lg:gap-8">
          {/* Filters for larger screens */}
          <div className="lg:w-1/4 hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h3 className="font-medium text-lg mb-3">Цена (сом)</h3>
              <div className="flex items-center gap-2 mb-3">
                <input 
                  type="number" 
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                  placeholder="От"
                />
                <span>-</span>
                <input 
                  type="number" 
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                  placeholder="До"
                />
              </div>
            </div>
            
            {getPowerOptions().length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <h3 className="font-medium text-lg mb-3">Мощность</h3>
                <div className="space-y-2">
                  {getPowerOptions().map((power, index) => (
                    <label key={index} className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={selectedPower.includes(power)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPower([...selectedPower, power]);
                          } else {
                            setSelectedPower(selectedPower.filter(p => p !== power));
                          }
                        }}
                        className="mr-2"
                      />
                      <span>{power}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            {getVoltageOptions().length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <h3 className="font-medium text-lg mb-3">Напряжение</h3>
                <div className="space-y-2">
                  {getVoltageOptions().map((voltage, index) => (
                    <label key={index} className="flex items-center cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={selectedVoltage.includes(voltage)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedVoltage([...selectedVoltage, voltage]);
                          } else {
                            setSelectedVoltage(selectedVoltage.filter(v => v !== voltage));
                          }
                        }}
                        className="mr-2"
                      />
                      <span>{voltage}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Product listing */}
          <div className="lg:w-3/4">
            <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
              <button 
                onClick={toggleFilters}
                className="flex items-center gap-2 bg-white py-2 px-4 rounded border border-gray-300 lg:hidden"
              >
                <Filter className="h-4 w-4" />
                <span>Фильтры</span>
              </button>
              
              <div className="flex items-center">
                <label className="mr-2 whitespace-nowrap">Сортировать:</label>
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-gray-300 rounded py-2 px-3"
                >
                  <option value="">По умолчанию</option>
                  <option value="price-asc">Цена: по возрастанию</option>
                  <option value="price-desc">Цена: по убыванию</option>
                  <option value="popular">По популярности</option>
                  <option value="new">По новизне</option>
                </select>
              </div>
            </div>
            
            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden bg-white rounded-lg shadow-sm p-4 mb-4">
                <h3 className="font-medium text-lg mb-3">Цена (сом)</h3>
                <div className="flex items-center gap-2 mb-4">
                  <input 
                    type="number" 
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                    placeholder="От"
                  />
                  <span>-</span>
                  <input 
                    type="number" 
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
                    placeholder="До"
                  />
                </div>
                
                {getPowerOptions().length > 0 && (
                  <>
                    <h3 className="font-medium text-lg mb-3">Мощность</h3>
                    <div className="space-y-2 mb-4">
                      {getPowerOptions().map((power, index) => (
                        <label key={index} className="flex items-center cursor-pointer">
                          <input 
                            type="checkbox"
                            checked={selectedPower.includes(power)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPower([...selectedPower, power]);
                              } else {
                                setSelectedPower(selectedPower.filter(p => p !== power));
                              }
                            }}
                            className="mr-2"
                          />
                          <span>{power}</span>
                        </label>
                      ))}
                    </div>
                  </>
                )}
                
                {getVoltageOptions().length > 0 && (
                  <>
                    <h3 className="font-medium text-lg mb-3">Напряжение</h3>
                    <div className="space-y-2 mb-4">
                      {getVoltageOptions().map((voltage, index) => (
                        <label key={index} className="flex items-center cursor-pointer">
                          <input 
                            type="checkbox"
                            checked={selectedVoltage.includes(voltage)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedVoltage([...selectedVoltage, voltage]);
                              } else {
                                setSelectedVoltage(selectedVoltage.filter(v => v !== voltage));
                              }
                            }}
                            className="mr-2"
                          />
                          <span>{voltage}</span>
                        </label>
                      ))}
                    </div>
                  </>
                )}
                
                <div className="flex justify-between">
                  <button 
                    onClick={() => {
                      setPriceRange([0, 100000]);
                      setSelectedPower([]);
                      setSelectedVoltage([]);
                      setSelectedBrands([]);
                    }}
                    className="text-primary"
                  >
                    Сбросить все
                  </button>
                  <button 
                    onClick={toggleFilters}
                    className="btn btn-primary"
                  >
                    Применить
                  </button>
                </div>
              </div>
            )}
            
            <ProductGrid 
              products={filteredProducts} 
              emptyMessage={
                searchQuery 
                  ? `По запросу "${searchQuery}" ничего не найдено` 
                  : "Товары не найдены"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}