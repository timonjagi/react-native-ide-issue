import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name='LoginScreen/LoginScreen' options={{ headerShown: true }} />
      <Stack.Screen name='DelayedLogin/DelayedLoginScreen' options={{ headerShown: true }} />
      <Stack.Screen name='WalkthroughScreen/WalkthroughScreen' options={{ headerShown: true }} />
    </Stack>
  );
}
