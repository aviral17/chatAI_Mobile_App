import React, {useState, useEffect} from 'react';
import {View, Animated, Easing, StyleSheet} from 'react-native';
import SocialProviders from '../components/SocialProviders';

const words = [
  "Let's Create",
  "Let's Brainstorm",
  "Let's Discover",
  'ChatGPT',
  "Let's go",
  "Let's explore",
  "Let's chit-chat",
  "Let's collaborate",
  "Let's invent",
];

const colorPairs = [
  {text: '#4338ca', background: '#ea580c'},
  {text: '#fbbf24', background: '#7c3aed'},
  {text: '#020617', background: '#c026d3'},
  {text: '#f8fafc', background: '#0f172a'},
  {text: '#22c55e', background: '#2e1065'},
  {text: '#4338ca', background: '#fed7aa'},
  {text: '#facc15', background: '#030712'},
];

function Login() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [colorIndex, setColorIndex] = useState(0);
  const textColor = useState(new Animated.Value(0))[0];
  const backgroundColor = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const updateText = () => {
      setText(words[index].substring(0, subIndex));
    };

    if (typingTimeout) clearTimeout(typingTimeout);

    if (reverse) {
      if (subIndex === 0) {
        setTypingTimeout(
          setTimeout(() => {
            setReverse(false);
            setIndex(prevIndex => (prevIndex + 1) % words.length);
            setSubIndex(1);
            const nextColorIndex = (colorIndex + 1) % colorPairs.length;
            setColorIndex(nextColorIndex);
            // Smoothly transition colors when changing words
            Animated.timing(textColor, {
              toValue: nextColorIndex,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: false,
            }).start();
            Animated.timing(backgroundColor, {
              toValue: nextColorIndex,
              duration: 1000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: false,
            }).start();
          }, 1000),
        );
      } else {
        setTypingTimeout(
          setTimeout(() => {
            setSubIndex(prevSubIndex => prevSubIndex - 1);
          }, 10), // Adjust this value to increase/decrease deleting speed
        );
      }
    } else {
      if (subIndex === words[index].length) {
        setTypingTimeout(
          setTimeout(() => {
            setReverse(true);
            const nextColorIndex = (colorIndex + 1) % colorPairs.length;
            if (nextColorIndex === 0) {
              // Directly set the values to avoid intermediate transitions
              textColor.setValue(0);
              backgroundColor.setValue(0);
            } else {
              // Smoothly transition colors
              Animated.timing(textColor, {
                toValue: nextColorIndex,
                duration: 1000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
              }).start();
              Animated.timing(backgroundColor, {
                toValue: nextColorIndex,
                duration: 1000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: false,
              }).start();
            }
          }, 2000),
        );
      } else {
        setTypingTimeout(
          setTimeout(() => {
            setSubIndex(prevSubIndex => prevSubIndex + 1);
          }, 5), // Adjust this value to increase/decrease writing speed
        );
      }
    }

    updateText();

    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [subIndex, index, reverse]);

  const interpolateColor = (value: Animated.Value) => {
    return value.interpolate({
      inputRange: colorPairs.map((_, i) => i),
      outputRange: colorPairs.map(pair => pair.text),
    });
  };

  const interpolateBackgroundColor = (value: Animated.Value) => {
    return value.interpolate({
      inputRange: colorPairs.map((_, i) => i),
      outputRange: colorPairs.map(pair => pair.background),
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor: interpolateBackgroundColor(backgroundColor)},
      ]}>
      <View style={styles.textView}>
        <Animated.Text
          style={[styles.text, {color: interpolateColor(textColor)}]}>
          {text}
        </Animated.Text>
        <Animated.Text
          style={[styles.cursor, {color: interpolateColor(textColor)}]}>
          ●
        </Animated.Text>
      </View>
      <View style={styles.socialProviders}>
        <SocialProviders />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200,
  },
  text: {
    fontSize: 34,
    fontFamily: 'Manrope-Bold',
  },
  cursor: {
    fontWeight: 'bold',
    fontSize: 50,
    lineHeight: 75,
  },
  socialProviders: {
    position: 'absolute',
    bottom: 0,
    width: '100%', // Ensure the component spans the width of the screen
  },
});

export default Login;
