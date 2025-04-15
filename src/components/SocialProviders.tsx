// update auth0 as per latest requirements

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Octicons';

const SocialProviders = () => {
  const handleButtonPress = (provider: string) => {
    // Handle button press (e.g., navigate to Google login or email signup)
    console.log(`Button pressed: ${provider}`);
  };

  return (
    <View style={styles.providers}>
      {/* Continue with Google */}
      <View
        style={[
          styles.buttonContainer,
          {
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          },
        ]}
        onTouchEnd={() => handleButtonPress('Google')}>
        <Icon name="google" size={20} color="black" />
        <Text style={[styles.buttonText, {color: 'black'}]}>
          Continue with Google
        </Text>
      </View>

      {/* Sign up with Email */}
      <View
        style={[
          styles.buttonContainer,
          {
            backgroundColor: '#333',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          },
        ]}
        onTouchEnd={() => handleButtonPress('Email')}>
        <Icon1 name="mail" size={20} color="white" />
        <Text style={styles.buttonText}>Sign up with email</Text>
      </View>

      {/* Horizontal Line */}
      <View style={styles.horizontalLine} />

      {/* Login Button */}
      <View
        style={[
          styles.buttonContainer,
          {borderColor: 'white', borderWidth: 0.5},
        ]}
        onTouchEnd={() => handleButtonPress('Login')}>
        <Text style={styles.buttonText}>Log in</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  providers: {
    height: 230,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  buttonContainer: {
    width: '90%',
    marginBottom: 10,
    borderRadius: 30,
    overflow: 'hidden', // Ensure rounded corners
    alignItems: 'center', // Center text horizontally
    paddingVertical: 12, // Increase vertical padding
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'medium',
    fontFamily: 'Manrope-Regular',
  },
  horizontalLine: {
    width: '82%',
    height: 0.5,
    backgroundColor: 'white',
    marginVertical: 5,
    marginBottom: 15,
  },
});

export default SocialProviders;
