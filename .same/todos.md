# Project: njambe

## Project Context & Guidelines
- **App Name**: njambe
- **Model**: Clone of [ringtwice.be](https://ringtwice.be) adapted for user's country
- **Business Model**: Exactly like RingTwice - neighborhood-based services marketplace connecting users with local service providers
- **UI Approach**: When receiving RingTwice app screenshots, customize the UI to:
  1. Look slightly different (not exact copy)
  2. Use "njambe" branding instead of "RingTwice"
  3. Maintain the same functionality and user flow
- **Component Library**: Use [React Native Reusables](https://reactnativereusables.com/docs) throughout the app
  - Always prefer React Native Reusables components over custom implementations
  - Add components via CLI: `npx @react-native-reusables/cli@latest add [component-name]`
  - Components are customizable and follow shadcn/ui patterns
  - Only use custom components when React Native Reusables doesn't have the needed component

## Code Organization Pattern (IMPORTANT!)
When building UI pages, always follow this structure:

### Components Structure
```
components/
├── ui/                           # React Native Reusables components
│   ├── button.tsx
│   ├── text.tsx
│   └── ...
└── custom/                       # Custom page-specific components
    ├── [page_name]/              # e.g., start/, customer/, provider/, auth/
    │   ├── ComponentName.tsx     # Individual component
    │   └── index.ts              # Barrel export
    └── shared/                   # Shared components used across pages
        ├── Header.tsx
        ├── LocationSelector.tsx
        ├── EmptyState.tsx
        └── index.ts
```

### Data/Lib Structure
```
lib/
├── utils.ts                      # Utility functions (cn, etc.)
├── theme.ts                      # Theme configuration
└── [page_name]/                  # e.g., start/, customer/
    └── [data_name].ts            # e.g., service-providers.ts, categories.ts
```

### Rules for New Pages
1. **Extract data** to `lib/[page_name]/[data_name].ts`
2. **Extract components** to `components/custom/[page_name]/ComponentName.tsx`
3. **Create barrel exports** with `index.ts` in each folder
4. **Use shared components** from `components/custom/shared/` when applicable
5. **Keep page files lean** - only handle layout and orchestration

## Tech Stack
- **Framework**: Expo SDK 54 with React Native 0.81.5
- **Routing**: Expo Router v6
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **UI Components**: React Native Reusables (shadcn/ui port)
- **Icons**: Lucide React Native
- **Animations**: React Native Reanimated
- **Package Manager**: pnpm

## Current Project Structure
```
njambe/
├── app/
│   ├── _layout.tsx               # Root layout with PortalHost, ThemeProvider, Stack navigation
│   ├── index.tsx                 # Start/Landing screen (refactored)
│   ├── +html.tsx                 # Web HTML template
│   ├── +not-found.tsx            # 404 page
│   ├── auth/
│   │   └── login.tsx             # Login screen with email/password form
│   ├── (customer)/
│   │   ├── _layout.tsx           # Customer mode stack layout
│   │   ├── index.tsx             # Customer signup screen (former join.tsx)
│   │   └── (tabs)/               # Tab navigation for authenticated customers
│   │       ├── _layout.tsx       # Tab navigator layout with 5 tabs
│   │       ├── index.tsx         # Service tab (categories grid)
│   │       ├── requests.tsx      # Requests tab (empty placeholder)
│   │       ├── notifications.tsx # Notifications tab (empty placeholder)
│   │       ├── messages.tsx      # Messages tab (empty placeholder)
│   │       └── account.tsx       # Account tab (empty placeholder)
│   └── (provider)/
│       ├── _layout.tsx           # Provider mode stack layout
│       ├── index.tsx             # Provider home (refactored)
│       └── onboarding.tsx        # Provider onboarding screen
├── components/
│   ├── ui/                       # React Native Reusables components
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── icon.tsx
│   │   ├── separator.tsx
│   │   └── text.tsx
│   └── custom/                   # Custom page-specific components
│       ├── start/
│       │   ├── NjambeLogo.tsx
│       │   ├── LanguageSelector.tsx
│       │   ├── ServiceProviderCard.tsx
│       │   ├── ServiceProvidersCarousel.tsx
│       │   └── index.ts
│       ├── customer/
│       │   ├── CategoryCard.tsx
│       │   ├── CategoriesGrid.tsx
│       │   ├── OrDivider.tsx
│       │   ├── SearchBar.tsx
│       │   ├── SocialLoginButton.tsx
│       │   └── index.ts
│       ├── provider/
│       │   ├── StatCard.tsx
│       │   ├── StatsRow.tsx
│       │   ├── QuickActions.tsx
│       │   ├── OnboardingSlide1.tsx
│       │   ├── OnboardingSlide2.tsx
│       │   ├── OnboardingSlide3.tsx
│       │   ├── OnboardingPagination.tsx
│       │   ├── OnboardingNavButton.tsx
│       │   └── index.ts
│       └── shared/
│           ├── Header.tsx
│           ├── LocationSelector.tsx
│           ├── EmptyState.tsx
│           ├── PageHeader.tsx
│           └── index.ts
├── lib/
│   ├── utils.ts                  # cn() utility function
│   ├── theme.ts                  # Navigation theme colors
│   ├── start/
│   │   └── service-providers.ts  # Service provider data
│   └── customer/
│       └── categories.ts         # Service categories data
├── assets/images/                # App icons and splash screens
├── global.css                    # Tailwind CSS with CSS variables
├── tailwind.config.js            # Tailwind configuration
└── .same/
    ├── todos.md                  # This file
    └── react-native-reusables.md # Component library reference
```

## Design System

### Theme Configuration
The app uses **Zinc** as the base color theme, configured via CSS variables for easy theming.

**Theme Files:**
- `global.css` - CSS variables for NativeWind/Tailwind (light/dark modes)
- `lib/theme.ts` - TypeScript theme constants + React Navigation themes

**How to Change the Theme:**
1. Update the CSS variables in `global.css` (`:root` for light, `.dark:root` for dark)
2. Update the `COLORS` object in `lib/theme.ts` to match
3. All components using theme tokens will automatically update

**Current Zinc Theme:**
| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| background | zinc-50 | zinc-900 |
| foreground | zinc-900 | zinc-50 |
| card | white | zinc-800 |
| primary | zinc-900 | zinc-50 |
| secondary | zinc-100 | zinc-700 |
| muted | zinc-100 | zinc-700 |
| border | zinc-200 | zinc-700 |

### Brand Colors (Used in custom components)
- **Primary brand color**: Zinc-900 (#18181B)
- **Accent color**: Zinc-600 (#52525B)
- **Background**: Zinc-50 (#FAFAFA)
- **PRO badge**: Zinc-700 (#3F3F46)
- **Login link accent**: Zinc-800 (#27272A)
- **Logo**: "njam" in zinc-900 + "be" in zinc-600 + dot pattern

## Current Screens Summary

### 1. Start Screen (`app/index.tsx`)
- njambe logo with animated dot pattern (uses NjambeLogo component)
- Language selector (Cameroonian flag + FR/EN)
- 3 service provider cards in a fanned carousel (ServiceProvidersCarousel)
- Tagline: "Skilled neighbors, right next door!"
- Two CTAs: "I need a service" (customer mode) and "I'm looking for jobs" (provider mode)
- Sign in link

### 2. Login Screen (`app/auth/login.tsx`)
- Back arrow navigation
- Centered njambe logo
- Welcome text
- Email/password inputs with icons
- Forgot password link
- Sign In button
- Social login divider (Google, Facebook, Apple placeholders)
- Sign up link

### 3. Customer Signup (`app/(customer)/index.tsx`)
- PageHeader with back arrow and centered "Join njambe!" title
- Welcome heading: "Let's get to know each other"
- Description text about creating account
- Primary CTA: "Sign up with email" (teal filled button)
- "or" divider
- Social login buttons: Google, Facebook, Apple (outlined with teal text)
- After signup, redirects to tabs

### 4. Customer Tabs (`app/(customer)/(tabs)/`)
5-tab navigation for authenticated customers:
- **Requests** (`requests.tsx`): Track service requests and offers
- **Service** (`index.tsx`): Main tab with categories grid, search bar, location selector
- **Notifications** (`notifications.tsx`): Activity updates
- **Messages** (`messages.tsx`): Chat with service providers
- **Account** (`account.tsx`): Profile and settings

### 5. Provider Home (`app/(provider)/index.tsx`)
- Header (shared component)
- Location selector (shared component)
- Welcome section
- Stats cards (StatsRow component)
- Quick actions (QuickActions component)
- Available Jobs empty state
- My Services empty state

### 6. Provider Onboarding (`app/(provider)/onboarding.tsx`)
- 3-slide component switcher for provider onboarding
- "Join Us" slide with benefits
- "500+ jobs" slide with local stats (Cameroon context)
- "How it works" slide with process overview
- Dot indicators and arrow navigation

## Current Tasks
- [x] Build start page UI with njambe branding
- [x] Set up routing structure for two modes (customer/provider)
- [x] Create placeholder screens for each mode
- [x] Refactor start page components and data
- [x] Refactor customer home components
- [x] Refactor provider home components
- [x] Create shared components (Header, LocationSelector, EmptyState)
- [x] Add React Native Reusables components (Card, Badge)
- [x] Update start page with SafeAreaView and Button components
- [x] Improve ServiceProviderCard with Badge component
- [x] Fix status bar overlap with proper safe area handling
- [x] Build customer join/signup screen (when "I need a service" is clicked)
- [x] Create Separator UI component
- [x] Create PageHeader shared component
- [x] Create SocialLoginButton and OrDivider customer components
- [x] Create customer tabs navigation (Requests, Service, Notifications, Messages, Account)
- [x] Move signup screen to customer/index.tsx, redirect to tabs after signup
- [x] Refactor login screen components and data (when needed)
- [x] Build provider join/signup screen (when "I'm looking for jobs" is clicked)
- [x] Build out individual tab screens with content
- [x] Build provider onboarding page with component switcher
- [x] Redesign login screen with new layout (underline inputs, social icons, create account button)
- [ ] Add Input component from React Native Reusables for forms
- [ ] Build provider join/signup screen (after onboarding)
- [ ] Build out individual tab screens with content

## Completed Tasks
- [x] Cloned the repository from GitHub
- [x] Studied React Native Reusables documentation
- [x] Examined existing project components (Button, Text, Icon)
- [x] Created reference documentation for the component library
- [x] Studied full project structure and codebase
- [x] Full project study complete - All files reviewed and documented
- [x] Refactored start screen: extracted NjambeLogo, LanguageSelector, ServiceProviderCard, ServiceProvidersCarousel
- [x] Refactored customer home: extracted CategoryCard, CategoriesGrid, SearchBar
- [x] Refactored provider home: extracted StatCard, StatsRow, QuickActions
- [x] Created shared components: Header, LocationSelector, EmptyState
- [x] Created data files: lib/start/service-providers.ts, lib/customer/categories.ts
- [x] Created provider onboarding screen with 3-slide component switcher
- [x] Created data for all onboarding slides
- [x] Created individual onboarding slide components
- [x] Created onboarding navigation components
- [x] Updated start screen to navigate to onboarding first
- [x] Applied zinc theme styling throughout
- [x] Adapted content for Cameroon context (XAF currency, local stats)

## Important Notes
- This is an Expo React Native project - preview works best in Expo Go or native simulators
- Don't initiate any web preview in Same
- Uses pnpm as package manager
- To add components: `npx @react-native-reusables/cli@latest add [component-name]`
- PortalHost is already set up in root layout for dialogs/popovers
- **Always follow the Code Organization Pattern above for new pages!**

## Session Notes (Updated: Tue Jan 27, 2026)

### Project Study Complete
- Cloned repository from GitHub successfully
- Studied todos.md and react-native-reusables.md documentation
- Reviewed all project files including:
  - Root layout and routing structure
  - All screen files (start, login, customer home, provider home, customer join)
  - All UI components (Button, Text, Icon, Card, Badge, Separator)
  - All custom components (start, customer, provider, shared folders)
  - Data/lib files (categories, service-providers, theme, utils)
  - Configuration files (tailwind, global.css, package.json)
- Dependencies installed with pnpm

### Key Reminders
1. **Use React Native Reusables components** throughout the app
2. **CLI command**: `npx @react-native-reusables/cli@latest add [component-name]`
3. **Package manager**: pnpm
4. **This is a React Native Expo project** - cannot preview in web browser in Same
5. **Follow Code Organization Pattern** when adding new pages/components

### Available React Native Reusables Components in Project
- `Button` - with variants (default, destructive, outline, secondary, ghost, link)
- `Text` - with variants (default, h1, h2, h3, h4, p, blockquote, code, lead, large, small, muted)
- `Card` - with CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- `Badge` - with variants (default, secondary, destructive, outline)
- `Icon` - wrapper for Lucide icons
- `Separator` - horizontal/vertical dividers

### Components to Add When Needed (via CLI)
```bash
# For forms
npx @react-native-reusables/cli@latest add input label textarea checkbox switch radio-group

# For navigation/menus
npx @react-native-reusables/cli@latest add tabs select dropdown-menu

# For feedback
npx @react-native-reusables/cli@latest add alert dialog alert-dialog progress skeleton

# For layout
npx @react-native-reusables/cli@latest add avatar collapsible accordion
```

### Project Tech Stack Summary
- **Expo SDK 54** with React Native 0.81.5
- **Expo Router v6** for navigation
- **NativeWind** (Tailwind CSS for RN)
- **React Native Reusables** (shadcn/ui port)
- **Lucide React Native** for icons
- **React Native Reanimated** for animations
- **pnpm** as package manager

### Design System
- Primary: Zinc-900 (#18181B)
- Accent: Zinc-600 (#52525B)
- Background: Zinc-50 (#FAFAFA)
- Secondary accent: Zinc-400 (#A1A1AA)
- PRO badge: Zinc-700 (#3F3F46)
- Login accent: Zinc-800 (#27272A)

### Current Project State
The project has:
- **Start Screen** (`app/index.tsx`): Landing page with logo, service provider carousel, CTAs
- **Login Screen** (`app/auth/login.tsx`): Email/password login form
- **Customer Signup** (`app/(customer)/index.tsx`): Signup screen with email/social options
- **Customer Tabs** (`app/(customer)/(tabs)/`): 5-tab navigation (Requests, Service, Notifications, Messages, Account)
- **Provider Home** (`app/(provider)/index.tsx`): Stats, quick actions, job listings
- **Provider Onboarding** (`app/(provider)/onboarding.tsx`): 3-slide component switcher for provider onboarding

### Recent Changes (Tue Jan 27, 2026)
- Updated country context from Ghana to Cameroon
- Changed currency from GHS to XAF (Central African CFA franc)
- Migrated theme from Slate to Zinc across all files
- Updated `global.css` with Zinc color CSS variables for light and dark modes
- Updated `lib/theme.ts` with Zinc color palette and theme constants
- Updated Start Screen language selector: changed from Ghanaian flag to Cameroonian flag
- Updated Start Screen language selector: changed to FR/EN (French/English for Cameroon)
- Updated provider onboarding slide 2 stats: changed to Cameroon-specific job numbers
- All theme references throughout the codebase now use Zinc instead of Slate
- Updated Completed Tasks to reflect Cameroon context and XAF currency
- Both light mode and dark mode are now properly configured with Zinc theme
- Theme can be easily changed in the future by updating CSS variables and COLORS object

### Next Steps to Consider
- [ ] Refactor login screen components and data (when needed)
- [ ] Build provider join/signup screen (when "I'm looking for jobs" is clicked)
- [ ] Add Input component from React Native Reusables for forms
- [ ] Build provider join/signup screen (after onboarding)
- [ ] Build out individual tab screens with content

## Session Log - Tue Jan 27, 2026

### Current Session
1. **Cloned repository** from `https://github.com/Malicious-Bunny/njambe.git`
2. **Studied todos.md** - Comprehensive project briefing complete
3. **Studied react-native-reusables.md** - Component library reference reviewed
4. **Reviewed all key project files:**
   - `app/_layout.tsx` - Root layout with Stack navigation, ThemeProvider, PortalHost
   - `app/index.tsx` - Start screen with logo, carousel, CTAs
   - `app/auth/login.tsx` - Login screen with email/password form
   - `app/(customer)/(tabs)/index.tsx` - Service screen with categories grid
   - `app/(provider)/index.tsx` - Provider home with stats and actions
   - `app/(provider)/onboarding.tsx` - 3-slide onboarding flow
   - `lib/theme.ts` - Zinc theme configuration
   - `global.css` - CSS variables for light/dark themes
   - Various custom components in `components/custom/`
5. **Installed dependencies** with pnpm
6. **Design System Audit & Fix** - Updated all pages to follow Zinc theme:
   - Fixed 12 files with color inconsistencies
   - Replaced all `bg-[#FBF8F3]` with `bg-background`
   - Replaced all `text-gray-*` with `text-foreground` or `text-muted-foreground`
   - Replaced all `text-teal-*` / `bg-teal-*` with `text-primary` / `bg-primary`
   - Replaced all `text-amber-*` / `bg-amber-*` with `text-primary` / `bg-primary`
   - Updated hardcoded hex colors to use theme-aware dynamic colors
   - Added dark mode support to icon colors in components

### Files Updated for Design System Compliance
- `app/(customer)/(tabs)/_layout.tsx` - Tab bar colors now use Zinc palette
- `app/(customer)/(tabs)/account.tsx` - Background and text colors fixed
- `app/(customer)/(tabs)/index.tsx` - Background and text colors fixed
- `app/(customer)/(tabs)/messages.tsx` - Background and text colors fixed
- `app/(customer)/(tabs)/notifications.tsx` - Background and text colors fixed
- `app/(customer)/(tabs)/requests.tsx` - Background and text colors fixed
- `app/(customer)/index.tsx` - Signup screen now uses Zinc theme
- `app/(provider)/index.tsx` - Provider home uses Zinc theme
- `components/custom/customer/SearchBar.tsx` - Card and text colors fixed
- `components/custom/provider/StatCard.tsx` - Card and text colors fixed
- `components/custom/shared/PageHeader.tsx` - Icon and text colors fixed
- `components/custom/start/LanguageSelector.tsx` - Background and text colors fixed

### Project Ready for Development
- All dependencies installed
- Project structure understood
- Design system now consistent across all pages
- Ready to implement next features

## Session Log - Tue Jan 27, 2026 (Continued)

### Design System Audit - Provider Onboarding

Fixed all provider onboarding components to follow the Zinc design system:

**Files Updated:**
1. `app/(provider)/onboarding.tsx`
   - Changed `bg-zinc-50` to `bg-background dark:bg-background`
   - Added `useColorScheme` hook for theme-aware arrow color

2. `components/custom/provider/onboarding/OnboardingSlide1.tsx`
   - Replaced `border-zinc-100` → `border-border dark:border-border`
   - Replaced `bg-white` → `bg-card dark:bg-card`
   - Replaced `text-zinc-900` → `text-foreground dark:text-foreground`
   - Replaced `text-zinc-700` → `text-muted-foreground dark:text-muted-foreground`
   - Replaced `bg-emerald-500` → `bg-primary dark:bg-primary`
   - Replaced `#EC4899` (pink) → dynamic `primaryColor` based on theme
   - Replaced `#F59E0B` (amber star) → dynamic `starColor` based on theme

3. `components/custom/provider/onboarding/OnboardingSlide2.tsx`
   - Same theme token replacements as Slide1
   - Fixed PRO badge: `bg-emerald-500` → `bg-primary` with `text-primary-foreground`

4. `components/custom/provider/onboarding/OnboardingSlide3.tsx`
   - Same theme token replacements
   - Replaced `text-emerald-500` → `text-primary dark:text-primary`
   - Replaced `text-pink-500` → `text-primary dark:text-primary`
   - Updated hardcoded GHS → XAF currency in UI

5. `components/custom/provider/onboarding/OnboardingPagination.tsx`
   - Replaced `bg-zinc-800` → `bg-primary dark:bg-primary`
   - Replaced `bg-zinc-300` → `bg-muted dark:bg-muted`

6. `components/custom/provider/onboarding/OnboardingNavButton.tsx`
   - Replaced `bg-zinc-800` → `bg-primary dark:bg-primary`
   - Replaced `active:bg-zinc-700` → `active:bg-primary/90 dark:active:bg-primary/90`
   - Added dynamic arrow color based on theme

7. `lib/provider/onboarding-data.ts`
   - Updated context comment: Ghana → Cameroon
   - Updated all GHS currency to XAF
   - Updated location reference: Ghana → Cameroon

### Summary of Changes
- All hardcoded zinc colors replaced with semantic theme tokens
- Full dark mode support added to all onboarding components
- Icon colors are now dynamic based on `useColorScheme`
- Currency and location updated from Ghana (GHS) to Cameroon (XAF)
- No linting errors

## Session Log - Login Screen Redesign

### Login Screen Redesign (Tue Jan 27, 2026)

Redesigned `app/auth/login.tsx` to match the new UI layout:

**New Layout Features:**
1. **Header**: Back button with "Back" text on left, LanguageSelector on right
2. **Underline-style inputs**: Email and password fields with floating labels and bottom border
3. **Password visibility toggle**: Eye icon to show/hide password
4. **Centered forgot password link**: Underlined text style
5. **Full-width login button**: Rounded-full style with primary background
6. **Social login section**: "Or continue with" text + 3 square icon buttons (G, f, Apple)
7. **Privacy policy link**: Centered underlined text
8. **Bottom section**: Divider line + "Create an account" outlined button

**Design System Compliance:**
- Uses Zinc theme tokens throughout (bg-background, text-foreground, etc.)
- Dynamic colors based on `useColorScheme` for dark mode support
- Border colors use theme-aware hex values
- All buttons use primary/secondary semantic colors

**Navigation:**
- Login button navigates to `/(customer)/(tabs)`
- Create account button navigates to `/(customer)`
- Back button uses `router.back()`

### Language Selector Update (Tue Jan 27, 2026)

Updated `components/custom/start/LanguageSelector.tsx`:

**Changes:**
- Replaced Cameroon flag with UK flag (English) and French flag (French)
- Added toggle functionality between EN and FR
- UK flag: Blue background with white and red cross pattern
- French flag: Blue, white, red vertical stripes
- Added `onLanguageChange` callback prop for language state management
- Component maintains its own language state internally

**Affected Screens:**
- `app/index.tsx` (Start/Home screen)
- `app/auth/login.tsx` (Login screen)

Both screens now show the updated language selector with proper flags.

## Standing by for further instructions
