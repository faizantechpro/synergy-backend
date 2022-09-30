export const MainFilter = [
  {
    name: "Gender",
    children: [{ name: "Men" }, { name: "Women" }],
  },
  {
    name: "Category",
    children: [
      {
        name: "Women",
        children: [
          {
            title: "Top Categories",
            children: [
              { name: "Shirts, Tops & Tunics" },
              { name: "Tshirts" },
              { name: "Kurtas & Kurtis" },
            ],
          },
          {
            title: "All Categories",
            children: [
              { name: "Kurtas & Kurtis" },
              { name: "Shirts, Tops & Tunics" },
              { name: "Tshirts" },
            ],
          },
        ],
      },
      {
        name: "Men",
        children: [
          {
            title: "Top Categories",
            children: [{ name: "Tshirts" }],
          },
          {
            title: "All Categories",
            children: [{ name: "Tshirts" }],
          },
        ],
      },
    ],
  },
  {
    name: "Price",
    children: [
      { name: "Below Rs. 500" },
      { name: "Rs. 500 - 1000 " },
      { name: "Rs. 1001 - 1500" },
      { name: "Rs. 1501 - 2000" },
      { name: "Rs. 2001 - 2500" },
      { name: "Rs. 2501 - 5000" },
      { name: "Rs. 2501 - 5000" },
    ],
  },
  {
    name: "Brands",
    children: [
      {
        title: "Popular Brands",
        children: [
          { name: "Vero Moda" },
          { name: "Indiweaves" },
          { name: "Mayra" },
          { name: "MAX" },
          { name: "Marks & Spencer" },
        ],
      },
      {
        title: "#",
        children: [{ name: "250 Designs" }, { name: "9 Impressions" }],
      },
      {
        title: "A",
        children: [
          { name: "Aaara" },
          { name: "Adidas" },
          { name: "Adidas Originals" },
        ],
      },
    ],
  },
  {
    name: "Discount",
    children: [
      { name: "0 - 20%" },
      { name: "21 - 30%" },
      { name: "31 - 40%" },
      { name: "41 - 50%" },
      { name: "51 - 80%" },
      { name: "81 - 100%" },
    ],
  },
  {
    name: "Colors",
    children: [
      { name: "Aqua" },
      { name: "Beige" },
      { name: "Black" },
      { name: "Blue" },
      { name: "Cream" },
      { name: "Green" },
      { name: "Khaki" },
      { name: "Lavender" },
      { name: "Magenta" },
      { name: "Olive" },
      { name: "Pink" },
      { name: "Purple" },
      { name: "Wine" },
      { name: "Yellow" },
    ],
  },
  {
    name: "Size & Fit",
    children: [
      { name: "M" },
      { name: "S" },
      { name: "L" },
      { name: "XL" },
      { name: "XS" },
      { name: "XXL" },
      { name: "XXS" },
    ],
  },
];
