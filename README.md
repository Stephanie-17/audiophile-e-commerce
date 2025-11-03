## 📋 **README.md**

```markdown
# 🎧 Audiophile E-commerce Website

A pixel-perfect, responsive e-commerce website for high-end audio equipment, built with Next.js, TypeScript, and Convex.

## 🚀 Live Demo
[Deployed on Vercel](https://audiophile-e-commerce-lovat.vercel.app/) 



## 🛠 Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Convex (Database & Real-time)
- **State Management:** React Context API
- **Emails:** Resend API
- **Deployment:** Vercel

## ✨ Features

### 🎯 Core Requirements
- ✅ Pixel-perfect implementation from Figma design
- ✅ Responsive across mobile, tablet, and desktop
- ✅ Complete checkout flow with form validation
- ✅ Order storage in Convex backend
- ✅ Order confirmation emails
- ✅ Accessible and screen-reader friendly

### 🛒 E-commerce Features
- **Product Catalog:** Dynamic category and product pages
- **Shopping Cart:** Add/remove items, quantity management
- **Checkout Process:** Multi-step form with validation
- **Order Management:** Order confirmation and email notifications
- **Responsive Design:** Mobile-first approach

### 📧 Email System
- Order confirmation emails with HTML templates
- Personalized customer information
- Order summary and shipping details
- Responsive email design

## 🏗 Project Structure


audiophile/
├── app/                    # Next.js App Router
│   ├── category/          # Dynamic category pages
│   │   └── [category]/    
│   ├── product/           # Dynamic product pages  
│   │   └── [slug]/
│   ├── checkout/          # Checkout flow
│   ├── order-confirmation/ # Order success page
│   └── context/           # React Context for state
├── components/            # Reusable UI components
├── convex/               # Backend schema & mutations
│   ├── schema.ts
│   ├── orders.ts
│   └── _generated/
└── public/              # Static assets


## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Convex account
- Resend account (for emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Stephanie-17/audiophile-ecommerce.git
   cd audiophile-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your credentials:
   ```env
   NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Set up Convex**
   ```bash
   npx convex dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production
```env
NEXT_PUBLIC_CONVEX_URL=your_production_convex_url
RESEND_API_KEY=your_production_resend_key
```

## 🎯 HNG Internship Requirements

This project fulfills Stage 3a requirements:
- ✅ Pixel-perfect Figma implementation
- ✅ React/Next.js with TypeScript
- ✅ Convex backend integration
- ✅ Functional checkout with validation
- ✅ Order storage in database
- ✅ Confirmation email system
- ✅ Responsive design
- ✅ Accessibility compliance

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

```

