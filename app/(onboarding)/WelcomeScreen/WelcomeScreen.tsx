import React, { useState, useEffect } from 'react'
import { Image, Keyboard, Platform, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import messaging from '@react-native-firebase/messaging'
import {
  useTheme,
  useTranslations,
  ActivityIndicator,
  DismissButton,
  Button,
} from '../../../dopebase'
import dynamicStyles from './styles'
import { setUserData } from '../../../redux/auth'
import { updateUser } from '../../../users'

import { useAuth } from '../../../hooks/useAuth'
import useCurrentUser from '../../../hooks/useCurrentUser'
import { useConfig } from '../../../config'
import { useRouter } from 'expo-router'

const WelcomeScreen = props => {
  const currentUser = useCurrentUser()
  const router = useRouter();
  
  const dispatch = useDispatch()
  const config = useConfig()

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [isLoading, setIsLoading] = useState(true)

  const authManager = useAuth()

  const { title, caption } = props

  useEffect(() => {
    setIsLoading(false)
    // tryToLoginFirst()
  }, [])

  const handleInitialNotification = async () => {
    const userID = currentUser?.id || currentUser?.userID
    const intialNotification = await messaging().getInitialNotification()

    if (intialNotification && Platform.OS === 'android') {
      const {
        // @ts-ignore
        data: { channelID, type },
      } = intialNotification

      if (type === 'chat_message') {
        handleChatMessageType(channelID, currentUser.name)
      }
    }

    if (userID && Platform.OS === 'ios') {
      updateUser(userID, { badgeCount: 0 })
    }
  }

  const tryToLoginFirst = async () => {
    if (!authManager?.retrievePersistedAuthUser) {
      setIsLoading(false);
      return;
    }

    authManager?.retrievePersistedAuthUser(config)
      .then(response => {
        console.log('res: ', response)
        if (response?.user) {
          const user = response.user
          dispatch(
            setUserData({
              user: response.user,
            }),
          )
          Keyboard.dismiss()
          if (user?.role === 'admin') {
            // navigation.reset({
            //   index: 0,
            //   routes: [{ name: 'AdminStack', params: { user } }],
            // })
            router.push('/(tabs)')
          } else {

            router.push('/(tabs)')
            // navigation.reset({
            //   index: 0,
            //   routes: [{ name: 'MainStack', params: { user } }],
            // })
          }
          if (Platform.OS !== 'web') {
            handleInitialNotification()
          }
          return
        }
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }

  const handleChatMessageType = (channelID, name) => {
    const channel = {
      id: channelID,
      channelID,
      name,
    }

    // navigation.navigate('PersonalChat', {
    //   channel,
    //   openedFromPushNotification: true,
    // })
  }

  if (isLoading == true) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {props.delayedMode && (
        <DismissButton
          style={styles.dismissButton}
          tintColor={theme.colors[appearance].primaryForeground}
          onPress={
            () => router.back()
          }
        />
      )}
      <View style={styles?.logo}>
        <Image
          style={styles.logoImage}
          source={
            props.delayedMode ? theme.icons.delayedLogo : theme.icons?.logo
          }
        />
      </View>
      <Text style={styles.title}>
        {title ? title : config.onboardingConfig.welcomeTitle}
      </Text>
      <Text style={styles.caption}>
        {caption ? caption : config.onboardingConfig.welcomeCaption}
      </Text>
      <Button
        text={localized('Log In')}
        style={styles.loginContainer}
        textStyle={styles.loginText}
        onPress={
          () => config.isSMSAuthEnabled
           ? router.push({pathname: '/SmsAuthenticationScreen/SmsAuthenticationScreen', params: { isSigningUp: 'false' }}) 
           : router.push('/LoginScreen/LoginScreen')
        }>
        {localized('Log In')}
      </Button>

      <Button
        text={localized('Sign Up')}
        style={styles.signupContainer}
        textStyle={styles.signupText}
        onPress={
          () => config.isSMSAuthEnabled
          ? router.push({pathname: '/SmsAuthenticationScreen/SmsAuthenticationScreen', params: { isSigningUp: 'true' }}) 
          : router.push('/SignupScreen/SignupScreen')
        }>
        {localized('Sign Up')}
      </Button>
    </View>
  )
}

export default WelcomeScreen
