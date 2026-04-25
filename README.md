# Infinity Investments Website

A modern, responsive company website for Infinity Investments, a professional construction company.

## 🏗️ Project Structure

```
infinity-investments/
├── index.html              # Main HTML file
├── README.md               # Project documentation
├── css/
│   └── styles.css          # Custom styles and animations
├── js/
│   ├── app.js              # Main application controller
│   └── modules/            # JavaScript modules
│       ├── navigation.js   # Navigation and mobile menu
│       ├── theme.js        # Dark/light mode management
│       ├── formValidator.js # Contact form validation
│       ├── projectGallery.js # Project gallery with Swiper
│       └── animations.js   # Scroll animations and effects
├── assets/
│   ├── images/             # Image assets
│   └── icons/              # Icon assets
└── components/             # Reusable HTML components (future)
```

## 🚀 Features

### Core Functionality
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Theme switching with localStorage persistence
- **Smooth Navigation**: Sticky navbar with smooth scrolling
- **Interactive Gallery**: Swiper.js carousel with filtering
- **Form Validation**: Real-time contact form validation
- **Animations**: AOS and custom scroll animations

### Sections
- **Hero**: Full-screen background with call-to-action
- **About**: Corporate overview with vision & mission
- **Core Values**: Icon-based value display
- **Services**: Service cards with hover effects
- **Equipment**: Plant & equipment showcase
- **Why Choose Us**: Feature highlights
- **Projects**: Filterable project gallery
- **Team**: Team member profiles
- **HSE**: Health, Safety & Environment section
- **Contact**: Contact form with Google Maps integration

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript ES6+**: Modern JavaScript with modules
- **Google Fonts**: Inter font family

### Libraries & Frameworks
- **Swiper.js**: Carousel/slider functionality
- **AOS**: Animate On Scroll library
- **Font Awesome**: Icon library

### Tools
- **Live Server**: Local development server
- **ES6 Modules**: JavaScript module system

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎨 Design System

### Colors
- **Navy Blue**: `#1e3a8a` (primary)
- **Orange**: `#f97316` (accent)
- **White**: `#ffffff` (light mode background)
- **Gray**: Various shades for text and backgrounds

### Typography
- **Font Family**: Inter
- **Weights**: 300, 400, 500, 600, 700, 800
- **Responsive Typography**: Scales based on viewport

### Components
- **Cards**: Consistent shadow and border radius
- **Buttons**: Primary and secondary variants
- **Forms**: Consistent input styling with validation states

## 🔧 Development

### Local Development
1. Start a local server:
   ```bash
   python -m http.server 8000
   ```
2. Open `http://localhost:8000` in your browser

### File Structure Guidelines
- **Modular JavaScript**: Each module handles specific functionality
- **Separated CSS**: All custom styles in `styles.css`
- **Semantic HTML**: Proper use of HTML5 semantic elements
- **Accessibility**: ARIA labels and keyboard navigation

### Code Organization
- **ES6 Modules**: Import/export for clean code organization
- **Class-based Architecture**: Object-oriented approach for JavaScript
- **Event-driven**: Proper event handling and delegation
- **Performance**: Optimized animations and lazy loading

## 🌐 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Features**: ES6 modules, CSS Grid, Flexbox, Custom Properties

## 📊 Performance

### Optimization
- **Lazy Loading**: Images load on scroll
- **Minified Assets**: Production-ready optimization
- **Efficient Animations**: Hardware-accelerated CSS transforms
- **Optimized Images**: WebP format support

### Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Security

- **Form Validation**: Client-side and server-side validation
- **XSS Prevention**: Proper input sanitization
- **HTTPS**: Secure protocol for production

## 📝 Documentation

### JavaScript Modules

#### Navigation (`navigation.js`)
- Mobile menu toggle
- Smooth scrolling
- Active navigation highlighting
- Scroll-based navbar effects

#### Theme (`theme.js`)
- Dark/light mode toggle
- LocalStorage persistence
- System theme detection
- Accessibility announcements

#### Form Validator (`formValidator.js`)
- Real-time validation
- Error handling
- Success messages
- Phone number formatting

#### Project Gallery (`projectGallery.js`)
- Swiper initialization
- Project filtering
- Keyboard navigation
- Accessibility features

#### Animations (`animations.js`)
- Intersection Observer
- Parallax effects
- Counter animations
- Custom animations

## 🚀 Deployment

### Production Build
1. Minify CSS and JavaScript
2. Optimize images
3. Enable gzip compression
4. Set up CDN for static assets

### Environment Variables
- Google Maps API key
- Contact form endpoint
- Analytics tracking

## 🤝 Contributing

1. Follow the existing code style
2. Use semantic HTML5
3. Ensure accessibility compliance
4. Test on multiple devices
5. Update documentation

## 📄 License

This project is proprietary to Infinity Investments.

## 📞 Contact

- **Company**: Infinity Investments
- **Email**: info@infinityinvestments.mw
- **Phone**: +265 1 234 567
- **Address**: PO Box 3222, Lilongwe, Malawi

---

**Building with Integrity • Delivering Quality • Engineering the Future**
# InfinityInvestments
