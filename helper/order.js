export const fakeOrders = [
  {
    _id: 1,
    products: [
      {
        product: {
          _id: 1,
          productName: "Tent",
          content: [
            {
              url: "https://images.pexels.com/photos/2582818/pexels-photo-2582818.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "Yellow",
        size: "Small",
        quantity: 2,
        price: 12,
        total: 24,
      },
      {
        product: {
          _id: 5,
          productName: "Red Dress",
          content: [
            {
              url: "https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "Red",
        size: "Small",
        quantity: 2,
        price: 50,
        total: 100,
      },
      {
        product: {
          _id: 4,
          productName: "Blue Dress",
          content: [
            {
              url: "https://images.pexels.com/photos/904117/pexels-photo-904117.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "Blue",
        size: "Small",
        quantity: 1,
        price: 20,
        total: 20,
      },
    ],
    items: 3,
    totalQuantity: 5,
    subTotal: 144,
    shippingCharges: 10,
    amountPayable: 154,
    status: "pending",
    isPaid: false,
    customerDetails: {
      name: "Mahrukh",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
  {
    _id: 2,
    products: [
      {
        product: {
          _id: 3,
          productName: "Hat",
          content: [
            {
              url: "https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "White",
        size: "Small",
        quantity: 2,
        price: 12,
        total: 24,
      },
    ],
    items: 1,
    totalQuantity: 2,
    subTotal: 24,
    shippingCharges: 10,
    amountPayable: 34,
    status: "pending",
    isPaid: false,
    customerDetails: {
      name: "Momina",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
  {
    _id: 3,
    products: [
      {
        product: {
          _id: 2,
          productName: "Decoration Shelf",
          content: [
            {
              url: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "Blue",
        size: "Small",
        quantity: 1,
        price: 22,
        total: 44,
      },
    ],
    items: 1,
    totalQuantity: 1,
    subTotal: 44,
    shippingCharges: 10,
    amountPayable: 54,
    status: "pending",
    isPaid: false,
    customerDetails: {
      name: "Afraz",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
  {
    _id: 4,
    products: [
      {
        product: {
          _id: 9,
          productName: "Clay Pot",
          content: [
            {
              url: "https://images.pexels.com/photos/4207790/pexels-photo-4207790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
          ],
        },
        variant: "Blue",
        size: "Small",
        quantity: 1,
        price: 20,
        total: 20,
      },
    ],
    items: 1,
    totalQuantity: 1,
    subTotal: 20,
    shippingCharges: 10,
    amountPayable: 30,
    status: "pending",
    isPaid: false,
    customerDetails: {
      name: "Muhammad Abdulah",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
  {
    _id: 5,
    products: [
      {
        product: {
          _id: 6,
          productName: "Shoes",
          content: [
            {
              url: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "Skin",
        size: "Small",
        quantity: 2,
        price: 50,
        total: 100,
      },
      {
        product: {
          _id: 7,
          productName: "Red high Heels",
          content: [
            {
              url: "https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "Blue",
        size: "Small",
        quantity: 1,
        price: 120,
        total: 120,
      },
    ],
    items: 2,
    totalQuantity: 3,
    subTotal: 220,
    shippingCharges: 10,
    amountPayable: 230,
    status: "pending",
    isPaid: false,
    customerDetails: {
      name: "Muhammad Hamza",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
  {
    _id: 6,
    products: [
      {
        product: {
          _id: 8,
          productName: "Bag",
          content: [
            {
              url: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "Yellow",
        size: "Small",
        quantity: 2,
        price: 12,
        total: 24,
      },
    ],
    items: 1,
    totalQuantity: 2,
    subTotal: 24,
    shippingCharges: 10,
    amountPayable: 34,
    status: "accepted",
    isPaid: false,
    customerDetails: {
      name: "Muhammad Ali",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
  {
    _id: 7,
    products: [
      {
        product: {
          _id: 3,
          productName: "Hat",
          content: [
            {
              url: "https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "White",
        size: "Small",
        quantity: 2,
        price: 12,
        total: 24,
      },
    ],
    items: 1,
    totalQuantity: 2,
    subTotal: 24,
    shippingCharges: 10,
    amountPayable: 34,
    status: "accepted",
    isPaid: false,
    customerDetails: {
      name: "Muhammad Faizan",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
  {
    _id: 8,
    products: [
      {
        product: {
          _id: 2,
          productName: "Decoration Shelf",
          content: [
            {
              url: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "Blue",
        size: "Small",
        quantity: 1,
        price: 22,
        total: 44,
      },
    ],
    items: 1,
    totalQuantity: 1,
    subTotal: 44,
    shippingCharges: 10,
    amountPayable: 54,
    status: "accepted",
    isPaid: false,
    customerDetails: {
      name: "Afraz",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
  {
    _id: 9,
    products: [
      {
        product: {
          _id: 9,
          productName: "Clay Pot",
          content: [
            {
              url: "https://images.pexels.com/photos/4207790/pexels-photo-4207790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
          ],
        },
        variant: "Blue",
        size: "Small",
        quantity: 1,
        price: 20,
        total: 20,
      },
    ],
    items: 1,
    totalQuantity: 1,
    subTotal: 20,
    shippingCharges: 10,
    amountPayable: 30,
    status: "accepted",
    isPaid: false,
    customerDetails: {
      name: "Muhammad Hamza",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
  {
    _id: 10,
    products: [
      {
        product: {
          _id: 6,
          productName: "Shoes",
          content: [
            {
              url: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "Skin",
        size: "Small",
        quantity: 2,
        price: 50,
        total: 100,
      },
      {
        product: {
          _id: 7,
          productName: "Red high Heels",
          content: [
            {
              url: "https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "Blue",
        size: "Small",
        quantity: 1,
        price: 120,
        total: 120,
      },
    ],
    items: 2,
    totalQuantity: 3,
    subTotal: 220,
    shippingCharges: 10,
    amountPayable: 230,
    status: "accepted",
    isPaid: false,
    customerDetails: {
      name: "Muhammad Hamza",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },

  {
    _id: 11,
    products: [
      {
        product: {
          _id: 8,
          productName: "Bag",
          content: [
            {
              url: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "Yellow",
        size: "Small",
        quantity: 2,
        price: 12,
        total: 24,
      },
    ],
    items: 1,
    totalQuantity: 2,
    subTotal: 24,
    shippingCharges: 10,
    amountPayable: 34,
    status: "shipped",
    isPaid: true,
    customerDetails: {
      name: "Muhammad Ali",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
  {
    _id: 12,
    products: [
      {
        product: {
          _id: 3,
          productName: "Hat",
          content: [
            {
              url: "https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "White",
        size: "Small",
        quantity: 2,
        price: 12,
        total: 24,
      },
    ],
    items: 1,
    totalQuantity: 2,
    subTotal: 24,
    shippingCharges: 10,
    amountPayable: 34,
    status: "shipped",
    isPaid: true,
    customerDetails: {
      name: "Muhammad Faizan",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
  {
    _id: 13,
    products: [
      {
        product: {
          _id: 2,
          productName: "Decoration Shelf",
          content: [
            {
              url: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "Blue",
        size: "Small",
        quantity: 1,
        price: 22,
        total: 44,
      },
    ],
    items: 1,
    totalQuantity: 1,
    subTotal: 44,
    shippingCharges: 10,
    amountPayable: 54,
    status: "shipped",
    isPaid: true,
    customerDetails: {
      name: "Afraz",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
  {
    _id: 14,
    products: [
      {
        product: {
          _id: 9,
          productName: "Clay Pot",
          content: [
            {
              url: "https://images.pexels.com/photos/4207790/pexels-photo-4207790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
          ],
        },
        variant: "Blue",
        size: "Small",
        quantity: 1,
        price: 20,
        total: 20,
      },
    ],
    items: 1,
    totalQuantity: 1,
    subTotal: 20,
    shippingCharges: 10,
    amountPayable: 30,
    status: "shipped",
    isPaid: true,
    customerDetails: {
      name: "Muhammad Hamza",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
  {
    _id: 15,
    products: [
      {
        product: {
          _id: 6,
          productName: "Shoes",
          content: [
            {
              url: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "Skin",
        size: "Small",
        quantity: 2,
        price: 50,
        total: 100,
      },
      {
        product: {
          _id: 7,
          productName: "Red high Heels",
          content: [
            {
              url: "https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "Blue",
        size: "Small",
        quantity: 1,
        price: 120,
        total: 120,
      },
    ],
    items: 2,
    totalQuantity: 3,
    subTotal: 220,
    shippingCharges: 10,
    amountPayable: 230,
    status: "shipped",
    isPaid: true,
    customerDetails: {
      name: "Muhammad Hamza",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
  {
    _id: 16,
    products: [
      {
        product: {
          _id: 8,
          productName: "Bag",
          content: [
            {
              url: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "Yellow",
        size: "Small",
        quantity: 2,
        price: 12,
        total: 24,
      },
    ],
    items: 1,
    totalQuantity: 2,
    subTotal: 24,
    shippingCharges: 10,
    amountPayable: 34,
    status: "Delivered",
    isPaid: true,
    customerDetails: {
      name: "Muhammad Ali",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
  {
    _id: 17,
    products: [
      {
        product: {
          _id: 3,
          productName: "Hat",
          content: [
            {
              url: "https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "White",
        size: "Small",
        quantity: 2,
        price: 12,
        total: 24,
      },
    ],
    items: 1,
    totalQuantity: 2,
    subTotal: 24,
    shippingCharges: 10,
    amountPayable: 34,
    status: "Delivered",
    isPaid: true,
    customerDetails: {
      name: "Muhammad Faizan",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
  {
    _id: 18,
    products: [
      {
        product: {
          _id: 2,
          productName: "Decoration Shelf",
          content: [
            {
              url: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "Blue",
        size: "Small",
        quantity: 1,
        price: 22,
        total: 44,
      },
    ],
    items: 1,
    totalQuantity: 1,
    subTotal: 44,
    shippingCharges: 10,
    amountPayable: 54,
    status: "Delivered",
    isPaid: true,
    customerDetails: {
      name: "Afraz",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
  {
    _id: 19,
    products: [
      {
        product: {
          _id: 9,
          productName: "Clay Pot",
          content: [
            {
              url: "https://images.pexels.com/photos/4207790/pexels-photo-4207790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            },
          ],
        },
        variant: "Blue",
        size: "Small",
        quantity: 1,
        price: 20,
        total: 20,
      },
    ],
    items: 1,
    totalQuantity: 1,
    subTotal: 20,
    shippingCharges: 10,
    amountPayable: 30,
    status: "Delivered",
    isPaid: true,
    customerDetails: {
      name: "Muhammad Hamza",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
  {
    _id: 20,
    products: [
      {
        product: {
          _id: 6,
          productName: "Shoes",
          content: [
            {
              url: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "Skin",
        size: "Small",
        quantity: 2,
        price: 50,
        total: 100,
      },
      {
        product: {
          _id: 7,
          productName: "Red high Heels",
          content: [
            {
              url: "https://images.pexels.com/photos/336372/pexels-photo-336372.jpeg?auto=compress&cs=tinysrgb&w=400",
            },
          ],
        },
        variant: "Blue",
        size: "Small",
        quantity: 1,
        price: 120,
        total: 120,
      },
    ],
    items: 2,
    totalQuantity: 3,
    subTotal: 220,
    shippingCharges: 10,
    amountPayable: 230,
    status: "Delivered",
    isPaid: true,
    customerDetails: {
      name: "Muhammad Hamza",
      mobile: "+92 3214567890",
      address: "Model Town",
      pincode: "53000",
      city: "Lahore",
      paymentMethod: "Cash on Delivery",
    },
  },
];
