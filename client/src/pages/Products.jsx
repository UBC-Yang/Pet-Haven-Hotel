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
    <main className="mt-16 p-4 pt-20 bg-gray-800 text-gray-300"> {/* Updated background and text color */}
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center text-cyan-600 shadow-lg">Our Products</h1> {/* Updated title color */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="rounded-lg shadow-md bg-gray-800 p-4">
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover rounded-t-lg"
              />
              <h2 className="text-4xl font-semibold mt-4 text-cyan-600">{product.name}</h2> {/* Updated font size and color */}
              <p className="mt-2 text-gray-400">{product.description}</p> {/* Adjusted text color */}
              <p className="text-lg font-bold mt-4 text-cyan-600">{product.price}</p> {/* Updated price color */}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Products;