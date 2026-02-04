# Njambe Project - Todos & Progress Tracker

## Study Notes (AI Session)

**Last Updated**: February 4, 2026

I have studied the entire project structure. Here's my comprehensive understanding:

### Project Summary
**njambe** is a React Native/Expo mobile app for a neighborhood-based services marketplace (similar to RingTwice). It connects local service providers (cleaners, gardeners, repair workers) with customers in their community.

### Key Technical Insights

1. **This is a React Native/Expo project** - It runs on mobile devices (iOS/Android) and web, NOT a typical Next.js web project
2. **Expo SDK 54** with **React Native 0.81.5** - Latest versions
3. **File-based routing** via Expo Router v6 - Similar to Next.js App Router
4. **NativeWind v4.2.1** - Tailwind CSS for React Native
5. **React Native Reusables** - shadcn/ui port for React Native
6. **Supabase** - Backend for authentication and database
7. **Zustand** - State management

### Current App Flows

1. **Start Screen** (`app/index.tsx`)
   - Language selector (EN/FR)
   - Service providers carousel
   - CTA buttons for Customer/Provider paths

2. **Customer Flow** (`app/(customer)/`)
   - Onboarding carousel
   - Signup with country selector
   - Tab navigation: Home, Requests, Messages, Notifications, Account
   - Home screen with categories grid and search

3. **Provider Flow** (`app/(provider)/`)
   - Provider-specific onboarding
   - Provider signup
   - Dashboard (pending)

4. **Auth Flow** (`app/auth/`)
   - Login with email/password
   - Google OAuth
   - Forgot password flow
   - Reset password with deep linking

### Architecture Rules

1. **Components**: `components/custom/[route_name]/` for page-specific, `components/ui/` for reusables
2. **Data**: `lib/[page_name]/[data_name].ts` for static data
3. **Barrel Exports**: Every folder needs an `index.ts`
4. **Lean Pages**: Pages should only handle layout and orchestration

---

## Auth Route Refactoring (Completed)

### Changes Made
- [x] Refactored `app/auth/login.tsx` to use extracted components
- [x] Refactored `app/auth/forgot-password.tsx` to use extracted components
- [x] Refactored `app/auth/reset-password.tsx` to use extracted components
- [x] Created `components/custom/auth/PrivacyPolicyLink.tsx`
- [x] Created `components/custom/auth/CreateAccountButton.tsx`
- [x] Created `lib/auth/constants.ts` with auth constants
- [x] Created `lib/auth/validation.ts` with validation utilities
- [x] Created `lib/auth/index.ts` barrel export
- [x] Updated barrel exports in `components/custom/auth/index.ts`
- [x] Updated form components to use extracted utilities

### Component Structure (Post-Refactor)
```
components/custom/auth/
├── BackHeader.tsx         # Back button header with optional language selector
├── CreateAccountButton.tsx # Bottom CTA for account creation
├── ErrorBanner.tsx        # Error message display
├── ForgotPasswordForm.tsx # Full forgot password flow
├── LoginForm.tsx          # Email/password login form
├── PrivacyPolicyLink.tsx  # Privacy policy link
├── ResetPasswordForm.tsx  # Password reset form with strength indicator
├── SocialLoginButtons.tsx # Google/LinkedIn/Apple login buttons
└── index.ts               # Barrel export

lib/auth/
├── constants.ts           # Auth constants (cooldowns, URLs, regex)
├── google-auth.ts         # Google OAuth logic
├── validation.ts          # Email/password validation utilities
└── index.ts               # Barrel export
```

### Page Files (Now Lean)
- `app/auth/login.tsx` - 53 lines (was 265 lines)
- `app/auth/forgot-password.tsx` - 18 lines (was 310 lines)
- `app/auth/reset-password.tsx` - 28 lines (was 342 lines)

---

## Project Overview
**njambe** is a neighborhood-based services marketplace (like RingTwice) connecting users with local service providers for cleaning, gardening, repairs, and other services.

## Tech Stack
- **Framework**: Expo SDK 54 + React Native 0.81.5
- **Routing**: Expo Router v6 (File-based)
- **Styling**: NativeWind v4.2.1 (Tailwind CSS for RN)
- **UI Components**: React Native Reusables (shadcn/ui port)
- **Icons**: iconoir-react-native + lucide-react-native
- **State Management**: Zustand
- **Backend**: Supabase (Auth, Database)
- **Package Manager**: pnpm/bun

## Current Implementation Status

### Completed Features
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
- [x] Home screen with categories grid
- [x] Location selector component
- [x] Search bar component
- [x] Supabase client with SecureStore adapter
- [x] App state management with Zustand

### Pending Features (TODO)
- [ ] Category detail screen (browse services by category)
- [ ] Service search screen
- [ ] Service detail screen
- [ ] Service provider profile screen
- [ ] Service request/booking flow
- [ ] Messaging/chat functionality
- [ ] Push notifications
- [ ] Provider dashboard
- [ ] Service listing creation for providers
- [ ] Reviews and ratings system
- [ ] Payment integration
- [ ] User profile management
- [ ] Settings screen
- [ ] LinkedIn/Apple OAuth integration

## Route Structure
```
app/
├── index.tsx                      # Start screen
├── _layout.tsx                    # Root layout with auth
├── (customer)/
│   ├── _layout.tsx                # Customer stack layout
│   ├── index.tsx                  # Redirects to onboarding
│   ├── onboarding.tsx             # Swipeable onboarding slides
│   ├── signup.tsx                 # Registration form
│   └── (tabs)/
│       ├── _layout.tsx            # Tab navigation
│       ├── index.tsx              # Home/Services
│       ├── requests.tsx           # Service requests
│       ├── messages.tsx           # Chat
│       ├── notifications.tsx      # Notifications
│       └── account.tsx            # Profile
├── (provider)/
│   ├── _layout.tsx                # Provider stack layout
│   ├── index.tsx                  # Redirects to onboarding
│   ├── onboarding.tsx             # Provider onboarding
│   └── signup.tsx                 # Provider registration
└── auth/
    ├── login.tsx                  # Sign in
    ├── forgot-password.tsx        # Password recovery
    └── reset-password.tsx         # New password

```

## Design System (Zinc Theme)
| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| background | white | zinc-950 |
| foreground | zinc-950 | zinc-50 |
| primary | zinc-900 | zinc-50 |
| secondary | zinc-100 | zinc-800 |
| muted | zinc-100 | zinc-800 |
| border | zinc-200 | zinc-800 |
| card | white | zinc-900 |

## Notes for Development
1. Always use React Native Reusables components when available
2. Custom components go in `components/custom/[route_name]/`
3. Page-specific data goes in `lib/[page_name]/`
4. Use barrel exports (index.ts) in component folders
5. Keep page files lean - only layout and orchestration
