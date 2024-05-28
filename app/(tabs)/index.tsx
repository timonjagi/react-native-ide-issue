import React, { memo, useEffect, useLayoutEffect, useCallback } from 'react'
import { Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useTheme, useTranslations, TouchableIcon } from '../../dopebase'
import useCurrentUser from '../../hooks/useCurrentUser'
import { useAuth } from '../../hooks/useAuth'
import { StyleSheet } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'

export default function HomeScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const currentUser = useCurrentUser()
  const authManager = useAuth()

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  useLayoutEffect(() => {
    const colorSet = theme.colors[appearance]

    navigation.setOptions({
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
    })
  }, [])

  useEffect(() => {
    if (!currentUser?.id) {
      return
    }
  }, [currentUser?.id])

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
    <View style={styles.container}>
      <FastImage
        style={styles.image}
        source={{ uri: currentUser?.profilePictureURL }}
      />
      <Text style={styles.text}>
        {localized('Logged in as')} {currentUser?.email || currentUser?.phone}
      </Text>
    </View>
  )
}

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorSet.primaryBackground,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: colorSet.primaryText,
      marginTop: 16,
      fontSize: 18,
    },
    image: {
      height: 128,
      width: 128,
      borderRadius: 64,
      marginTop: -320,
    },
  })
}