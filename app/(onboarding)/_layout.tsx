import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name='WelcomeScreen' options={{ headerShown: false }} />
      <Stack.Screen name='WalkthroughScreen' options={{ headerShown: false }} />
      <Stack.Screen name='DelayedLoginScreen' options={{ headerShown: false }} />
      <Stack.Screen name='LoginScreen' options={{ headerShown: false }} />
      <Stack.Screen name='SmsAuthenticationScreen' options={{ headerShown: true }} />
      <Stack.Screen name='SignupScreen' options={{ headerShown: false }} />
      <Stack.Screen name='ResetPasswordScreen' options={{ headerShown: false }} />
    </Stack>
  );
}
