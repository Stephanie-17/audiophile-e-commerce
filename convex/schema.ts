import { defineTable,defineSchema } from "convex/server";
import {v} from "convex/values"

export default defineSchema ({
orders: defineTable({
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
    }),
  status: v.string(),
  timestamp: v.number()
})


})
