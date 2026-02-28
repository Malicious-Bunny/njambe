import { Tabs } from 'expo-router';
import { BellSimpleIcon, BriefcaseIcon, ChatCenteredIcon, HouseSimpleIcon, UserCircleIcon } from 'phosphor-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Platform } from 'react-native';

export default function ProviderTabsLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#09090b' : '#fafafa',
          borderTopWidth: 1,
          borderTopColor: isDark ? '#27272a' : '#e4e4e7',
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: isDark ? '#fafafa' : '#18181b',
        tabBarInactiveTintColor: '#a1a1aa',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color, size }) => (
            <BriefcaseIcon size={size} color={color} weight="regular" />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <HouseSimpleIcon size={size} color={color} weight="regular" />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <BellSimpleIcon size={size} color={color} weight="regular" />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <ChatCenteredIcon size={size} color={color} weight="regular" />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size }) => (
            <UserCircleIcon size={size} color={color} weight="regular" />
          ),
        }}
      />
    </Tabs>
  );
}
