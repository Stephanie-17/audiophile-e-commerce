import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createOrder = mutation({
  args: {
    customer: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string() 
    }),
    shipping: v.object({
      address: v.string(),
      zipCode: v.string(), 
      city: v.string(),
      country: v.string()
    }),
    items: v.array(v.object({
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
      image: v.string()
    })),
    payment: v.object({
      method: v.string(),
      emoneyNumber: v.optional(v.string()),
      emoneyPin: v.optional(v.string()) 
    }),
    totals: v.object({ 
      subtotal: v.number(),
      shipping: v.number(),
      vat: v.number(),
      grandTotal: v.number()
    })
    
  },
  handler: async (ctx, args) => {
    const orderId = await ctx.db.insert("orders", {
      ...args,
      status: "confirmed", 
      timestamp: Date.now()
    });
    return orderId; 
  }
});