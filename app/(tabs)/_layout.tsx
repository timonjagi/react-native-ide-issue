import { Tabs, useRouter } from 'expo-router';
import React, { useCallback } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableIcon, useTheme, useTranslations } from '../../dopebase';
import { View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import useCurrentUser from '../../hooks/useCurrentUser';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const colorSet = theme.colors[appearance]

  const currentUser = useCurrentUser()
  const authManager = useAuth()

  const router = useRouter();
  
  const onLogout = useCallback(() => {
    authManager?.logout(currentUser)
    // navigation.reset({
    //   index: 0,
    //   routes: [
    //     {
    //       name: 'LoadScreen',
    //     },
    //   ],
    // })
    router.push('/')

  }, [currentUser])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
      }}>
        
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
          headerTitle: localized('Home'),
          headerRight: () => (
            <View>
              <TouchableIcon
                imageStyle={{ tintColor: colorSet.primaryForeground }}
                iconSource={theme.icons.logout}
                onPress={onLogout}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: colorSet.primaryBackground,
            borderBottomColor: colorSet.hairline,
          },
          headerTintColor: colorSet.primaryText,
        }}
      />
      
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
