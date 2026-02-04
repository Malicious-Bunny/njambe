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
│       │   ├── CountryFlag.tsx         # NEW: Renders country flags
│       │   ├── CountrySelector.tsx     # NEW: Country picker with modal
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
│   ├── customer/
│   │   ├── categories.ts         # Service categories data
│   │   └── countries.ts          # NEW: Country data for signup
│   └── provider/
│       └── onboarding-data.ts    # Onboarding slides data
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
- [x] Build customer signup form with full form fields (name, email, password, country, checkbox)
- [x] Create CountrySelector component with modal picker
- [x] Create CountryFlag component for rendering country flags
- [x] Create countries data file with Cameroon (extensible)
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

## Session Log - Tue Jan 27, 2026 (New Session)

### Project Study Complete (New Session)
- **Cloned repository** from `https://github.com/Malicious-Bunny/njambe.git`
- **Studied todos.md** - Comprehensive project briefing complete
- **Studied react-native-reusables.md** - Component library reference reviewed
- **Dependencies installed** with pnpm (765 packages)
- **Ready to receive instructions** for next tasks

### Key Project Understanding:
1. **App Name**: njambe - a clone of RingTwice adapted for Cameroon
2. **Framework**: Expo SDK 54 with React Native 0.81.5, Expo Router v6
3. **Styling**: NativeWind (Tailwind CSS for React Native)
4. **UI Library**: React Native Reusables (shadcn/ui port for React Native)
5. **Design System**: Zinc color theme with full light/dark mode support
6. **Package Manager**: pnpm
7. **Currency/Context**: XAF (Cameroonian Franc), French/English languages

### Project Screens Implemented:
1. **Start Screen** - Landing with logo, service provider carousel, CTAs
2. **Login Screen** - Email/password with social login options
3. **Customer Signup** - Email/social signup options
4. **Customer Tabs** - 5 tabs (Requests, Service, Notifications, Messages, Account)
5. **Provider Home** - Stats, quick actions, job listings
6. **Provider Onboarding** - 3-slide swipeable onboarding flow

### Pending Tasks from Previous Session:
- [ ] Add Input component from React Native Reusables for forms
- [ ] Build provider join/signup screen (when "I'm looking for jobs" is clicked)
- [ ] Build out individual tab screens with content

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

## Session Log - Tue Jan 27, 2026 (New Session - Project Study)

### Project Cloned and Studied
1. **Cloned repository** from `https://github.com/Malicious-Bunny/njambe.git`
2. **Read todos.md** - Full project briefing understood
3. **Read react-native-reusables.md** - Component library reference understood
4. **Studied key project files:**
   - `package.json` - Expo SDK 54, React Native 0.81.5, NativeWind, Lucide icons
   - `app/_layout.tsx` - Root layout with Stack navigation, ThemeProvider, PortalHost
   - `app/index.tsx` - Start screen with logo, carousel, CTAs
   - `app/auth/login.tsx` - Login screen with email/password form
   - `app/(customer)/(tabs)/index.tsx` - Service screen with categories grid
   - `app/(provider)/index.tsx` - Provider home with stats and actions
   - `app/(provider)/onboarding.tsx` - 3-slide swipeable onboarding flow
   - `lib/theme.ts` - Zinc theme configuration
   - `global.css` - CSS variables for light/dark themes
   - Various custom components in `components/custom/`
5. **Installed dependencies** with pnpm (765 packages)

### Project Understanding Summary

**njambe** is a React Native Expo app that clones the RingTwice business model for Cameroon:
- Neighborhood-based services marketplace connecting users with local service providers
- Two user modes: **Customer** (needs services) and **Provider** (offers services)
- Currency: XAF (Central African CFA franc)
- Languages: French/English

**Tech Stack:**
- Expo SDK 54 with React Native 0.81.5
- Expo Router v6 for navigation
- NativeWind (Tailwind CSS for React Native)
- React Native Reusables (shadcn/ui port)
- Lucide React Native for icons
- React Native Reanimated for animations
- pnpm as package manager

**Design System:**
- Zinc color theme with full light/dark mode support
- CSS variables in `global.css`
- Theme constants in `lib/theme.ts`

**Current Screens:**
1. **Start Screen** - Landing with logo, service provider carousel, CTAs
2. **Login Screen** - Email/password with social login options
3. **Customer Signup** - Email/social signup options
4. **Customer Tabs** - 5 tabs (Requests, Service, Notifications, Messages, Account)
5. **Provider Home** - Stats, quick actions, job listings
6. **Provider Onboarding** - 3-slide swipeable onboarding flow

**Pending Tasks:**
- [ ] Add Input component from React Native Reusables for forms
- [ ] Build provider join/signup screen (when "I'm looking for jobs" is clicked)
- [ ] Build out individual tab screens with content

### Ready for Instructions
Project is set up and ready for development. Awaiting user instructions for next tasks.

## Session Log - Tue Jan 27, 2026 (New Session - Full Project Study)

### Project Cloned and Studied
1. **Cloned repository** from `https://github.com/Malicious-Bunny/njambe.git`
2. **Read todos.md** - Full project briefing and history understood
3. **Read react-native-reusables.md** - Component library patterns and CLI commands understood
4. **Dependencies installed** with pnpm (765 packages)

### Files Reviewed:
- `package.json` - Expo SDK 54, React Native 0.81.5, NativeWind, iconoir-react-native, Lucide icons
- `app/_layout.tsx` - Root layout with Stack navigation, ThemeProvider, PortalHost
- `app/index.tsx` - Start/Landing screen with logo, carousel, CTAs
- `app/auth/login.tsx` - Login screen with underline-style inputs, social login icons
- `app/(customer)/index.tsx` - Customer signup screen with email/social options
- `app/(customer)/(tabs)/index.tsx` - Service screen with categories grid
- `app/(customer)/(tabs)/_layout.tsx` - 5-tab navigation with special center button
- `app/(provider)/index.tsx` - Provider home with stats and quick actions
- `app/(provider)/onboarding.tsx` - 3-slide swipeable onboarding flow
- `lib/theme.ts` - Zinc theme configuration with light/dark mode
- `global.css` - CSS variables for NativeWind theming
- `lib/customer/categories.ts` - Service categories data
- `lib/start/service-providers.ts` - Service provider card data
- `lib/provider/onboarding-data.ts` - Onboarding slides data (Cameroon context)
- `components/custom/start/NjambeLogo.tsx` - Branded logo component
- `components/custom/start/ServiceProviderCard.tsx` - Card with Badge component
- `components/custom/shared/Header.tsx` - Reusable header with back/notification

### Project Understanding Summary

**njambe** is a React Native Expo app that clones the RingTwice business model for Cameroon:
- **Purpose**: Neighborhood-based services marketplace connecting users with local service providers
- **Two user modes**: Customer (needs services) and Provider (offers services)
- **Currency**: XAF (Central African CFA franc)
- **Languages**: French/English (with flag selector)

