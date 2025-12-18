# PROLO.sa - Professional Logistics Platform Technical Documentation

## 1. Project Overview

**PROLO.sa** is a modern, bilingual logistics and shipping platform designed for the Saudi Arabian market. The platform addresses the growing demand for efficient shipment management, tracking, and logistics services in the region.

### Key Problem Solved:

- **Streamlined Shipment Process**: Simplifies package creation, tracking, and management for businesses and individuals
- **Multi-language Support**: Arabic (Najdi + Modern Standard Arabic) and English support for broad market reach
- **Digital Transformation**: Modern web interface replacing traditional logistics paperwork and manual processes
- **Regional Optimization**: Specifically designed for Saudi Arabian logistics requirements and user expectations

## 2. Tech Stack

### Core Framework & Libraries:

- **Next.js 15.5.7** with App Router
- **React 19.1.0** with Server Components
- **TypeScript 5** for type safety
- **Tailwind CSS 4** for styling

### Internationalization:

- **next-intl 4.3.12** for bilingual support

### Animation & UI Libraries:

- **@react-spring/web 10.0.3** for smooth animations
- **Swiper 12.0.2** for carousels and sliders
- **react-intersection-observer 9.16.0** for scroll-based animations

### Form Handling & API:

- **react-hook-form 7.66.0** for form validation
- **Axios 1.13.2** for API calls
- **date-fns 4.1.0** for date manipulation

### Development Tools:

- **ESLint 9** for code quality
- **Prettier 3.6.2** with Tailwind plugin for formatting

## 3. Folder & File Structure

```
src/
├── app/
│   ├── [locale]/                 # Dynamic locale routing
│   │   ├── layout.tsx           # Root layout with i18n
│   │   ├── page.tsx             # Homepage
│   │   ├── _components/         # App-specific components
│   │   │   ├── components/      # Layout components
│   │   │   ├── FormComponents/  # Reusable form elements
│   │   │   ├── Header/          # Navigation components
│   │   │   ├── optimized/       # Lazy-loaded components
│   │   │   └── sections/        # Page sections
│   │   └── [routes]/            # Dynamic pages (services, industries, etc.)
│   └── api/                     # API routes
│       ├── contact/route.ts
│       ├── create-shipment/route.ts
│       ├── get-a-quote/route.ts
│       └── ...
├── i18n/                        # Internationalization config
│   ├── routing.ts
│   ├── request.ts
│   └── navigation.ts
├── lib/                         # Business logic & utilities
│   ├── api.ts                  # Axios configuration
│   ├── types.ts                # TypeScript definitions
│   ├── constants.ts            # Application constants
│   ├── createShipment.ts       # Shipment creation logic
│   ├── getTracking.ts          # Package tracking
│   └── submit*Form.ts         # Form submission handlers
├── seo/                        # SEO metadata
│   ├── en.json
│   └── ar.json
└── addresses/                  # Address data
    ├── english.json
    └── arabic.json
```

## 4. Routing System

### App Router Architecture:

- **Locale-based Routing**: Dynamic `[locale]` parameter supporting `/en` and `/ar`
- **Dynamic Routes**:
  - `/services/[serviceType]/[service]` - Service-specific pages
  - `/industries/[industry]` - Industry verticals
  - `/blogs/[slug]` - Blog posts
  - `/tracking/[barcode]` - Package tracking results

### Route Groups:

- Layout-specific groups for different page types (tracking, get-a-quote, create-shipment)
- Parallel routes for optimized component loading

### API Routes:

- RESTful endpoints under `/api/*` for form submissions and data operations
- Server-side processing with error handling

## 5. Core Features & Business Logic

### Shipment Management:

- **Create Shipment**: Multi-step form with address validation and service selection
- **Track Packages**: Real-time tracking with barcode lookup
- **Print Labels**: Generate shipping labels for packages

### Form Processing:

- **Contact Form**: Customer inquiries and support requests
- **Quote Request**: Custom pricing estimates based on shipment details
- **Subscription**: Newsletter and updates signup

### Business Logic Flow:

1. **Form Validation** → react-hook-form with custom validation rules
2. **Request Building** → Transform form data to API-compatible format
3. **API Integration** → External logistics service integration
4. **Response Handling** → Success/failure states with user feedback

