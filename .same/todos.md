# Njambe - Project Overview

## About
**Njambe** is a React Native/Expo mobile app - a local service marketplace connecting customers with nearby service providers. Tagline: "Skilled neighbors, right next door!"

## Tech Stack
- **Framework**: React Native + Expo (SDK 54)
- **Routing**: Expo Router
- **Styling**: Tailwind via NativeWind
- **State**: Zustand
- **Backend**: Supabase
- **UI**: React Native Reusables + Lucide icons

## App Structure
- `/app/index.tsx` - Start screen (choose customer or provider)
- `/app/(customer)/` - Customer flow (browse services, onboarding, signup)
- `/app/(provider)/` - Provider flow (offer services, stats, onboarding)
- `/app/auth/` - Login, forgot/reset password
- `/components/custom/` - Feature components (customer, provider, shared, start)
- `/lib/` - Utils, stores, Supabase config, data

## Key Features
- Dual-mode: Customer & Provider
- Multi-language (EN/FR)
- Google OAuth + email auth
- Service categories grid
- Location/country selection

## Todos
- [ ] Awaiting user instructions

## Notes
- This is a mobile app - can run in browser via `npm run web` or on device via Expo Go