**Tech Stack:**
| Technology | Version/Details |
|------------|-----------------|
| Expo SDK | 54 |
| React Native | 0.81.5 |
| Expo Router | v6 (file-based routing) |
| NativeWind | v4.2.1 (Tailwind for RN) |
| React Native Reusables | shadcn/ui port for React Native |
| Icons | iconoir-react-native + lucide-react-native |
| Animations | React Native Reanimated 4.1.1 |
| Package Manager | pnpm |

**Design System (Zinc Theme):**
| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| background | white | zinc-950 |
| foreground | zinc-950 | zinc-50 |
| primary | zinc-900 | zinc-50 |
| secondary | zinc-100 | zinc-800 |
| muted | zinc-100 | zinc-800 |
| border | zinc-200 | zinc-800 |
| card | white | zinc-900 |

**Current Screens:**
1. **Start Screen** (`app/index.tsx`) - Landing with logo, service provider carousel, 2 CTAs
2. **Login Screen** (`app/auth/login.tsx`) - Underline inputs, social icons, create account
3. **Customer Signup** (`app/(customer)/index.tsx`) - Email/social signup options
4. **Customer Tabs** (`app/(customer)/(tabs)/`) - 5 tabs (Requests, Service, Notifications, Messages, Account)
5. **Provider Home** (`app/(provider)/index.tsx`) - Stats, quick actions, job listings
6. **Provider Onboarding** (`app/(provider)/onboarding.tsx`) - 3-slide swipeable onboarding flow

**Component Organization Pattern:**
```
components/
├── ui/                     # React Native Reusables (shadcn-style)
│   ├── button.tsx
│   ├── text.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   └── separator.tsx
└── custom/                 # Custom page-specific components
    ├── start/              # Start screen components
    ├── customer/           # Customer-specific components
    ├── provider/           # Provider-specific components
    │   └── onboarding/     # Onboarding slide components
    └── shared/             # Shared components (Header, LocationSelector, etc.)

lib/
├── utils.ts               # cn() utility
├── theme.ts               # Theme configuration
├── start/                 # Start screen data
├── customer/              # Customer data (categories)
└── provider/              # Provider data (onboarding)
```

**Pending Tasks:**
- [ ] Add Input component from React Native Reusables for forms
- [ ] Build provider join/signup screen (after onboarding)
- [ ] Build out individual tab screens with content

### Important Notes:
1. **This is a React Native Expo project** - Cannot preview in web browser in Same
2. **Use React Native Reusables CLI**: `npx @react-native-reusables/cli@latest add [component-name]`
3. **Package manager**: pnpm
4. **Follow Code Organization Pattern** when adding new pages/components
5. **PortalHost** is already set up in root layout for dialogs/popovers

### Ready for Instructions
Project is fully studied and dependencies are installed. Awaiting user instructions for next tasks.

## Session Log - Wed Jan 28, 2026 (New Session - Project Study)

### Project Cloned and Studied
1. **Cloned repository** from `https://github.com/Malicious-Bunny/njambe.git`
2. **Read todos.md** - Full project briefing and history understood
3. **Read react-native-reusables.md** - Component library patterns and CLI commands understood
4. **Dependencies installed** with pnpm (765 packages)

### Files Reviewed:
- `package.json` - Expo SDK 54, React Native 0.81.5, NativeWind, iconoir-react-native, Lucide icons
- `app/_layout.tsx` - Root layout with Stack navigation, ThemeProvider, PortalHost
- `app/index.tsx` - Start/Landing screen with logo, carousel, CTAs
- `app/auth/login.tsx` - Login screen with underline-style inputs, social login icons
- `app/(customer)/index.tsx` - Customer signup screen with full form (name, email, password, country, checkbox)
- `app/(customer)/(tabs)/index.tsx` - Service screen with categories grid
- `app/(customer)/(tabs)/_layout.tsx` - 5-tab navigation with special center button
- `app/(provider)/index.tsx` - Provider home with stats and quick actions
- `app/(provider)/onboarding.tsx` - 3-slide swipeable onboarding flow
- `lib/theme.ts` - Zinc theme configuration with light/dark mode
- `global.css` - CSS variables for NativeWind theming

### Project Understanding Summary

**njambe** is a React Native Expo app that clones the RingTwice business model for Cameroon:
- **Purpose**: Neighborhood-based services marketplace connecting users with local service providers
- **Two user modes**: Customer (needs services) and Provider (offers services)
- **Currency**: XAF (Central African CFA franc)
- **Languages**: French/English (with flag selector)

**Tech Stack:**
| Technology | Version/Details |
|------------|-----------------|
| Expo SDK | 54 |
| React Native | 0.81.5 |
| Expo Router | v6 (file-based routing) |
| NativeWind | v4.2.1 (Tailwind for RN) |
| React Native Reusables | shadcn/ui port for React Native |
| Icons | iconoir-react-native + lucide-react-native |
| Animations | React Native Reanimated 4.1.1 |
| Package Manager | pnpm |

**Design System (Zinc Theme):**
| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| background | white | zinc-950 |
| foreground | zinc-950 | zinc-50 |
| primary | zinc-900 | zinc-50 |
| secondary | zinc-100 | zinc-800 |
| muted | zinc-100 | zinc-800 |
| border | zinc-200 | zinc-800 |
| card | white | zinc-900 |

**Current Screens:**
1. **Start Screen** (`app/index.tsx`) - Landing with logo, service provider carousel, 2 CTAs
2. **Login Screen** (`app/auth/login.tsx`) - Underline inputs, social icons, create account
3. **Customer Signup** (`app/(customer)/index.tsx`) - Full form with country selector
4. **Customer Tabs** (`app/(customer)/(tabs)/`) - 5 tabs (Requests, Service, Notifications, Messages, Account)
5. **Provider Home** (`app/(provider)/index.tsx`) - Stats, quick actions, job listings
6. **Provider Onboarding** (`app/(provider)/onboarding.tsx`) - 3-slide component switcher

**Pending Tasks:**
- [ ] Add Input component from React Native Reusables for forms
- [ ] Build provider join/signup screen (after onboarding)
- [ ] Build out individual tab screens with content

### Important Notes:
1. **This is a React Native Expo project** - Cannot preview in web browser in Same
2. **Use React Native Reusables CLI**: `npx @react-native-reusables/cli@latest add [component-name]`
3. **Package manager**: pnpm
4. **Follow Code Organization Pattern** when adding new pages/components
5. **PortalHost** is already set up in root layout for dialogs/popovers

### Ready for Instructions
Project is fully studied and dependencies are installed. Awaiting user instructions for next tasks.

## Session Log - Wed Jan 28, 2026 (New Session - Customer Signup Form Implementation)

### Customer Signup Form Implemented
Created a full signup form page for customers based on the provided screenshots.

