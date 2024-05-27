import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import styles from './styles'

export default function IMGoogleSignInButton({ containerStyle, onPress }) {

  const googleIcon  = require('../../assets/icons/googlebutton.png')
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
      <Image
        source={googleIcon}
        style={styles.image}
      />
    </TouchableOpacity>
  )
}
