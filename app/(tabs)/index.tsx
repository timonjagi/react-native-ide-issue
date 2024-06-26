import React, { memo, useEffect, useLayoutEffect, useCallback } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
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
  //const styles = dynamicStyles(theme, appearance)

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
      <View style={styles.header}>
        <Text style={styles.headerText}>Green Park</Text>
        <Text style={styles.headerSubText}>Max Range: 500m</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Discover your new pet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>List your pet for adoption</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    padding: 20,
    backgroundColor: '#a2d2ff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubText: {
    fontSize: 16,
  },
  content: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    backgroundColor: '#ffafcc',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  storyCard: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  storyImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  storyText: {
    fontSize: 14,
    marginTop: 10,
  },
  petList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  petCard: {
    width: 150,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  petImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  petDetails: {
    fontSize: 14,
  },
  petDistance: {
    fontSize: 14,
  },
  navBar: {
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});