**Files Created:**
1. `lib/customer/countries.ts` - Country data with Cameroon (extensible for more countries)
2. `components/custom/customer/CountryFlag.tsx` - Dynamic flag renderer component
3. `components/custom/customer/CountrySelector.tsx` - Country selector with modal picker

**Files Updated:**
1. `app/(customer)/index.tsx` - Replaced simple options with full signup form
2. `components/custom/customer/index.ts` - Added new component exports

**Features Implemented:**
- First name input with underline style
- Last name input with underline style
- Email input with underline style
- Password input with visibility toggle (Eye/EyeClosed icons)
- Country selector with modal bottom sheet
- Newsletter/promotions checkbox
- Google signup button
- Primary "Sign up" button (disabled when form invalid)
- Terms & Conditions and Privacy Policy links
- KeyboardAvoidingView for proper keyboard handling
- Full Zinc theme support (light/dark mode)
- All iconoir icons used (EyeClosed, Eye, Google, Check, NavArrowDown, Xmark)

**Country Selector Features:**
- Modal bottom sheet with radio button selection
- Country flag display with vertical stripes
- Cameroon flag with green, red, yellow stripes
- Extensible structure - just add countries to COUNTRIES array
- Confirm button to apply selection

**Design System Compliance:**
- Uses Zinc theme tokens throughout
- Dynamic colors based on useColorScheme hook
- No hardcoded colors from the reference images
- Proper dark mode support

### Changes Made - Wed Jan 28, 2026

#### 1. Country Flags - Switched to Emoji Flags
**Files Updated:**
- `lib/customer/countries.ts` - Simplified Country interface to use `emoji` field instead of complex `flag` object with stripes
- `components/custom/customer/CountryFlag.tsx` - Simplified component to render emoji text instead of drawing flags with boxes

**Before:**
```typescript
flag: {
  stripes: ['#007A5E', '#CE1126', '#FCD116'],
  hasSymbol: true,
  symbolColor: '#FCD116',
}
```

**After:**
```typescript
emoji: '🇨🇲'
```

#### 2. Form Validation - Added Zod
**File Updated:** `app/(customer)/index.tsx`

**Features Added:**
- Installed `zod` package
- Created Zod schema for signup form validation
- Validation rules:
  - First name: required, min 2 characters
  - Last name: required, min 2 characters
  - Email: required, valid email format
  - Password: required, min 8 characters, must contain uppercase letter and number
- Field-level validation on blur (shows error after user leaves field)
- Form-level validation on submit
- Error messages displayed below each field
- Red border on fields with errors
- Sign up button disabled until form is valid

### Current Tasks Status
- [x] Use emoji flags instead of drawing with boxes
- [x] Add Zod for form validation
- [ ] Add Input component from React Native Reusables for forms
- [ ] Build provider join/signup screen (after onboarding)
- [ ] Build out individual tab screens with content

## Session Log - Wed Jan 28, 2026 (New Session - Full Project Study)

### Project Cloned and Studied
1. **Cloned repository** from `https://github.com/Malicious-Bunny/njambe.git`
2. **Read todos.md** - Full project briefing and history understood (882 lines)
3. **Read react-native-reusables.md** - Component library patterns and CLI commands understood
4. **Dependencies installed** with pnpm (766 packages)

### Files Reviewed:
**Core Configuration:**
- `package.json` - Expo SDK 54, React Native 0.81.5, NativeWind, iconoir-react-native, Lucide icons, Zod for validation
- `app/_layout.tsx` - Root layout with Stack navigation, ThemeProvider, PortalHost
- `global.css` - CSS variables for Zinc light/dark themes
- `lib/theme.ts` - Zinc theme configuration with NAV_THEME export

**Screen Files:**
- `app/index.tsx` - Start/Landing screen with NjambeLogo, ServiceProvidersCarousel, 2 CTAs
- `app/auth/login.tsx` - Login screen with underline-style inputs, social login icons (Google, Facebook, Apple)
- `app/(customer)/index.tsx` - Customer signup screen with full form (name, email, password, country, checkbox) + Zod validation
- `app/(customer)/(tabs)/_layout.tsx` - 5-tab navigation (Requests, Service, Notifications, Messages, Account)
- `app/(customer)/(tabs)/index.tsx` - Service screen with categories grid
- `app/(provider)/index.tsx` - Provider home with stats and quick actions
- `app/(provider)/onboarding.tsx` - 3-slide swipeable onboarding flow with FlatList

**Data/Lib Files:**
- `lib/customer/categories.ts` - 8 service categories with emoji icons
- `lib/customer/countries.ts` - Country data (Cameroon) with emoji flags
- `lib/start/service-providers.ts` - 3 service provider cards with Unsplash images
- `lib/provider/onboarding-data.ts` - Onboarding slides data for Cameroon (XAF currency)

**Custom Components:**
- `components/custom/start/NjambeLogo.tsx` - Branded logo with dot pattern
- `components/custom/start/LanguageSelector.tsx` - UK/French flag toggle
- `components/custom/start/ServiceProvidersCarousel.tsx` - Fanned card carousel
- `components/custom/customer/CountrySelector.tsx` - Modal bottom sheet country picker
- `components/custom/customer/CountryFlag.tsx` - Emoji flag renderer
- `components/custom/shared/Header.tsx` - Reusable header with back/notification

### Project Understanding Summary

**njambe** is a React Native Expo app that clones the RingTwice business model for Cameroon:
- **Purpose**: Neighborhood-based services marketplace connecting users with local service providers
- **Two user modes**: Customer (needs services) and Provider (offers services)
- **Currency**: XAF (Central African CFA franc)
- **Languages**: French/English (with flag selector)

**Tech Stack:**
| Technology | Version/Details |
|------------|-----------------|
| Expo SDK | 54 |
| React Native | 0.81.5 |
| Expo Router | v6 (file-based routing) |
| NativeWind | v4.2.1 (Tailwind for RN) |
| React Native Reusables | shadcn/ui port for React Native |
| Icons | iconoir-react-native + lucide-react-native |
| Animations | React Native Reanimated 4.1.1 |
| Validation | Zod 4.3.6 |
| Package Manager | pnpm |

**Design System (Zinc Theme):**
| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| background | white | zinc-950 |
| foreground | zinc-950 | zinc-50 |
| primary | zinc-900 | zinc-50 |
| secondary | zinc-100 | zinc-800 |
| muted | zinc-100 | zinc-800 |
| border | zinc-200 | zinc-800 |
| card | white | zinc-900 |

**Current Screens:**
1. **Start Screen** (`app/index.tsx`) - Landing with logo, service provider carousel, 2 CTAs
2. **Login Screen** (`app/auth/login.tsx`) - Underline inputs, social icons, create account
3. **Customer Signup** (`app/(customer)/index.tsx`) - Full form with Zod validation
4. **Customer Tabs** (`app/(customer)/(tabs)/`) - 5 tabs (Requests, Service, Notifications, Messages, Account)
5. **Provider Home** (`app/(provider)/index.tsx`) - Stats, quick actions, job listings
6. **Provider Onboarding** (`app/(provider)/onboarding.tsx`) - 3-slide swipeable onboarding flow

