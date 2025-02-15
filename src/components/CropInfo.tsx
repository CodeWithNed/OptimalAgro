import ProductCard from './components/ProductCard';
import ChatBot from './components/ChatBot';
import Auth from './pages/Auth';
import { Search, Filter } from 'lucide-react';

const mockProducts = [
  {
    id: '1',
    name: 'Premium Angus Beef Patties',
    description: 'High-quality, grass-fed Angus beef patties, perfect for gourmet burgers.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80',
    category: 'Meat',
    nutritionalInfo: {
      calories: 250,
      protein: 20,
      carbs: 0,
      fat: 20,
    },
    allergens: [],
    ingredients: ['Angus beef', 'Salt', 'Pepper'],
  },
  {
    id: '2',
    name: 'Organic Mixed Greens',
    description: 'Fresh, locally sourced organic mixed greens for salads and garnishes.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80',
    category: 'Produce',
    nutritionalInfo: {
      calories: 20,
      protein: 1,
      carbs: 4,
      fat: 0,
    },
    allergens: [],
    ingredients: ['Lettuce', 'Arugula', 'Spinach'],
  },
  {
    id: '3',
    name: 'Artisanal Sourdough Bread',
    description: 'Freshly baked artisanal sourdough bread made with organic flour.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80',
    category: 'Bakery',
    nutritionalInfo: {
      calories: 120,
      protein: 4,
      carbs: 23,
      fat: 0,
    },
    allergens: ['Gluten', 'Wheat'],
    ingredients: ['Flour', 'Water', 'Salt', 'Sourdough starter'],
  },
];