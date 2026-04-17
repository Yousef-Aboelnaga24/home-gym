export const products = [
  {
    id: '1',
    name: 'Pro-Adjustable Dumbbell Set',
    price: 399.99,
    category: 'Weights',
    type: 'Dumbbells',
    description: 'Sleek modern adjustable dumbbell set with advanced locking mechanism. Replaces 15 sets of weights.',
    image: '/images/dumbbell.png',
    rating: 4.8,
    reviews: 124,
    spaceRequired: 'small', // small, medium, large
    budgetLevel: 'mid' // low, mid, high
  },
  {
    id: '2',
    name: 'Stealth Treadmill T-100',
    price: 1299.99,
    category: 'Machines',
    type: 'Cardio',
    description: 'High-tech black treadmill with smart display, yellow accent line, and shock absorption.',
    image: '/images/treadmill.png',
    rating: 4.9,
    reviews: 89,
    spaceRequired: 'large',
    budgetLevel: 'high'
  },
  {
    id: '3',
    name: 'Titan Heavy-Duty Bench',
    price: 249.99,
    category: 'Racks & Benches',
    type: 'Benches',
    description: 'Adjustable weight bench made from high-strength steel. Features black leather with yellow stitching.',
    image: '/images/bench.png',
    rating: 4.7,
    reviews: 210,
    spaceRequired: 'medium',
    budgetLevel: 'mid'
  },
  {
    id: '4',
    name: 'Basic Kettlebell 16kg',
    price: 49.99,
    category: 'Weights',
    type: 'Kettlebells',
    description: 'Solid cast iron kettlebell with wide handle for a comfortable grip.',
    image: '/images/dumbbell.png', // reusing image for mockup
    rating: 4.5,
    reviews: 42,
    spaceRequired: 'small',
    budgetLevel: 'low'
  },
  {
    id: '5',
    name: 'Compact Power Rack',
    price: 599.99,
    category: 'Racks & Benches',
    type: 'Racks',
    description: 'Space-saving power rack with pull-up bar, J-hooks, and solid safety pins.',
    image: '/images/bench.png', // reusing image mock
    rating: 4.6,
    reviews: 67,
    spaceRequired: 'large',
    budgetLevel: 'mid'
  },
  {
    id: '6',
    name: 'Resistance Bands Set',
    price: 29.99,
    category: 'Accessories',
    type: 'Bands',
    description: 'Set of 5 premium resistance bands with door anchor and carrying bag.',
    image: '/images/dumbbell.png', 
    rating: 4.8,
    reviews: 350,
    spaceRequired: 'small',
    budgetLevel: 'low'
  },
  {
    id: '7',
    name: 'Smart Rower V2',
    price: 899.99,
    category: 'Machines',
    type: 'Cardio',
    description: 'Magnetic resistance rowing machine with interactive app connectivity.',
    image: '/images/treadmill.png',
    rating: 4.9,
    reviews: 112,
    spaceRequired: 'medium',
    budgetLevel: 'high'
  },
  {
    id: '8',
    name: 'Olympic Barbell & Plates Set',
    price: 499.99,
    category: 'Weights',
    type: 'Barbells',
    description: '20kg Olympic barbell with 100kg of bumper plates.',
    image: '/images/bench.png',
    rating: 4.8,
    reviews: 75,
    spaceRequired: 'medium',
    budgetLevel: 'mid'
  }
];

export const bundles = [
  {
    id: 'b1',
    name: 'Starter Apartment Gym',
    description: 'Perfect for small spaces and low budgets. Focuses on bodyweight resistance and versatile free weights.',
    price: 429.98,
    products: ['1', '6'], // Dumbbells, Bands
    space: 'small',
    budget: 'low'
  },
  {
    id: 'b2',
    name: 'Balanced Home Gym Pack',
    description: 'Everything you need for a complete workout without taking over the garage.',
    price: 1149.97,
    products: ['1', '3', '8'], // Dumbbells, Bench, Barbell Set
    space: 'medium',
    budget: 'mid'
  },
  {
    id: 'b3',
    name: 'Ultimate Garage Setup',
    description: 'Transform your garage into a professional studio with top-of-the-line equipment.',
    price: 2149.97,
    products: ['2', '5', '3'], // Treadmill, Power Rack, Bench
    space: 'large',
    budget: 'high'
  }
];