**Pending Tasks:**
- [ ] Add Input component from React Native Reusables for forms
- [ ] Build provider join/signup screen (after onboarding)
- [ ] Build out individual tab screens with content

### Important Notes:
1. **This is a React Native Expo project** - Cannot preview in web browser in Same
2. **Use React Native Reusables CLI**: `npx @react-native-reusables/cli@latest add [component-name]`
3. **Package manager**: pnpm
4. **Follow Code Organization Pattern** when adding new pages/components
5. **PortalHost** is already set up in root layout for dialogs/popovers

### Ready for Instructions
Project is fully studied and dependencies are installed. Awaiting user instructions for next tasks.

### Change Made - Wed Jan 28, 2026

**Customer Signup Button Behavior Fix:**

**Before:**
- Signup button was disabled until ALL Zod validation criteria were met
- Users couldn't click the button to see what was wrong

**After:**
- Signup button is enabled once ANY input field has content
- Clicking "Sign up" marks all fields as touched and runs validation
- Error messages appear under fields that don't meet Zod criteria
- Better UX - users can attempt to submit and see what needs fixing

**Code Changes:**
- Changed `isFormValid` to `hasAnyInput` - checks if any field has content instead of full validation
- Updated button disabled state and styling to use `hasAnyInput`
- Existing `handleSignup` already marks all fields as touched and validates on submit

### Changes Made - Wed Jan 28, 2026 (Login & Language Selector)

**1. Login Screen - Social Icons:**
- Replaced Facebook icon with LinkedIn icon
- Import changed from `Facebook` to `Linkedin` from iconoir-react-native

**2. Language Selector Component:**
- Changed UK flag to USA flag (red/white stripes with blue canton)
- Removed border from both flags
- Removed shadow (`shadow-sm`) from the component
- Changed background from `bg-secondary` to `bg-background` (same as main background)
- Changed active state from `active:bg-accent` to `active:opacity-70`

## Standing by for further instructions

## Session Log - Wed Jan 28, 2026 (New Session - Full Project Study & Briefing)

### Project Cloned and Studied
1. **Cloned repository** from `https://github.com/Malicious-Bunny/njambe.git`
2. **Read todos.md** - Full project briefing and comprehensive history understood (1086 lines)
3. **Read react-native-reusables.md** - Component library patterns and CLI commands understood
4. **Dependencies installed** with pnpm (766 packages)

### Files Reviewed:
**Core Configuration:**
- `package.json` - Expo SDK 54, React Native 0.81.5, NativeWind 4.2.1, iconoir-react-native, Lucide icons, Zod 4.3.6
- `app/_layout.tsx` - Root layout with Stack navigation, ThemeProvider, PortalHost
- `global.css` - CSS variables for Zinc light/dark themes
- `lib/theme.ts` - Zinc theme configuration with NAV_THEME, COLORS, THEME exports

**Screen Files:**
- `app/index.tsx` - Start/Landing screen with NjambeLogo, ServiceProvidersCarousel, 2 CTAs
- `app/auth/login.tsx` - Login screen with underline-style inputs, social icons (Google, LinkedIn, Apple)
- `app/(customer)/index.tsx` - Customer signup screen with full form (name, email, password, country, checkbox) + Zod validation
- `app/(customer)/(tabs)/_layout.tsx` - 5-tab navigation (Requests, Service, Notifications, Messages, Account)
- `app/(customer)/(tabs)/index.tsx` - Service screen with categories grid
- `app/(provider)/index.tsx` - Provider home with stats and quick actions
- `app/(provider)/onboarding.tsx` - 3-slide swipeable onboarding flow with FlatList

**Data/Lib Files:**
- `lib/customer/categories.ts` - 8 service categories with emoji icons
- `lib/customer/countries.ts` - Country data (Cameroon) with emoji flags
- `lib/start/service-providers.ts` - 3 service provider cards with Unsplash images
- `lib/provider/onboarding-data.ts` - Onboarding slides data (Cameroon context, XAF currency)

**UI Components:**
- `components/ui/button.tsx` - Button with variants (default, destructive, outline, secondary, ghost, link)
- `components/ui/text.tsx` - Text with variants (h1, h2, h3, h4, p, etc.)
- `components/ui/card.tsx` - Card with CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- `components/ui/badge.tsx` - Badge with variants
- `components/ui/separator.tsx` - Separator component

### Project Understanding Summary

**njambe** is a React Native Expo app that clones the RingTwice business model for Cameroon:
- **Purpose**: Neighborhood-based services marketplace connecting users with local service providers
- **Two user modes**: Customer (needs services) and Provider (offers services)
- **Currency**: XAF (Central African CFA franc)
- **Languages**: French/English (with flag selector)

**Tech Stack:**
| Technology | Version/Details |
|------------|-----------------|
| Expo SDK | 54 |
| React Native | 0.81.5 |
| Expo Router | v6 (file-based routing) |
| NativeWind | v4.2.1 (Tailwind for RN) |
| React Native Reusables | shadcn/ui port for React Native |
| Icons | iconoir-react-native + lucide-react-native |
| Animations | React Native Reanimated 4.1.1 |
| Validation | Zod 4.3.6 |
| Package Manager | pnpm |

**Design System (Zinc Theme):**
| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| background | white | zinc-950 |
| foreground | zinc-950 | zinc-50 |
| primary | zinc-900 | zinc-50 |
| secondary | zinc-100 | zinc-800 |
| muted | zinc-100 | zinc-800 |
| border | zinc-200 | zinc-800 |
| card | white | zinc-900 |

**Current Screens:**
1. **Start Screen** (`app/index.tsx`) - Landing with logo, service provider carousel, 2 CTAs
2. **Login Screen** (`app/auth/login.tsx`) - Underline inputs, social icons, create account
3. **Customer Signup** (`app/(customer)/index.tsx`) - Full form with Zod validation
4. **Customer Tabs** (`app/(customer)/(tabs)/`) - 5 tabs (Requests, Service, Notifications, Messages, Account)
5. **Provider Home** (`app/(provider)/index.tsx`) - Stats, quick actions, job listings
6. **Provider Onboarding** (`app/(provider)/onboarding.tsx`) - 3-slide swipeable onboarding flow

**Pending Tasks:**
- [ ] Add Input component from React Native Reusables for forms
- [ ] Build provider join/signup screen (after onboarding)
- [ ] Build out individual tab screens with content

### Important Notes:
1. **This is a React Native Expo project** - Cannot preview in web browser in Same
2. **Use React Native Reusables CLI**: `npx @react-native-reusables/cli@latest add [component-name]`
3. **Package manager**: pnpm
4. **Follow Code Organization Pattern** when adding new pages/components
5. **PortalHost** is already set up in root layout for dialogs/popovers

