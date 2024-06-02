import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const SocialProviders = () => {
  return (
    <View style={styles.providers}>
      <Text style={styles.headerText}>Providers</Text>
    </View>
  );
};

export default SocialProviders;

const styles = StyleSheet.create({
  providers: {
    height: 250,
    backgroundColor: '#090114c7',
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
  },
  headerText: {
    color: 'white',
  },
});
