import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name='LoginScreen/LoginScreen' options={{ headerShown: false }} />
      <Stack.Screen name='DelayedLogin/DelayedLoginScreen' options={{ headerShown: false }} />
      <Stack.Screen name='WalkthroughScreen/WalkthroughScreen' options={{ headerShown: false }} />
      <Stack.Screen name='SmsAuthenticationScreen/SmsAuthenticationScreen' options={{ headerShown: true }} />
      <Stack.Screen name='WelcomeScreen/WelcomeScreen' options={{ headerShown: false }} />
      <Stack.Screen name='SignupScreen/SignupScreen' options={{ headerShown: false }} />
      <Stack.Screen name='ResetPasswordScreen/ResetPasswordScreen' options={{ headerShown: false }} />
    </Stack>
  );
}