### Ready for Instructions
Project is fully studied and dependencies are installed. Awaiting user instructions for next tasks.

## Session Log - Wed Jan 28, 2026 (Supabase Authentication Implementation)

### Supabase SDK Integration Complete

**Packages Installed:**
- `@supabase/supabase-js` - Supabase JavaScript client
- `expo-secure-store` - Secure storage for auth tokens on native
- `react-native-url-polyfill` - URL polyfill for React Native

**Files Created:**
1. `lib/supabase.ts` - Supabase client configuration with SecureStore adapter
2. `.env.example` - Example environment variables for Supabase credentials
3. `.same/supabase-setup.sql` - SQL migration script for profiles table

**Files Updated:**
1. `lib/stores/auth-store.ts` - Complete rewrite with Supabase authentication:
   - `initialize()` - Initialize auth state on app start, listen for auth changes
   - `login()` - Sign in with email/password via Supabase
   - `signup()` - Create account with Supabase + create profile in database
   - `socialLogin()` - OAuth login (Google, Apple, LinkedIn)
   - `logout()` - Sign out via Supabase
   - `refreshSession()` - Refresh auth token
   - Added `session` and `isInitialized` state
   - All methods now return `{ success: boolean; error?: string }`
   - Mock mode for development when Supabase is not configured

2. `components/custom/shared/SignupForm.tsx`:
   - Added error handling for async signup responses
   - Added error banner display for auth errors
   - Added Alert dialogs for failed signup attempts
   - Added placeholder text to all inputs
   - Added password requirements hint
   - Clear auth errors when form changes

3. `app/auth/login.tsx`:
   - Added error handling for async login responses
   - Added error banner display
   - Added local loginError state
   - Added form validation before submit
   - Added forgot password alert placeholder
   - Clear errors when form changes

4. `app/_layout.tsx`:
   - Added auth initialization on app start
   - Added loading screen while auth initializes
   - Shows ActivityIndicator during initialization

### Supabase Setup Instructions

**1. Create Supabase Project:**
- Go to https://supabase.com
- Create a new project

**2. Get API Credentials:**
- Go to Settings > API
- Copy URL and anon key

**3. Create `.env` file:**
```bash
cp .env.example .env
# Edit .env and add your credentials
```

**4. Run Database Migration:**
- Go to SQL Editor in Supabase Dashboard
- Copy contents of `.same/supabase-setup.sql`
- Run the query

**5. Enable Email Authentication:**
- Go to Authentication > Providers
- Ensure Email is enabled

**6. (Optional) Enable OAuth Providers:**
- Google: Authentication > Providers > Google
- Apple: Authentication > Providers > Apple
- LinkedIn: Authentication > Providers > LinkedIn

### Features Implemented:
- [x] Email/password signup with Supabase Auth
- [x] Email/password login with Supabase Auth
- [x] User profile creation in database
- [x] Persistent session with SecureStore (native) / localStorage (web)
- [x] Auto session refresh
- [x] Auth state change listener
- [x] Error handling with user-friendly messages
- [x] Loading states during auth operations
- [x] Mock mode for development without Supabase

### Pending:
- [ ] Password reset functionality
- [ ] Email verification flow
- [ ] OAuth deep linking for mobile
- [ ] Profile update functionality

### Current Tasks Status
- [x] Implement Supabase authentication for signup
- [x] Implement Supabase authentication for login
- [ ] Add Input component from React Native Reusables for forms
- [ ] Build out individual tab screens with content

## Session Log - Wed Jan 28, 2026 (New Session - Full Project Study)

### Project Cloned and Studied
1. **Cloned repository** from `https://github.com/Malicious-Bunny/njambe.git`
2. **Read todos.md** - Full project briefing and history understood (1086 lines)
3. **Read react-native-reusables.md** - Component library patterns and CLI commands understood
4. **Dependencies installed** with pnpm (766 packages)

### Files Reviewed:
**Core Configuration:**
- `package.json` - Expo SDK 54, React Native 0.81.5, NativeWind 4.2.1, iconoir-react-native, Lucide icons, Zod 4.3.6
- `app/_layout.tsx` - Root layout with Stack navigation, ThemeProvider, PortalHost
- `global.css` - CSS variables for Zinc light/dark themes
- `lib/theme.ts` - Zinc theme configuration with NAV_THEME, COLORS, THEME exports

**Screen Files:**
- `app/index.tsx` - Start/Landing screen with NjambeLogo, ServiceProvidersCarousel, 2 CTAs
- `app/auth/login.tsx` - Login screen with underline-style inputs, social icons (Google, LinkedIn, Apple)
- `app/(customer)/index.tsx` - Customer signup screen with full form (name, email, password, country, checkbox) + Zod validation
- `app/(customer)/(tabs)/_layout.tsx` - 5-tab navigation (Requests, Service, Notifications, Messages, Account)
- `app/(customer)/(tabs)/index.tsx` - Service screen with categories grid
- `app/(provider)/index.tsx` - Provider home with stats and quick actions
- `app/(provider)/onboarding.tsx` - 3-slide swipeable onboarding flow with FlatList

**Data/Lib Files:**
- `lib/customer/categories.ts` - 8 service categories with emoji icons
- `lib/customer/countries.ts` - Country data (Cameroon) with emoji flags
- `lib/start/service-providers.ts` - 3 service provider cards with Unsplash images
- `lib/provider/onboarding-data.ts` - Onboarding slides data (Cameroon context, XAF currency)

**UI Components:**
- `components/ui/button.tsx` - Button with variants (default, destructive, outline, secondary, ghost, link)
- `components/ui/text.tsx` - Text with variants (h1, h2, h3, h4, p, etc.)
- `components/ui/card.tsx` - Card with CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- `components/ui/badge.tsx` - Badge with variants
- `components/ui/separator.tsx` - Separator component

### Project Understanding Summary

**njambe** is a React Native Expo app that clones the RingTwice business model for Cameroon:
- **Purpose**: Neighborhood-based services marketplace connecting users with local service providers
- **Two user modes**: Customer (needs services) and Provider (offers services)
- **Currency**: XAF (Central African CFA franc)
- **Languages**: French/English (with flag selector)

**Tech Stack:**
| Technology | Version/Details |
|------------|-----------------|
| Expo SDK | 54 |
| React Native | 0.81.5 |
| Expo Router | v6 (file-based routing) |
| NativeWind | v4.2.1 (Tailwind for RN) |
| React Native Reusables | shadcn/ui port for React Native |
| Icons | iconoir-react-native + lucide-react-native |
| Animations | React Native Reanimated 4.1.1 |
| Validation | Zod 4.3.6 |
| Package Manager | pnpm |

