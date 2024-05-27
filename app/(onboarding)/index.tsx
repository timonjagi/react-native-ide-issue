import React, { useCallback, useLayoutEffect } from 'react'
import { View, Text } from 'react-native'
import { useFocusEffect, useRouter } from 'expo-router'
import deviceStorage from '../../utils/AuthDeviceStorage'
import { useDispatch } from 'react-redux'
import { setUserData } from '../../redux/auth'
import { useOnboardingConfig } from '../../hooks/useOnboardingConfig'
import { useAuth } from '../../hooks/useAuth'
import { HelloWave } from '../../components/HelloWave'
import { ThemedText } from '../../components/ThemedText'
import { ThemedView } from '../../components/ThemedView'
import { useConfig } from '../../config'

 const LoadScreen = () => {
  // const navigation = useNavigation()
  const router = useRouter();

  const dispatch = useDispatch()
  const authManager = useAuth()

  const config = useConfig();
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   })
  // }, [navigation])

  useFocusEffect(
    useCallback(() => {
      setAppState()
    }, []),
  )

  const setAppState = async () => {
    const shouldShowOnboardingFlow = await deviceStorage.getShouldShowOnboardingFlow()
    console.log('shouldShowOnboardingFlow', shouldShowOnboardingFlow)
    if (!shouldShowOnboardingFlow) {
      if (config?.isDelayedLoginEnabled) {
        fetchPersistedUserIfNeeded()
        return
      }
      router.push('SmsAuthenticationScreen/SmsAuthenticationScreen')
    } else {
      router.push('/WalkthroughScreen/WalkthroughScreen')
    }
  }

  const fetchPersistedUserIfNeeded = async () => {
    if (!authManager?.retrievePersistedAuthUser) {
      router.push('DelayedLogin/DelayedLogin')
    }
    authManager
      ?.retrievePersistedAuthUser(config)
      .then(response => {
        if (response?.user) {
          dispatch(
            setUserData({
              user: response.user,
            }),
          )
         // Keyboard.dismiss()
        }
        // navigation.navigate('DelayedHome')
      })
      .catch(error => {
        console.log(error)
        // navigation.navigate('DelayedHome')
      })
  }

  return (
    <ThemedView />
  )
}

export default LoadScreen;