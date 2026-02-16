# Quick Start Guide

## Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to `http://localhost:5173`

## What's Included

✅ **Home Page** with hero section, special offers, and bike catalog
✅ **Ryder Brand Colors** (#00D100 green theme)
✅ **Responsive Design** works on all devices
✅ **shadcn/ui Components** for professional UI
✅ **TypeScript** for type safety

## Project Structure

```
src/
├── components/          # All UI components
│   ├── ui/             # Reusable UI components (Button, Card, Badge)
│   ├── Header.tsx      # Top navigation
│   ├── Hero.tsx        # Hero section with CTA
│   ├── SpecialOffers.tsx  # Offers carousel
│   ├── Bikes.tsx       # Bike catalog grid
│   └── Footer.tsx      # Footer with links
├── pages/
│   └── Home.tsx        # Main home page
└── App.tsx             # Root component
```

## Next Development Steps

### Immediate (Frontend)
1. Add real bike images (replace placeholder icons)
2. Implement routing for different pages
3. Create bike detail page
4. Add user authentication UI
5. Build booking/reservation form

### Backend (To Start Soon)
1. Initialize Spring Boot project
2. Set up PostgreSQL database
3. Create REST API endpoints
4. Implement authentication

### Integration
1. Connect frontend to backend API
2. Add state management (React Context or Redux)
3. Implement real-time data fetching

## Customization Tips

### Change Primary Color
Edit `src/index.css`:
```css
--primary: 120 100% 41%; /* Your color in HSL */
```

### Add New Pages
1. Create new file in `src/pages/`
2. Import and use components from `src/components/`
3. Add route in App.tsx

### Add More UI Components
```bash
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add input
```

## Troubleshooting

**Port already in use?**
- Vite will auto-select next available port

**Module not found?**
- Run `npm install` again

**Styling not working?**
- Check if Tailwind is properly configured
- Verify `index.css` is imported in `main.tsx`

## Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Spring Boot](https://spring.io/projects/spring-boot)

Happy coding! 🚀