**Design System (Zinc Theme):**
| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| background | white | zinc-950 |
| foreground | zinc-950 | zinc-50 |
| primary | zinc-900 | zinc-50 |
| secondary | zinc-100 | zinc-800 |
| muted | zinc-100 | zinc-800 |
| border | zinc-200 | zinc-800 |
| card | white | zinc-900 |

**Current Screens:**
1. **Start Screen** (`app/index.tsx`) - Landing with logo, service provider carousel, 2 CTAs
2. **Login Screen** (`app/auth/login.tsx`) - Underline inputs, social icons, create account
3. **Customer Signup** (`app/(customer)/index.tsx`) - Full form with Zod validation
4. **Customer Tabs** (`app/(customer)/(tabs)/`) - 5 tabs (Requests, Service, Notifications, Messages, Account)
5. **Provider Home** (`app/(provider)/index.tsx`) - Stats, quick actions, job listings
6. **Provider Onboarding** (`app/(provider)/onboarding.tsx`) - 3-slide swipeable onboarding flow

**Pending Tasks:**
- [ ] Add Input component from React Native Reusables for forms
- [ ] Build provider join/signup screen (after onboarding)
- [ ] Build out individual tab screens with content

### Important Notes:
1. **This is a React Native Expo project** - Cannot preview in web browser in Same
2. **Use React Native Reusables CLI**: `npx @react-native-reusables/cli@latest add [component-name]`
3. **Package manager**: pnpm
4. **Follow Code Organization Pattern** when adding new pages/components
5. **PortalHost** is already set up in root layout for dialogs/popovers

### Ready for Instructions
Project is fully studied and dependencies are installed. Awaiting user instructions for next tasks.

## Session Log - Wed Jan 28, 2026 (Auth Store Removal & Direct Supabase SDK)

### Changes Made

**1. Removed Auth Store Entirely:**
- Deleted `lib/stores/auth-store.ts`
- Updated `lib/stores/index.ts` to remove auth-store export
- Auth state is now managed directly by Supabase SDK

**2. Updated Supabase Configuration:**
- Added user's Supabase credentials to `lib/supabase.ts`:
  - URL: `https://kumbvpzqtagbpocwnrxv.supabase.co`
  - Anon Key: `sb_secret_aQu1WA5i05bBfRCDW7TiDA_N6aVoUj2`
- Removed `isSupabaseConfigured()` helper (no longer needed)

**3. Updated Root Layout (`app/_layout.tsx`):**
- Removed `useAuthStore` import
- Added local `isInitialized` state with `useState`
- Uses `supabase.auth.getSession()` directly for initialization
- Added `supabase.auth.onAuthStateChange()` listener with cleanup

**4. Updated Login Screen (`app/auth/login.tsx`):**
- Removed `useAuthStore` import
- Added local `isLoading` state
- Uses `supabase.auth.signInWithPassword()` directly
- Uses `supabase.auth.signInWithOAuth()` directly for social login
- All error handling done locally

**5. Updated SignupForm (`components/custom/shared/SignupForm.tsx`):**
- Removed `useAuthStore` import
- Added local `isLoading` and `authError` state
- Uses `supabase.auth.signUp()` directly
- Creates profile in `profiles` table after signup
- Uses `supabase.auth.signInWithOAuth()` for Google signup
- Exported `UserRole` type from this file

**6. Updated Shared Index:**
- `components/custom/shared/index.ts` now exports `UserRole` type

### Files Modified:
- `lib/supabase.ts` - Added credentials, removed isSupabaseConfigured
- `lib/stores/index.ts` - Removed auth-store export
- `app/_layout.tsx` - Direct Supabase SDK usage
- `app/auth/login.tsx` - Direct Supabase SDK usage
- `components/custom/shared/SignupForm.tsx` - Direct Supabase SDK usage
- `components/custom/shared/index.ts` - Export UserRole type

### Files Deleted:
- `lib/stores/auth-store.ts`

### Current Auth Flow:
1. App starts → `_layout.tsx` calls `supabase.auth.getSession()`
2. Login → Uses `supabase.auth.signInWithPassword()` directly
3. Signup → Uses `supabase.auth.signUp()` directly + creates profile
4. Social Login → Uses `supabase.auth.signInWithOAuth()` directly
5. Session persistence handled by Supabase SDK with SecureStore adapter

### Supabase Database Requirements:
The app expects a `profiles` table with this structure:
```sql
create table profiles (
  id uuid references auth.users primary key,
  first_name text,
  last_name text,
  email text,
  country_code text,
  country_name text,
  role text check (role in ('customer', 'provider')),
  accepts_promos boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

### Ready for Testing
- All auth functionality now uses Supabase SDK directly
- No more Zustand auth store
- State managed by Supabase's built-in session management

## Session Log - Wed Jan 28, 2026 (New Session - Full Project Study)

### Project Cloned and Studied
1. **Cloned repository** from `https://github.com/Malicious-Bunny/njambe.git`
2. **Read todos.md** - Full project briefing and history understood (1086 lines)
3. **Read react-native-reusables.md** - Component library patterns and CLI commands understood
4. **Dependencies installed** with pnpm (766 packages)

### Files Reviewed:
**Core Configuration:**
- `package.json` - Expo SDK 54, React Native 0.81.5, NativeWind 4.2.1, iconoir-react-native, Lucide icons, Zod 4.3.6
- `app/_layout.tsx` - Root layout with Stack navigation, ThemeProvider, PortalHost
- `global.css` - CSS variables for Zinc light/dark themes
- `lib/theme.ts` - Zinc theme configuration with NAV_THEME, COLORS, THEME exports

**Screen Files:**
- `app/index.tsx` - Start/Landing screen with NjambeLogo, ServiceProvidersCarousel, 2 CTAs
- `app/auth/login.tsx` - Login screen with underline-style inputs, social icons (Google, LinkedIn, Apple)
- `app/(customer)/index.tsx` - Customer signup screen with full form (name, email, password, country, checkbox) + Zod validation
- `app/(customer)/(tabs)/_layout.tsx` - 5-tab navigation (Requests, Service, Notifications, Messages, Account)
- `app/(customer)/(tabs)/index.tsx` - Service screen with categories grid
- `app/(provider)/index.tsx` - Provider home with stats and quick actions
- `app/(provider)/onboarding.tsx` - 3-slide swipeable onboarding flow with FlatList

**Data/Lib Files:**
- `lib/customer/categories.ts` - 8 service categories with emoji icons
- `lib/customer/countries.ts` - Country data (Cameroon) with emoji flags
- `lib/start/service-providers.ts` - 3 service provider cards with Unsplash images
- `lib/provider/onboarding-data.ts` - Onboarding slides data (Cameroon context, XAF currency)

**UI Components:**
- `components/ui/button.tsx` - Button with variants (default, destructive, outline, secondary, ghost, link)
- `components/ui/text.tsx` - Text with variants (h1, h2, h3, h4, p, etc.)
- `components/ui/card.tsx` - Card with CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- `components/ui/badge.tsx` - Badge with variants
- `components/ui/separator.tsx` - Separator component

