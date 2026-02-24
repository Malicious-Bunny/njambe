# Njambe Project - Todos & Progress Tracker

## Current AI Session - February 24, 2026

**Status**: Working on provider onboarding refactoring

### Completed This Session
- [x] Cloned and studied the entire project
- [x] Refactored provider onboarding from step switcher to proper stack navigation
- [x] Created separate page files:
  - `app/(provider)/onboarding/_layout.tsx` - Stack layout
  - `app/(provider)/onboarding/index.tsx` - Redirect to work-type
  - `app/(provider)/onboarding/work-type.tsx` - Step 1: Choose work type
  - `app/(provider)/onboarding/welcome-address.tsx` - Step 2: Enter address
  - `app/(provider)/onboarding/personal-description.tsx` - Step 3: Bio
- [x] Updated design to use zinc color scheme (removed #FFF8F0, emerald-500)
- [x] Removed old onboarding.tsx file
- [x] Updated existing step components to use zinc colors

### Design Changes Made
- Background: `bg-background` instead of `#FFF8F0`
- Buttons: `bg-primary` instead of `bg-emerald-500`
- Progress bar: `bg-foreground` instead of `bg-amber-400`
- Cards: `bg-card` with `border-border`
- Text: Using theme tokens (foreground, muted-foreground)

---

## Complete Project Study Notes

### Project Overview
**njambe** is a **React Native/Expo mobile app** for a **neighborhood-based services marketplace** (similar to RingTwice). It connects local service providers (cleaners, gardeners, repair workers, etc.) with customers in their community.

---

### Technical Stack Summary

| Technology | Version/Details |
|------------|-----------------|
| **Framework** | Expo SDK 54 |
| **React Native** | 0.81.5 |
| **Routing** | Expo Router v6 (File-based) |
| **Styling** | NativeWind v4.2.1 (Tailwind CSS for RN) |
| **UI Components** | React Native Reusables (shadcn/ui port) |
| **Icons** | iconoir-react-native + lucide-react-native |
| **Animations** | React Native Reanimated 4.1.1 |
| **State Management** | Zustand |
| **Backend** | Supabase (Auth + Database) |
| **Validation** | Zod 4.3.6 |
| **Package Manager** | pnpm/bun |

---

### Architecture Rules (MANDATORY - from llms.txt)

1. **React Native Reusables First**: Always prefer React Native Reusables components over custom implementations
   - Install via: `npx @react-native-reusables/cli@latest add [component-name]`

2. **Component Organization**:
   - `components/ui/` - React Native Reusables (shadcn/ui primitives)
   - `components/custom/[route_name]/` - Page-specific custom components
   - `components/custom/shared/` - Shared across multiple pages

3. **Data Organization**:
   - `lib/[page_name]/[data_name].ts` - Static data and logic for pages

4. **Barrel Exports**: Every folder in `components/custom/` MUST have an `index.ts`

5. **Lean Pages**: Page files in `app/` should only handle layout and orchestration

---

### Design System (Zinc Theme)

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| background | white | zinc-950 |
| foreground | zinc-950 | zinc-50 |
| primary | zinc-900 | zinc-50 |
| secondary | zinc-100 | zinc-800 |
| muted | zinc-100 | zinc-800 |
| border | zinc-200 | zinc-800 |
| card | white | zinc-900 |

---

### Route Structure

```
app/
├── index.tsx                      # Start screen (language selector, provider carousel, CTAs)
├── _layout.tsx                    # Root layout with auth & deep link handling
├── (customer)/
│   ├── _layout.tsx                # Customer stack layout
│   ├── index.tsx                  # Redirects to onboarding
│   ├── onboarding.tsx             # Swipeable onboarding slides
│   ├── signup.tsx                 # Registration form with country selector
│   └── (tabs)/
│       ├── _layout.tsx            # Tab navigation
│       ├── index.tsx              # Home/Services (categories grid, search)
│       ├── requests.tsx           # Service requests
│       ├── messages.tsx           # Chat
│       ├── notifications.tsx      # Notifications
│       └── account.tsx            # Profile
├── (provider)/
│   ├── _layout.tsx                # Provider stack layout
│   ├── index.tsx                  # Redirects to onboarding
│   ├── onboarding.tsx             # Provider onboarding
│   ├── signup.tsx                 # Provider registration
│   └── (tabs)/
│       ├── _layout.tsx            # Tab navigation
│       ├── index.tsx              # Provider dashboard
│       ├── jobs.tsx               # Job listings
│       ├── messages.tsx           # Chat
│       ├── notifications.tsx      # Notifications
│       └── account.tsx            # Profile
└── auth/
    ├── login.tsx                  # Sign in (email/password + Google OAuth)
    ├── forgot-password.tsx        # Password recovery
    └── reset-password.tsx         # New password (with deep linking)
```

---

### Key Files Reference

| File | Purpose |
|------|---------|
| `lib/supabase.ts` | Supabase client with SecureStore adapter |
| `lib/stores/app-store.ts` | Zustand store (language, onboarding state) |
| `lib/theme.ts` | Navigation theme configuration |
| `lib/auth/` | Auth constants, validation, Google OAuth, role detection |
| `lib/auth/get-user-role.ts` | Role detection (customer/provider) |
| `lib/customer/` | Categories, countries, onboarding data |
| `lib/provider/` | Provider onboarding data |

---

### Component Structure

```
components/
├── ui/                            # React Native Reusables
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── icon.tsx
│   ├── input.tsx
│   ├── separator.tsx
│   └── text.tsx
└── custom/
    ├── auth/                      # Auth flow components
    │   ├── BackHeader.tsx
    │   ├── CreateAccountButton.tsx
    │   ├── ErrorBanner.tsx
    │   ├── ForgotPasswordForm.tsx
    │   ├── LoginForm.tsx
    │   ├── PrivacyPolicyLink.tsx
    │   ├── ResetPasswordForm.tsx
    │   ├── SocialLoginButtons.tsx
    │   └── index.ts
    ├── customer/                  # Customer-specific components
    │   ├── CategoriesGrid.tsx
    │   ├── CategoryCard.tsx
    │   ├── CountryFlag.tsx
    │   ├── CountrySelector.tsx
    │   ├── OrDivider.tsx
    │   ├── SearchBar.tsx
    │   ├── SocialLoginButton.tsx
    │   └── index.ts
    ├── provider/                  # Provider-specific components
    │   ├── QuickActions.tsx
    │   ├── StatCard.tsx
    │   ├── StatsRow.tsx
    │   └── index.ts
    ├── shared/                    # Shared components
    │   ├── EmptyState.tsx
    │   ├── Header.tsx
    │   ├── LocationSelector.tsx
    │   ├── OnboardingCarousel.tsx
    │   ├── PageHeader.tsx
    │   ├── SignupForm.tsx
    │   ├── TabPageLayout.tsx
    │   └── index.ts
    └── start/                     # Start screen components
        ├── LanguageSelector.tsx
        ├── NjambeLogo.tsx
        ├── ServiceProviderCard.tsx
        ├── ServiceProvidersCarousel.tsx
        ├── StartCTAButtons.tsx
        ├── StartTagline.tsx
        └── index.ts
```

---

## Completed Features

- [x] Start Screen with language selector and service provider carousel
- [x] Customer onboarding flow (swipeable slides)
- [x] Provider onboarding flow
- [x] Customer signup form with country selector
- [x] Provider signup form
- [x] Login screen with email/password
- [x] Google OAuth integration
- [x] Forgot password flow
- [x] Reset password flow with deep linking
- [x] Customer tabs navigation (Home, Requests, Messages, Notifications, Account)
- [x] Provider tabs navigation (Dashboard, Jobs, Messages, Notifications, Account)
- [x] Home screen with categories grid
- [x] Location selector component
- [x] Search bar component
- [x] Supabase client with SecureStore adapter
- [x] App state management with Zustand
- [x] Role-based login routing (customer → customer tabs, provider → provider tabs)
- [x] Auth route refactoring (lean pages, extracted components)

---

## Pending Features (TODO)

- [ ] Category detail screen (browse services by category)
- [ ] Service search screen
- [ ] Service detail screen
- [ ] Service provider profile screen
- [ ] Service request/booking flow
- [ ] Messaging/chat functionality
- [ ] Push notifications
- [ ] Provider dashboard (with real data)
- [ ] Service listing creation for providers
- [ ] Reviews and ratings system
- [ ] Payment integration
- [ ] User profile management
- [ ] Settings screen
- [ ] LinkedIn/Apple OAuth integration

---

## Environment Variables Required

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
```

---

## Running the Project

```bash
# Install dependencies
pnpm install
# or
bun install

# Start development server
pnpm dev
# or
bun dev
```

---

## Notes for Development

1. **Always use React Native Reusables** components when available
2. Custom components go in `components/custom/[route_name]/`
3. Page-specific data goes in `lib/[page_name]/`
4. Use barrel exports (index.ts) in component folders
5. Keep page files lean - only layout and orchestration
6. This is a **React Native/Expo** project - NOT a web app. It runs on mobile devices and simulators.