## 6. API Routes Explanation

### Key Endpoints:

**POST `/api/create-shipment`**

- Processes shipment creation requests
- Validates environment variables (COMPANY_ID)
- Builds shipment request payload
- Integrates with external logistics API
- Returns tracking information or error responses

**GET `/api/tracking`** (via `getTracking.ts`)

- Fetches package status by barcode
- Company ID validation
- Error handling for invalid or missing packages

**POST `/api/get-a-quote`**

- Processes pricing estimation requests
- Validates shipment parameters
- Returns quote details

### Error Handling:

- Standardized error responses with status codes
- Console logging for debugging
- User-friendly error messages

## 7. Authentication & Authorization

**Current Status**: No authentication system implemented

- Public-facing platform with no user accounts
- API calls use company-level authentication (COMPANY_ID env var)
- All features accessible without login

## 8. State Management Approach

### Server-First Architecture:

- **React Server Components**: Majority of state handled on server
- **Form State**: react-hook-form for client-side form management
- **URL State**: Route parameters for navigation state
- **Minimal Client State**: Only necessary UI state on client

### State Management Pattern:

- **Props Drilling**: Appropriate for current component hierarchy
- **Context Usage**: Limited to i18n provided by next-intl
- **No External Stores**: No Redux/Zustand due to server-focused architecture

## 9. Environment Variables Usage

### Required Environment Variables:

```env
BASE_URL=                    # API Base URL
COMPANY_ID=                  # For API authentication
EMAIL=                       # For Create Shipment API authentication
PASSWORD=                    # For Create Shipment API authentication
SUBSCRIPTION_FORM_URL=       # Formbold.com service URL for form data storage
CONTACT_FORM_URL=           # Formbold.com service URL for form data storage
GET_A_QUOTE_FORM_URL=       # Formbold.com service URL for form data storage
CREATE_SHIPMENT_FORM_URL=   # Formbold.com service URL for form data storage
```

### Security Practices:

- Server-side only environment variable access
- No sensitive data exposed to client
- Validation checks for missing environment variables
- External form data storage via Formbold.com service for secure data handling

## 10. Performance & SEO Considerations

### Performance Optimizations:

- **Lazy Loading**: Dynamic imports for heavy components (Typebot, Popups)
- **Image Optimization**: Next.js Image component with proper sizing
- **Code Splitting**: Automatic by Next.js App Router
- **Font Optimization**: Local font loading with proper subsets

### SEO Implementation:

- **Multi-language SEO**: Separate metadata for English and Arabic
- **Structured Data**: Open Graph and Twitter Card metadata
- **Canonical URLs**: Proper locale-specific canonical tags
- **Social Media Optimization**: Shareable content with proper images

### Performance Metrics:

- Lighthouse optimized build process
- Tailwind CSS purging for minimal CSS bundle
- Tree-shaking for unused JavaScript

## 11. Security Considerations

### Current Security Measures:

- **Type Safety**: TypeScript preventing type-related vulnerabilities
- **API Validation**: Server-side validation of all inputs
- **Environment Security**: Sensitive data kept server-side
- **CORS**: Configured through Next.js API routes
- **Secure API Integration**: Proper authentication with external logistics services
- **Form Data Security**: External form handling via Formbold.com service

## 12. Deployment Instructions

