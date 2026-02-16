# Ryder - Electric Bike Rental Platform

A modern web application for electric bike rentals, specifically designed for food delivery services in Poland.

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Beautiful icons

### Backend (To be implemented)
- **Spring Boot** - Java framework
- **PostgreSQL** - Database
- **REST API** - Communication layer

## 📋 Features

- ✅ Modern, clean UI with Ryder brand colors
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Hero section with key features
- ✅ Special offers section
- ✅ Bike catalog with specifications
- ✅ Professional header and footer
- 🔄 Multi-language support (English, Polish, Turkish) - Coming soon
- 🔄 User authentication - Coming soon
- 🔄 Booking system - Coming soon
- 🔄 Payment integration - Coming soon

## 🎨 Design

The application uses Ryder's signature green color (#00D100) throughout the interface, creating a cohesive and energetic brand experience.

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Extract the project files**
   ```bash
   # Navigate to the project directory
   cd ryder-rental
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - You should see the Ryder homepage!

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
ryder-rental/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── Header.tsx  # Navigation header
│   │   ├── Hero.tsx    # Hero section
│   │   ├── SpecialOffers.tsx
│   │   ├── Bikes.tsx   # Bike catalog
│   │   └── Footer.tsx
│   ├── pages/          # Page components
│   │   └── Home.tsx
│   ├── lib/            # Utility functions
│   │   └── utils.ts
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── index.html
├── package.json
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🎯 Next Steps

### Frontend Development
1. Add routing with React Router (already installed)
2. Create additional pages:
   - Bike details page
   - Pricing page
   - About page
   - Contact page
   - User dashboard
3. Implement authentication UI
4. Add booking/reservation flow
5. Integrate with backend API

### Backend Development
1. Set up Spring Boot project
2. Configure PostgreSQL database
3. Create database schema:
   - Users
   - Bikes
   - Bookings
   - Payments
   - Special offers
4. Implement REST API endpoints
5. Add authentication & authorization
6. Implement business logic

### Integration
1. Connect frontend to backend API
2. Handle API errors gracefully
3. Add loading states
4. Implement real-time updates
5. Add payment gateway integration

## 🌐 Multi-language Support (Planned)

The application will support:
- 🇬🇧 English (Default)
- 🇵🇱 Polish
- 🇹🇷 Turkish

## 🔧 Customization

### Changing Colors
Edit `src/index.css` to modify the color scheme. The primary green color is defined as:
```css
--primary: 120 100% 41%; /* Ryder Green */
```

### Adding Components
Use shadcn/ui to add more components:
```bash
npx shadcn-ui@latest add [component-name]
```

## 📝 Environment Variables (Future)

Create a `.env` file for environment-specific settings:
```env
VITE_API_URL=http://localhost:8080/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
```

## 🐛 Common Issues

### Port already in use
If port 5173 is busy, Vite will automatically use the next available port.

### Module not found
Make sure all dependencies are installed:
```bash
npm install
```

## 📄 License

This project is proprietary software for Ryder.

## 👥 Contributing

This is a private project. For questions or contributions, please contact the development team.

## 📞 Contact

For support or inquiries:
- Email: support@ryder.pl
- Phone: +48 123 456 789

---

Built with ❤️ for food delivery professionals in Poland
