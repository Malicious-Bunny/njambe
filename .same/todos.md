# Njambe Project - Todos & Progress Tracker

## Study Notes (AI Session)

**Last Updated**: February 4, 2026 (Current Session)

I have fully studied the entire project structure, `llms.txt`, and all key files. Here's my comprehensive understanding:

---

### Project Summary
**njambe** is a React Native/Expo mobile app for a **neighborhood-based services marketplace** (similar to RingTwice). It connects local service providers (cleaners, gardeners, repair workers) with customers in their community.

---

### Key Technical Stack

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

### Architecture Rules (from llms.txt - MANDATORY)

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

### Current Route Structure

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
│   └── signup.tsx                 # Provider registration
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
| `lib/auth/` | Auth constants, validation, Google OAuth |
| `lib/customer/` | Categories, countries, onboarding data |
| `lib/provider/` | Provider onboarding data |

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