### Netlify Deployment (Current):

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Deploy to Netlify
# Connect repository to Netlify for automatic deployments
```

### Netlify Configuration:

- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Environment Variables**: Set all required variables in Netlify dashboard

### Environment Setup:

1. Set environment variables in Netlify dashboard:
   - `BASE_URL`, `COMPANY_ID`, `EMAIL`, `PASSWORD`
   - Formbold.com URLs: `SUBSCRIPTION_FORM_URL`, `CONTACT_FORM_URL`, `GET_A_QUOTE_FORM_URL`, `CREATE_SHIPMENT_FORM_URL`
2. Configure custom domain (prolo.sa)
3. Set up redirects for locale handling

### Build Process:

- TypeScript compilation
- ESLint validation
- Next.js optimization (image, font, code splitting)

---

# Additional Content for Technical Documentation

## 3. Live Chat & Communication Integration

### WhatsApp Business Integration

- **Universal WhatsApp Bot**: Live chat functionality integrated throughout the platform
- **Customer Support**: Direct WhatsApp communication for real-time support
- **Tracking Updates**: Automated WhatsApp notifications for shipment status changes
- **Lead Generation**: WhatsApp as primary contact channel for quote requests

### Contact Information Configuration

```
Primary Contacts:
- Prolo Logistics: +966 53 908 6882 (WhatsApp Business)
- Development Team: +966 533 66 3584
- Email: rand@adwar.com.sa, dinar@adwar.com.sa
```

## 4. Comprehensive SEO & Analytics Configuration

### Metadata Optimization

- **Dynamic Meta Tags**: Locale-specific titles and descriptions
- **Structured Data**: JSON-LD schema markup for logistics services
- **Open Graph Tags**: Optimized social media sharing previews
- **Twitter Cards**: Enhanced Twitter sharing experience

### Social Media Preview Testing

- **Validation Tool**: https://socialmediasharepreview.com/?url=https://prolo.sa/
- **Platform Testing**: Screenshots verified across Facebook, Twitter, LinkedIn
- **Image Optimization**: Proper OG image dimensions and fallbacks

### URL Structure Optimization

- **Locale Prefixing**: `/en/` and `/ar/` for bilingual SEO
- **Slug-based Routing**: SEO-friendly URLs for services and blogs
- **Canonical URLs**: Proper cross-language canonical tags

### On-Page SEO Implementation

- **Heading Hierarchy**: Proper H1-H6 structure with keyword optimization
- **Alt Tags**: Descriptive alt text for all logistics-related images
- **Internal Linking**: Strategic linking between services and content pages
- **Mobile Optimization**: AMP-ready responsive design

## 5. Access & Credential Management

### Platform Access Details

```
Netlify Admin: https://app.netlify.com
GitHub Repository: dinar@adwar.com.sa
Souqt2 Platform: https://souqt2.sa/Home
Formbold: https://formbold.com
```

### Credential Information

```
Google Login Credentials:
- Prolo@Adwar4321
- Prolo@123

Email Accounts:
- Primary: rand@adwar.com.sa
- Technical: dinar@adwar.com.sa
- Backup: randraed96@gmail.com
```

## 6. AI & Multimedia Content Integration

### AI-Generated Content Strategy

- **Explainer Videos**: AI-powered warehouse and shipping process animations
- **Promotional Reels**: Automated social media content generation
- **Brand Animations**: Corporate identity animations using AI tools
- **Customer Stories**: Case-study video clips for testimonials

### Corporate Identity Elements

- **Branded Templates**: Consistent visual style across all content
- **AI Corporate Character**: Mascot creation for brand recognition
- **Theme Consistency**: Unified color scheme and design language

## 7. Maintenance & Update Guidelines

### Content Management

- **Template System**: Reusable content templates for recurring updates
- **AI Content Generation**: Automated content creation for blogs and announcements
- **Multilingual Updates**: Synchronized English and Arabic content updates

### Technical Maintenance

- **Performance Monitoring**: Regular Lighthouse audits and optimization
- **Security Updates**: Automated dependency updates and security patches
- **Backup Strategy**: Regular data backups and disaster recovery plan

### Update Workflow

1. **Content Updates**: Use branded templates for consistency
2. **Technical Updates**: GitHub-based deployment pipeline
3. **SEO Optimization**: Regular keyword and performance analysis
4. **Analytics Review**: Monthly performance reporting and optimization

## 8. Project Delivery & Support

### Scope of Work Delivered

- **UX/UI Planning**: Complete user experience design
- **Full Development**: End-to-end website development
- **Bilingual Support**: English & Arabic implementation
- **Performance Optimization**: Lighthouse-optimized delivery

### Post-Launch Support Structure

- **Technical Support**: Ongoing maintenance and bug fixes
- **Content Updates**: Regular content refresh and optimization
- **Analytics Monitoring**: Performance tracking and reporting
- **Feature Enhancements**: Future development roadmap planning
