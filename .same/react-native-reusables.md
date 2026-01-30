# React Native Reusables - Component Library Reference

## Overview

React Native Reusables brings the shadcn/ui experience to React Native. It's not a component library you install - it's how you build your own component library.

**Key Technologies:**
- **NativeWind**: Tailwind-like styling for React Native
- **RN Primitives**: Universal port of Radix UI primitives
- **Reanimated**: Smooth, native animations
- **Lucide Icons**: Icon system with wrapper component

## Key Differences from shadcn/ui

1. **No cascading styles**: Child elements like `Text` can't inherit styles from parent. Use `TextClassContext` for inheritance.
2. **No data attributes**: Variants rely on props or state instead of `data-*` attributes.
3. **Portals**: Components like modals/menus need a `PortalHost` in the root layout.
4. **Icons**: Use wrapper component: `<Icon as={ArrowRight} className="text-red-500" size={16} />`
5. **Programmatic control**: Some components use `ref` instead of `open`/`onOpenChange` props.

## CLI Commands

```bash
# Add a component
npx @react-native-reusables/cli@latest add [component-name]

# Add multiple components
npx @react-native-reusables/cli@latest add card input dialog

# Add all components
npx @react-native-reusables/cli@latest add -a

# Check project setup
npx @react-native-reusables/cli@latest doctor
```

## Available Components

| Component | CLI Command | Requires PortalHost |
|-----------|-------------|---------------------|
| Accordion | `add accordion` | No |
| Alert | `add alert` | No |
| Alert Dialog | `add alert-dialog` | Yes |
| Aspect Ratio | `add aspect-ratio` | No |
| Avatar | `add avatar` | No |
| Badge | `add badge` | No |
| Button | `add button` | No |
| Card | `add card` | No |
| Checkbox | `add checkbox` | No |
| Collapsible | `add collapsible` | No |
| Context Menu | `add context-menu` | Yes |
| Dialog | `add dialog` | Yes |
| Dropdown Menu | `add dropdown-menu` | Yes |
| Hover Card | `add hover-card` | Yes |
| Input | `add input` | No |
| Label | `add label` | No |
| Menubar | `add menubar` | Yes |
| Popover | `add popover` | Yes |
| Progress | `add progress` | No |
| Radio Group | `add radio-group` | No |
| Select | `add select` | Yes |
| Separator | `add separator` | No |
| Skeleton | `add skeleton` | No |
| Switch | `add switch` | No |
| Tabs | `add tabs` | No |
| Text | `add text` | No |
| Textarea | `add textarea` | No |
| Toggle | `add toggle` | No |
| Toggle Group | `add toggle-group` | No |
| Tooltip | `add tooltip` | Yes |

## Component Usage Patterns

### Button
```tsx
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

<Button variant="default" size="default">
  <Text>Click me</Text>
</Button>

// Variants: default, destructive, outline, secondary, ghost, link
// Sizes: default, sm, lg, icon
```

### Text
```tsx
import { Text } from '@/components/ui/text';

<Text>Hello, world!</Text>
<Text variant="h1">Heading 1</Text>
<Text variant="muted">Muted text</Text>

// Variants: default, h1, h2, h3, h4, p, blockquote, code, lead, large, small, muted
```

### Card
```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Text } from '@/components/ui/text';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <Text>Card Content</Text>
  </CardContent>
  <CardFooter>
    <Text>Card Footer</Text>
  </CardFooter>
</Card>
```

### Input
```tsx
import { Input } from '@/components/ui/input';

<Input placeholder="Enter text..." />
```

### Badge
```tsx
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';

<Badge variant="default">
  <Text>Badge</Text>
</Badge>

// Variants: default, secondary, destructive, outline
```

### Avatar
```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';

<Avatar alt="User's Avatar">
  <AvatarImage source={{ uri: 'https://example.com/avatar.png' }} />
  <AvatarFallback>
    <Text>AB</Text>
  </AvatarFallback>
</Avatar>
```

### Dialog (requires PortalHost)
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger>
    <Text>Open</Text>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

### Select (requires PortalHost)
```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

<Select>
  <SelectTrigger className='w-[180px]'>
    <SelectValue placeholder='Select a fruit' />
  </SelectTrigger>
  <SelectContent insets={contentInsets} className='w-[180px]'>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem label='Apple' value='apple'>Apple</SelectItem>
      <SelectItem label='Banana' value='banana'>Banana</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

### Tabs
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as React from 'react';

const [value, setValue] = React.useState('account');

<Tabs value={value} onValueChange={setValue}>
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account content</TabsContent>
  <TabsContent value="password">Password content</TabsContent>
</Tabs>
```

### Checkbox
```tsx
import { Checkbox } from '@/components/ui/checkbox';

<Checkbox checked={checked} onCheckedChange={setChecked} />
```

### Switch
```tsx
import { Switch } from '@/components/ui/switch';

<Switch checked={enabled} onCheckedChange={setEnabled} />
```

### Progress
```tsx
import { Progress } from '@/components/ui/progress';

<Progress value={66} />
```

### Separator
```tsx
import { Separator } from '@/components/ui/separator';

<Separator />
<Separator orientation="vertical" />
```

### Icon
```tsx
import { Icon } from '@/components/ui/icon';
import { ArrowRight } from 'lucide-react-native';

<Icon as={ArrowRight} className="text-red-500" size={16} />
```

## Project Structure

```
njambe/
├── app/
│   ├── _layout.tsx      # Root layout with PortalHost
│   ├── index.tsx        # Home screen
│   └── +not-found.tsx   # 404 page
├── components/
│   └── ui/              # Reusable UI components
│       ├── button.tsx
│       ├── text.tsx
│       └── icon.tsx
├── lib/
│   ├── utils.ts         # cn() utility function
│   └── theme.ts         # Navigation theme colors
├── assets/
│   └── images/
└── global.css           # Tailwind CSS
```

## Important Notes

1. **PortalHost**: Already set up in `app/_layout.tsx` - required for Dialog, Select, Popover, etc.
2. **Theme Support**: Uses `useColorScheme()` from nativewind for dark/light mode
3. **Platform-specific styles**: Use `Platform.select({ web: '...', ios: '...', android: '...' })`
4. **Text inheritance**: Use `TextClassContext.Provider` to pass styles to child Text components
5. **Always wrap text**: In React Native, text must always be inside a `<Text>` component