### Project Understanding Summary

**njambe** is a React Native Expo app that clones the RingTwice business model for Cameroon:
- **Purpose**: Neighborhood-based services marketplace connecting users with local service providers
- **Two user modes**: Customer (needs services) and Provider (offers services)
- **Currency**: XAF (Central African CFA franc)
- **Languages**: French/English (with flag selector)

**Tech Stack:**
| Technology | Version/Details |
|------------|-----------------|
| Expo SDK | 54 |
| React Native | 0.81.5 |
| Expo Router | v6 (file-based routing) |
| NativeWind | v4.2.1 (Tailwind for RN) |
| React Native Reusables | shadcn/ui port for React Native |
| Icons | iconoir-react-native + lucide-react-native |
| Animations | React Native Reanimated 4.1.1 |
| Validation | Zod 4.3.6 |
| Package Manager | pnpm |

**Design System (Zinc Theme):**
| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| background | white | zinc-950 |
| foreground | zinc-950 | zinc-50 |
| primary | zinc-900 | zinc-50 |
| secondary | zinc-100 | zinc-800 |
| muted | zinc-100 | zinc-800 |
| border | zinc-200 | zinc-800 |
| card | white | zinc-900 |

**Current Screens:**
1. **Start Screen** (`app/index.tsx`) - Landing with logo, service provider carousel, 2 CTAs
2. **Login Screen** (`app/auth/login.tsx`) - Underline inputs, social icons, create account
3. **Customer Signup** (`app/(customer)/index.tsx`) - Full form with Zod validation
4. **Customer Tabs** (`app/(customer)/(tabs)/`) - 5 tabs (Requests, Service, Notifications, Messages, Account)
5. **Provider Home** (`app/(provider)/index.tsx`) - Stats, quick actions, job listings
6. **Provider Onboarding** (`app/(provider)/onboarding.tsx`) - 3-slide swipeable onboarding flow

**Pending Tasks:**
- [ ] Add Input component from React Native Reusables for forms
- [ ] Build provider join/signup screen (after onboarding)
- [ ] Build out individual tab screens with content

### Important Notes:
1. **This is a React Native Expo project** - Cannot preview in web browser in Same
2. **Use React Native Reusables CLI**: `npx @react-native-reusables/cli@latest add [component-name]`
3. **Package manager**: pnpm
4. **Follow Code Organization Pattern** when adding new pages/components
5. **PortalHost** is already set up in root layout for dialogs/popovers

### Ready for Instructions
Project is fully studied and dependencies are installed. Awaiting user instructions for next tasks.

## Session Log - Wed Jan 28, 2026 (Phone Number Added)

### Changes Made
- Added phone number field to SignupForm with +237 country code
- Zod validation: 9 digits, must start with 6 or 7
- Phone stored in Supabase with full country code prefix

## Session Log - Thu Jan 29, 2026 (Password Reset Flow)

### Password Reset Functionality Implemented

**Files Created:**
1. `app/auth/forgot-password.tsx` - Forgot password page with:
   - Email input with validation
   - Supabase `resetPasswordForEmail()` integration
   - Success state showing "Check your email" message
   - Resend email option
   - Back to login navigation

2. `app/auth/reset-password.tsx` - Reset password page with:
   - New password and confirm password inputs
   - Password visibility toggles
   - Password strength indicator (Weak/Fair/Good/Strong)
   - Password match validation
   - Supabase `updateUser()` for password update
   - Success state with "Continue to App" option
   - Password requirements display

**Files Updated:**
1. `app/auth/login.tsx`:
   - Changed `handleForgotPassword` to navigate to `/auth/forgot-password`
   - Removed the placeholder Alert

2. `app/_layout.tsx`:
   - Added deep link handling for password reset (`expo-linking`)
   - Handles `type=recovery` tokens from email links
   - Sets recovery session with Supabase
   - Added `PASSWORD_RECOVERY` auth state change handler
   - Added Stack.Screen entries for forgot-password and reset-password

### Password Reset Flow:
1. User clicks "Forgot password?" on login page
2. User enters email on forgot-password page
3. Supabase sends reset email with link: `njambe://auth/reset-password#access_token=...&type=recovery`
4. User clicks link in email → app opens
5. Deep link handler extracts tokens and sets recovery session
6. User is navigated to reset-password page
7. User enters and confirms new password
8. Password is updated via `supabase.auth.updateUser()`
9. Success screen shown with option to continue or sign in again

### Supabase Dashboard Setup Required:
1. Go to Authentication → URL Configuration
2. Add Site URL: `njambe://` (or your app scheme)
3. Add Redirect URLs:
   - `njambe://auth/reset-password`
   - `njambe://auth/callback`

## Session Log - Thu Jan 29, 2026 (SignupForm Google OAuth Fix)

### Fixed SignupForm Google OAuth Implementation
- Updated `handleGoogleSignup` in `components/custom/shared/SignupForm.tsx`
- Was calling undefined `signInWithGoogle` + `createOAuthProfile`
- Now correctly calls `signUpWithGoogle(role)` which:
  - Handles the full OAuth browser flow
  - Exchanges tokens/codes for session
  - Creates user profile in `users` table with role
- Simpler, cleaner implementation

## Session Log - Thu Jan 29, 2026 (Google OAuth Setup)

### Google OAuth Implementation Complete

**Packages Installed:**
- `expo-auth-session` - For OAuth flow in Expo
- `expo-web-browser` - For opening browser for OAuth
- `expo-crypto` - For PKCE code generation

**Files Created:**
1. `lib/auth/google-auth.ts` - Google OAuth helper with PKCE flow:
   - `signInWithGoogle()` - Initiates Google OAuth with Supabase
   - `createOAuthProfile()` - Creates/updates user profile after OAuth
   - `getRedirectUri()` - Gets the correct redirect URI for the platform

**Files Updated:**
1. `app/auth/login.tsx`:
   - Added proper Google OAuth with `signInWithGoogle()`
   - Added loading state for Google button specifically
   - LinkedIn and Apple show "Coming Soon" alert

2. `components/custom/shared/SignupForm.tsx`:
   - Added proper Google OAuth with `signInWithGoogle()`
   - Creates user profile with role after OAuth success
   - Added loading state for Google button

### Supabase Dashboard Setup Required

**IMPORTANT: You must complete these steps in the Supabase Dashboard for Google OAuth to work:**

#### 1. Enable Google Provider in Supabase
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** → **Providers**
4. Find **Google** and click to expand
5. Toggle **Enable Sign in with Google**

#### 2. Create Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
5. Select **Web application**
6. Add these authorized redirect URIs:
   - `https://kumbvpzqtagbpocwnrxv.supabase.co/auth/v1/callback`
