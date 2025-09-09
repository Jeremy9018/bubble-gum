# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for BubbleShare's GEO (Generative Engine Optimization) report service. It consists of two main flows:
1. **Multi-step signup process** (`/signup/step-{1-4}`) for users to request a GEO analysis
2. **Report dashboard** (`/report`) displaying AI search visibility metrics with premium upsells

The report shows brand performance across AI platforms like ChatGPT, Claude, and Gemini with mock data for demonstration purposes.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

The application runs on port 3002 by default (3000 and 3001 are often in use).

## Core Architecture

### Route Structure
- **Landing Page** (`/`): Hero section with CTA to start signup
- **Signup Flow** (`/signup/*`): 4-step form with shared layout and progress tracking
- **Report Page** (`/report`): Static report dashboard with freemium model
- **App Layout** (`layout.tsx`): Global layout with fonts and base styling

### Report Dashboard Architecture (`/report/page.tsx`)

The report page uses a **freemium model** with visible free metrics and blurred premium sections:

**Free Metrics Displayed**:
- Brand AI Visibility: Mention Rate (78%) and Share of Voice (34%)
- Competition Ranking: Top 5 competitors with mention rates
- Source Breakdown: Link sources and content type distributions

**Premium Upsell Sections**:
- Advanced analytics with overlay CTAs and blurred content behind
- Two main premium sections: "Premium Analytics" and "Competitive Intelligence"
- Uses `blur-sm` and `pointer-events-none` on background content
- Positioned overlays with gradient backgrounds and CTA buttons

**Layout Patterns**:
- Responsive grid layouts that adapt from single column (mobile) to multi-column (desktop)
- Side-by-side layouts for competition data: ranking widget (1/3 width) next to premium metrics (2/3 width)
- Consistent card-based design with hover effects and shadows

## Core Architecture

### Multi-Step Form Flow
The application is built around a 5-step signup process:

1. **Step 1** (`/signup/step-1`): Country & Language selection with auto-detection
2. **Step 2** (`/signup/step-2`): Personal information (name, company, email, position) and brand details (name, website)
3. **Step 3** (`/signup/step-3`): Single theme selection from Korean charity/humanitarian themes
4. **Step 4** (`/signup/step-4`): Competitor analysis input
5. **Step 5** (`/signup/step-5`): Meeting scheduling with preferred date/time slots
6. **Confirmation** (`/signup/confirmation`): Success page with meeting details

### Form State Management
- **Global State**: React Context (`FormProvider`) wraps the signup flow
- **Persistence**: localStorage automatically saves form data every 500ms
- **Validation**: Step-by-step validation with real-time feedback
- **Navigation**: URL-based routing with progress tracking

### Key Data Structures

```typescript
// Main form data structure
interface FormData {
  step1: { country: string; language: string };
  step2: { 
    name: string; 
    company: string; 
    email: string; 
    position: string;
    brandName: string; 
    website: string; 
  };
  step3: { selectedThemes: string[]; }; // Single selection only
  step4: { competitors: string[]; };
  step5: { 
    preferredDate: string; 
    preferredTimeSlot: string;
    referralSource?: string;
  };
}
```

### Component Architecture

**Reusable UI Components** (`/components/ui/`):
- `Button`: Primary/secondary/outline/ghost variants
- `Input`: With validation, icons, and error states
- `Select`: Custom dropdown with search capability
- `Card`: Selectable cards for theme selection
- `Progress`: Step indicator with mobile/desktop variants

**Form Components** (`/contexts/` and `/hooks/`):
- `FormProvider`: Context provider for global form state
- `useFormData`: Custom hook managing form state and localStorage persistence
- `useFormContext`: Hook for accessing form context

**Report Components** (inline in `/app/report/page.tsx`):
- `MetricCard`: Reusable metric display with trend indicators
- `ProgressBar`: Animated progress bars for source breakdowns
- `RankingItem`: Competitor ranking list items with highlighting for current brand

### Business Logic

**Theme Selection**: Korean charity/humanitarian themes (기부단체, 기부방법, 후원, 국제구호, 아동보호) with single selection enforced.

**Meeting Scheduling**: Mandatory 30-minute time slots from 9 AM to 6 PM KST with 7 business days availability.

**Validation**: Progressive validation ensuring users can't skip steps or submit incomplete data.

**Report Data**: Static mock data for demonstration purposes:
- Korean charity organizations (굿네이버스, 유니세프, etc.) with competitive rankings
- Hardcoded metrics for brand visibility, competitor analysis, and source breakdowns
- Premium features showcased via blurred overlays to drive conversion

### Data Files

**Constants** (`/lib/constants.ts`):
- `THEMES`: Korean charity themes with icons and descriptions
- `TIME_SLOTS`: 30-minute intervals for meeting scheduling
- `COUNTRIES`: Supported countries with flags
- `getAvailableDates()`: Generates next 7 business days

**Utilities** (`/lib/utils.ts`):
- `detectUserCountry()`: Auto-detect user location
- `getCountryLanguages()`: Map countries to default languages
- `getCurrentStep()`: Extract current step from URL pathname

### Styling & Design

- **Framework**: Tailwind CSS 4 with PostCSS
- **Fonts**: Geist Sans and Geist Mono via next/font
- **Theme**: Blue-focused color scheme for BubbleShare branding
- **Responsive**: Mobile-first design with sm/lg breakpoints
- **Utilities**: `clsx` and `tailwind-merge` via custom `cn()` utility

### Form Validation Rules

- **Step 1**: Country and language required
- **Step 2**: All personal information fields (name, company, email, position) and brand details (brandName, website URL) required
- **Step 3**: Exactly one theme must be selected (not 0, not 2+)
- **Step 4**: Competitor list input
- **Step 5**: Meeting date and time slot selection required

### Local Storage Integration

Form data automatically persists to localStorage with key `'geo-report-form-data'` and clears upon successful submission.

### Navigation & Progress

- Progress bar updates automatically based on current URL path
- Each step validates before allowing progression
- Back navigation preserves form state
- Step URLs: `/signup/step-{1-5}`, `/signup/confirmation`

## Important Notes

### Form Flow
- Meeting scheduling is **mandatory** - users must select date/time
- Theme selection is **single-choice only** (enforced by validation)
- All times displayed in KST timezone
- Form uses dummy data - no actual backend integration
- Progress tracking uses Next.js `usePathname` hook for real-time updates

### Report Dashboard
- All metrics are **static mock data** for demonstration
- Premium sections use visual blur effects (`blur-sm`) with overlay CTAs
- Competition ranking highlights current brand (굿네이버스) with special styling
- Layout adapts from stacked (mobile) to side-by-side (desktop) for optimal space usage
- Report data loads from localStorage form data but falls back to defaults

### Development Notes
- Uses Next.js 15 with Turbopack for faster development builds
- React 19 with modern patterns (server components where applicable)
- Tailwind CSS 4 for styling with custom `cn()` utility function
- TypeScript for type safety across form data and component props