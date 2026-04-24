import Stripe from "stripe";
import Order from "../models/Order.js";

// Initialize Stripe. If no key is in .env, it uses a dummy string which will fail gracefully when attempting a real call.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_replace_me");

export async function createCheckoutSession(req, res) {
  try {
    const { orderId } = req.body;
    
    // Find the order that was just created
    const order = await Order.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Map order items to Stripe's line_items format
    const line_items = order.orderItems.map((item) => {
      return {
        price_data: {
          currency: "usd", // default to USD
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects amounts in cents
        },
        quantity: item.quantity,
      };
    });

    // If there is a discount, we have a few options in Stripe:
    // 1. Create a Stripe Coupon dynamically
    // 2. Add a negative line item (Stripe doesn't allow negative line items easily)
    // 3. Just deduct the discount proportionately from the items, OR add a single line item for the final total if we want to keep it simple.
    // For simplicity, if there's a discount, we'll override the line items and just charge a single "Order Total" item.
    let finalLineItems = line_items;
    
    if (order.discountAmount > 0) {
      finalLineItems = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Veloura Fashion Order (Discount Applied)",
              description: `Original total: $${(order.totalPrice + order.discountAmount).toFixed(2)}, Discount: -$${order.discountAmount.toFixed(2)}`,
            },
            unit_amount: Math.round(order.totalPrice * 100),
          },
          quantity: 1,
        }
      ];
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: finalLineItems,
      mode: "payment",
      success_url: `http://localhost:5173/order-success?session_id={CHECKOUT_SESSION_ID}&order_id=${order._id}`,
      cancel_url: `http://localhost:5173/checkout`, // Go back to checkout if canceled
      client_reference_id: order._id.toString(),
    });

    res.json({ id: session.id, url: session.url });

  } catch (error) {
    console.error("Stripe Session Error:", error.message);
    res.status(500).json({ error: "Failed to create Stripe session. Check if STRIPE_SECRET_KEY is valid in .env" });
  }
}

export async function verifySession(req, res) {
  try {
    const { session_id, order_id } = req.body;

    if (!session_id || !order_id) {
      return res.status(400).json({ error: "Missing session_id or order_id" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const order = await Order.findById(order_id);
      
      if (order && !order.isPaid) {
        order.isPaid = true;
        order.paidAt = Date.now();
        await order.save();
      }
      
      return res.json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ error: "Payment not completed" });
    }
  } catch (error) {
    console.error("Verify Session Error:", error.message);
    res.status(500).json({ error: "Failed to verify session" });
  }
}