7. Copy the **Client ID** and **Client Secret**

#### 3. Configure Supabase with Google Credentials
1. Back in Supabase Dashboard → **Authentication** → **Providers** → **Google**
2. Paste the **Client ID** and **Client Secret** from Google Cloud Console
3. Click **Save**

#### 4. Add Redirect URL in Supabase
1. Go to **Authentication** → **URL Configuration**
2. Add these redirect URLs:
   - `njambe://auth/callback` (for Expo Go / development)
   - `com.njambe.app://auth/callback` (for production builds)
   - `exp://127.0.0.1:8081/--/auth/callback` (for Expo Go local testing)

### How the OAuth Flow Works

```
1. User taps "Sign up with Google" button
2. App generates PKCE code_verifier and code_challenge
3. App opens browser to Supabase OAuth URL with Google provider
4. User authenticates with Google in browser
5. Google redirects to Supabase callback
6. Supabase redirects back to app with authorization code
7. App exchanges code for session using Supabase SDK
8. App creates/updates user profile in database
9. User is navigated to appropriate screen
```

### Current OAuth Status
- [x] Google OAuth - Implemented (requires Supabase Dashboard setup)
- [ ] Apple OAuth - Not yet implemented (coming soon placeholder)
- [ ] LinkedIn OAuth - Not yet implemented (coming soon placeholder)

### Testing Google OAuth
1. Complete the Supabase Dashboard setup above
2. Run the app with `pnpm start`
3. Tap the Google button on Login or Signup screen
4. Browser should open with Google sign-in
5. After authentication, app should receive the session

## Session Log - Thu Jan 29, 2026 (Resend Email Countdown Timer)

### Forgot Password - Resend Timer Implemented
- Added 60-second countdown timer to "Didn't receive it? Send again" link
- Link is disabled while countdown is active, showing "Resend in Xs"
- Link becomes active (underlined) when countdown reaches 0
- Clicking resend resets the timer and sends another email
- Added loading indicator during resend
- Separate `handleResendEmail` function for resending
- `RESEND_COOLDOWN_SECONDS` constant (60s) for easy adjustment

## Session Log - Thu Jan 29, 2026 (TextInput Descender Fix)

### Fixed TextInput Text Clipping Issue
Letters with descenders (g, y, p, q, j) were getting cut off in all form inputs.

**Root Cause:** `pb-3` (padding-bottom) alone wasn't providing enough space for descender rendering.

**Fix Applied:** Updated all TextInput components with proper styling:
```javascript
style={{
  paddingTop: 4,
  paddingBottom: 12,
  lineHeight: 22,
}}
```

Also changed parent View from `items-center` to `items-end` for proper alignment with icons.

**Files Updated:**
1. `app/auth/login.tsx` - Email and password inputs
2. `app/auth/forgot-password.tsx` - Email input
3. `app/auth/reset-password.tsx` - New password and confirm password inputs
4. `components/custom/shared/SignupForm.tsx` - All 5 form inputs (first name, last name, email, phone, password)

## Session Log - Thu Jan 30, 2026 (Onboarding Design Update)

### Onboarding Page Redesign
Added description paragraphs under titles and locked buttons at bottom.

**Files Updated:**
1. `lib/provider/onboarding-data.ts`:
   - Added `description` field to `OnboardingSlide` interface
   - Added descriptions for all 3 slides:
     - Slide 1: "Discover job opportunities in your neighborhood..."
     - Slide 2: "Build your reputation with reviews and ratings..."
     - Slide 3: "Receive payments directly and securely..."

2. `app/(provider)/onboarding.tsx`:
   - Reduced image area from 60% to 55% to make room for description
   - Added description paragraph under title with `text-zinc-400` styling
   - Changed bottom content to use `flex-1 justify-between` to push buttons to bottom
   - Wrapped pagination + title + description in a top section View
   - Buttons now stay locked at the bottom regardless of content length

### Layout Structure:
```
SafeAreaView
├── Image FlatList (55% max height)
└── Bottom Content (flex-1, justify-between)
    ├── Top Section
    │   ├── Pagination dots
    │   ├── Title
    │   └── Description paragraph
    └── Navigation Buttons (locked at bottom)
```

### Color Token Migration (NativeWind Design System)
Replaced all hardcoded zinc colors with semantic design system tokens:

| Before (Hardcoded) | After (Design System) |
|--------------------|----------------------|
| `bg-zinc-950` | `bg-background` |
| `text-zinc-100` | `text-foreground` |
| `text-zinc-400` | `text-muted-foreground` |
| `bg-zinc-800` | `bg-secondary` |
| `bg-zinc-700` (pagination) | `bg-muted` |
| `bg-zinc-100` (button) | `bg-primary` |
| `text-zinc-900` | `text-primary-foreground` |
| `active:bg-zinc-700` | `active:opacity-80` |
| `active:bg-zinc-300` | `active:opacity-90` |
| Hardcoded `#18181b` | Dynamic `arrowColor` from theme |

Added `useColorScheme` hook and `COLORS` import for dynamic icon colors.

## Session Log - Thu Jan 30, 2026 (Onboarding Updates)

### Changes Made
1. **Image section size**: Changed from 55% to 50% (2/4 of screen)
2. **Pagination dots styling**:
   - Increased height from `h-1` to `h-1.5` for better visibility
   - Active dot: Pure white (`#FFFFFF`) in dark mode, zinc-900 (`#18181B`) in light mode
   - Inactive dots: Zinc-700 (`#3F3F46`) in dark mode, zinc-300 (`#D4D4D8`) in light mode
   - Using inline styles for precise color control based on theme

## Session Log - Thu Jan 30, 2026 (Customer Onboarding)

### Customer Onboarding Pages Implemented

**Files Created:**
1. `lib/customer/onboarding-data.ts` - Customer onboarding slides data:
   - Slide 1: "Find Trusted Neighbors" - discovering local service providers
   - Slide 2: "Book With Confidence" - reviews and verified providers
   - Slide 3: "Pay Securely" - safe payments through the app

2. `app/(customer)/onboarding.tsx` - Customer onboarding screen:
   - Same swipeable 3-slide layout as provider onboarding
   - Uses FlatList for horizontal pagination
   - Pagination dots, title, highlighted word, description
   - Skip and Next buttons locked at bottom
   - Navigates to signup after completion

3. `app/(customer)/signup.tsx` - Customer signup form (moved from index.tsx)

**Files Updated:**
1. `app/(customer)/index.tsx` - Now redirects to onboarding
2. `app/(customer)/_layout.tsx` - Added onboarding and signup screens to stack

### Customer Flow:
1. User taps "I need a service" on start screen
2. Redirected to `/(customer)/onboarding`
3. Swipes through 3 onboarding slides
4. Taps Next/Skip to go to `/(customer)/signup`
5. Fills signup form
6. Navigated to `/(customer)/(tabs)` on success
