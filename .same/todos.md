# Njambe Project - Todos & Progress Tracker

## Current AI Session - February 25, 2026 (Project Study Complete)

**Status**: ✅ Ready for Development

### Completed This Session
- [x] Cloned the njambe repository from GitHub
- [x] Read and studied .same/todos.md for project briefing
- [x] Read and studied llms.txt for architecture rules and tech stack
- [x] Reviewed package.json - confirmed Expo SDK 54, React Native 0.81.5, NativeWind 4.2.1
- [x] Studied app/_layout.tsx - understood auth flow, deep linking, role-based routing
- [x] Studied lib/supabase.ts - Supabase client with SecureStore adapter
- [x] Studied lib/stores/provider-onboarding-store.ts - Zustand state management for provider onboarding
- [x] Updated EmailSuccessIllustration.tsx - replaced custom SVG with phosphor icons (EnvelopeSimple, CheckCircle, CursorClick)
- [x] Updated check-email.tsx - changed colors from warm beige/pink to zinc theme colors

---

## Project Understanding Summary

**njambe** is a React Native/Expo mobile app for a neighborhood-based services marketplace (like RingTwice). It connects local service providers (cleaners, gardeners, repair workers) with customers in their community.

---

## Key Technical Details

| Technology | Version/Details |
|------------|-----------------|
| **Framework** | Expo SDK 54 |
| **React Native** | 0.81.5 |
| **Routing** | Expo Router v6 (File-based) |
| **Styling** | NativeWind v4.2.1 (Tailwind CSS for RN) |
| **UI Components** | React Native Reusables (shadcn/ui port) |
| **Icons** | phosphor-react-native + iconoir-react-native + lucide-react-native |
| **Animations** | React Native Reanimated 4.1.1 |
| **State** | Zustand for state management |
| **Backend** | Supabase (Auth + Database) |
| **Validation** | Zod 4.3.6 |
| **Package Manager** | pnpm |

---

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

---

## Current App Flow

### 1. Start Screen (`app/index.tsx`)
- Language selector
- Service providers carousel
- CTA buttons (Find a Helper / Become a Helper)

### 2. Customer Flow (`app/(customer)/`)
- **Onboarding**: `index.tsx` → `signup.tsx`
- **Tabs** (`(tabs)/`):
  - `index.tsx` - Home/Service request
  - `requests.tsx` - My requests
  - `messages.tsx` - Messages
  - `notifications.tsx` - Notifications
  - `account.tsx` - Profile/Settings

### 3. Provider Flow (`app/(provider)/`)
- **Onboarding** (`onboarding/`):
  1. `index.tsx` - Entry
  2. `work-type.tsx` - Select individual/independent
  3. `welcome-address.tsx` - Enter address
  4. `personal-description.tsx` - General bio
  5. `profile-photo.tsx` - Upload photo (optional)
  6. `services-selection.tsx` - Select service categories
  7. `category-experience.tsx` - Describe experience per category (dynamic)
- **Signup**: `signup.tsx`
- **Tabs** (`(tabs)/`):
  - `index.tsx` - Dashboard
  - `jobs.tsx` - Job listings
  - `messages.tsx` - Messages
  - `notifications.tsx` - Notifications
  - `account.tsx` - Profile/Settings

### 4. Auth Flow (`app/auth/`)
- `login.tsx` - Email/password login + Google OAuth
- `forgot-password.tsx` - Password reset request
- `reset-password.tsx` - Set new password

---

## Code Organization Pattern (MANDATORY)

### Components Structure
```
components/
├── ui/                           # React Native Reusables (shadcn/ui)
│   ├── button.tsx
│   ├── text.tsx
│   └── ...
└── custom/                       # Custom components
    ├── auth/                     # Auth-related components
    ├── customer/                 # Customer-specific components
    ├── provider/                 # Provider-specific components
    │   └── onboarding/           # Provider onboarding components
    ├── shared/                   # Shared across flows
    └── start/                    # Start screen components
```

### Data & Library Structure
```
lib/
├── utils.ts                      # Utility functions
├── theme.ts                      # Theme configuration
├── supabase.ts                   # Supabase client
├── auth/                         # Auth utilities
├── customer/                     # Customer data/utilities
├── provider/                     # Provider data/utilities
├── start/                        # Start screen data
└── stores/                       # Zustand stores
    ├── app-store.ts
    └── provider-onboarding-store.ts
```

---

## Key Architecture Rules (from llms.txt)

1. **Always prefer React Native Reusables components** - Use `npx @react-native-reusables/cli@latest add [component-name]`
2. **Extract Data** - Move static data to `lib/[page_name]/[data_name].ts`
3. **Extract Components** - Move UI chunks to `components/custom/[route_name]/component.tsx`
4. **Barrel Exports** - Every folder in `components/custom/` must have an `index.ts`
5. **Lean Pages** - Page files in `app/` should only handle layout and orchestration

---

## Provider Onboarding Store State

```typescript
interface ProviderOnboardingState {
  currentStep: number;
  totalSteps: number;
  workType: 'individual' | 'independent' | null;
  address: string;
  personalDescription: string;
  profileImage: string | null;
  selectedServices: string[];
  categoryExperiences: CategoryExperience[];
  currentCategoryIndex: number;
}
```

---

## Awaiting User Instructions

Ready for development tasks. What would you like to implement or modify?

---

## Previous Session Notes

### February 24, 2026 - Progress Bar Refactoring
- Moved ProgressBar component to `app/(provider)/onboarding/_layout.tsx`
- Progress bar now persists across route changes without re-rendering
- Uses `usePathname()` from expo-router to track current route
- Dynamically calculates progress for category-experience page
