import { Text } from '@/components/ui/text';
import { Tabs } from 'expo-router';
import {
  Bell,
  Briefcase,
  ChatBubble,
  HomeSimple,
  User,
} from 'iconoir-react-native';
import * as React from 'react';
import { Platform, View } from 'react-native';

export default function ProviderTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FAFAFA',
          borderTopWidth: 1,
          borderTopColor: '#E4E4E7',
          height: Platform.OS === 'ios' ? 85 : 65,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#18181B',
        tabBarInactiveTintColor: '#A1A1AA',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => (
            <View
              className={`-mt-4 h-14 w-14 items-center justify-center rounded-full ${
                focused ? 'bg-primary' : 'bg-border'
              }`}
            >
              <HomeSimple width={28} height={28} color={focused ? '#FAFAFA' : '#71717A'} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={`mt-1 text-[11px] font-medium ${
                focused ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Dashboard
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color, size }) => (
            <Briefcase width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, size }) => (
            <ChatBubble width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, size }) => (
            <Bell width={size} height={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size }) => (
            <User width={size} height={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
