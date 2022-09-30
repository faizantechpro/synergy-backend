import Stripe from "stripe";
import { Order } from "../models/Order.model.js";
import { Product } from "../models/Product.model.js";

const stripe = Stripe("sk_test_dFuOrcS0YpLkXZ8F2nDq3Sxy00vLWCOkle");

export const createCheckoutSession = async (req, res) => {
  try {
    const me = req.user;
    if (req.body.paymentMethod === "cod") {
      const order = Order.create({
        userId: me._id,
        products: [
          {
            product: req.body.cartItems.id,
            quantity: req.body.cartItems.quantity,
          },
        ],
      });
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
    console.error(err);
    return res.status(500).json({
      error: err,
      message: "Internal server error",
    });
  }
};
