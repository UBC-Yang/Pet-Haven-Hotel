import React from 'react';

const products = [
  {
    id: 1,
    name: 'Shampoo and Conditioner',
    description: 'A gentle shampoo for sensitive pet skin.',
    price: '$20',
    image: '/images/shampoo-conditioner.png',
  },
  {
    id: 2,
    name: 'Detangling Spray',
    description: 'Leave-in conditioner for silky smooth fur.',
    price: '$15',
    image: '/images/detangling-spray.png',
  },
  {
    id: 3,
    name: 'Toothpaste',
    description: 'Toothpaste for fresh breath and healthy teeth.',
    price: '$10',
    image: '/images/toothpaste.png',
  },
  // Add more products as needed
];

const Products = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover rounded-t-lg"
            />
            <h2 className="text-2xl font-semibold mt-4">{product.name}</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
            <p className="text-lg font-bold mt-4">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
