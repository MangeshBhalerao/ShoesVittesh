import { PrismaClient, Gender } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "Air Max Revolution",
      brand: "Nike",
      description: "Cushioned running sneaker with breathable mesh and bold Air unit.",
      gender: Gender.MEN,
      price: 129.99,
      originalPrice: 159.99,
      rating: 4.8,
      reviews: 124,
      image: "/nike-air-max-sneakers-white-and-blue.jpg",
      colors: ["White/Blue", "Black/Red", "Gray/Green"],
      isFeatured: true,
      isOnSale: true,
      isPopular: true,
    },
    {
      name: "Ultra Boost 22",
      brand: "Adidas",
      description: "Responsive everyday runner with plush Boost cushioning.",
      gender: Gender.MEN,
      price: 189.99,
      originalPrice: 0,
      rating: 4.9,
      reviews: 89,
      image: "/adidas-ultra-boost-sneakers-black-and-white.jpg",
      colors: ["Black/White", "Navy/Orange", "Gray/Pink"],
      isFeatured: true,
      isOnSale: false,
      isPopular: true,
    },
    {
      name: "Chuck Taylor All Star Platform",
      brand: "Converse",
      description: "Iconic canvas high-top with a modern platform twist.",
      gender: Gender.WOMEN,
      price: 79.99,
      originalPrice: 0,
      rating: 4.7,
      reviews: 256,
      image: "/converse-chuck-taylor-sneakers-classic-red.jpg",
      colors: ["Red", "Black", "White", "Navy"],
      isFeatured: true,
      isOnSale: false,
      isPopular: true,
    },
    {
      name: "Old Skool Pro",
      brand: "Vans",
      description: "Suede and canvas skate classic with reinforced cushioning.",
      gender: Gender.UNISEX,
      price: 89.99,
      originalPrice: 0,
      rating: 4.7,
      reviews: 178,
      image: "/vans-old-skool-sneakers-black-and-white-stripe.jpg",
      colors: ["Black/White", "Navy/Gum", "Burgundy/White"],
      isFeatured: true,
      isOnSale: false,
      isPopular: true,
    },
  ];

  for (const data of products) {
    await prisma.product.create({ data });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

