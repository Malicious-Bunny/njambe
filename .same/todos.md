# Njambe Project - Todos & Progress Tracker

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
