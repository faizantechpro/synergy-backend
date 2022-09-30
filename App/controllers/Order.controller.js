import Stripe from "stripe";
import { fakeOrders } from "../../helper/order.js";
import { defautlResponse, errorResponse } from "../../helper/utils.js";
import { Cart } from "../models/Cart.model.js";
import { Order } from "../models/Order.model.js";
import { Product } from "../models/Product.model.js";

const stripe = Stripe("sk_test_dFuOrcS0YpLkXZ8F2nDq3Sxy00vLWCOkle");

export const PlaceOrder = async (req, res) => {
  try {
    const me = req.user;
    if (req.body.paymentMethod === "cod") {
      const cart = await Cart.findOne({ userId: me._id });
      const products = cart.toJSON().products;
      const orders = await Order.create({
        userId: me._id,
        products: products,
        address: cart.address,
      });
      // const orders = [];
      // req.body.cartItems.map((item) => {
      //   const order = Order.create({
      //     userId: me._id,
      //     products: [
      //       {
      //         product: item.id,
      //         quantity: item.quantity,
      //       },
      //     ],
      // });
      // orders.push(order);
      // });
      await Cart.findOneAndUpdate(
        { userId: me._id },
        { $set: { products: [] } }
      );
      const resOrders = await orders.populate(["address", "products.product"]);
      return defautlResponse({ res, response: resOrders });
    } else {
      const YOUR_DOMAIN = "http://synergy.surf";

      const line_items = req.body.cartItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              //   images: [item.image[0]],
              //   description: item.desc,
              metadata: {
                id: item.id,
              },
            },
            unit_amount: item.price * 100,
          },
          quantity: item.cartQuantity,
        };
      });
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US", "CA", "KE"],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 0,
                currency: "usd",
              },
              display_name: "Free shipping",
              // Delivers between 5-7 business days
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 5,
                },
                maximum: {
                  unit: "business_day",
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1500,
                currency: "usd",
              },
              display_name: "Next day air",
              // Delivers in exactly 1 business day
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 1,
                },
              },
            },
          },
        ],
        line_items,
        mode: "payment",
        success_url: `${YOUR_DOMAIN}/checkout?success=true`,
        cancel_url: `${YOUR_DOMAIN}/checkout?canceled=true`,
      });

      res.status(303).json(session);
    }
  } catch (err) {
    console.log("err", err);
    return errorResponse({ res, response: err });
  }
};

export const ChangeOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    return defautlResponse({ res, response: order });
  } catch (err) {
    console.log("err", err);
    return errorResponse({ res, response: err });
  }
};

export const filterOrders = async (req, res) => {
  try {
    const { status } = req.params;
    if (status === "all") {
      const orders = await Order.find({});
      return defautlResponse({ res, response: orders });
    } else {
      const orders = await Order.find({ status });
      return defautlResponse({ res, response: orders });
    }
  } catch (err) {
    console.log("err", err);
    return errorResponse({ res, response: err });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    // const { id } = req.params;
    // const orders = await Order.find({storeId:id})
    return defautlResponse({ res, response: fakeOrders });
  } catch (err) {
    console.log("err", err);
    return errorResponse({ res, response: err });
  }
};

export const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    // const order = await Order.findById(id)
    const order = fakeOrders.filter((data) => data._id == id);
    return defautlResponse({ res, response: order });
  } catch (err) {
    console.log("err", err);
    return errorResponse({ res, response: err });
  }
};

export const getPaymentMethodList = async (req, res) => {
  try {
    const list = [
      "Cash on Delivery",
      "Credit / Debit Card",
      "Net Banking",
      "Wallet",
      "Cryptocurrency",
    ];

    defautlResponse({ res, response: list });
  } catch (err) {
    console.log("err", err);
    errorResponse({ res, response: err });
  }
};
