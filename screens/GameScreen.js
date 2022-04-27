import { Text, View, StyleSheet, Alert } from 'react-native';
import Title from '../components/ui/Title';
import { useState, useEffect } from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({ pickedNumber, gameOverHandler }) {
  const initialGuess = generateRandomBetween(minBoundary, maxBoundary, pickedNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (parseInt(pickedNumber) === currentGuess) {
      gameOverHandler();
    }
  }, [currentGuess, pickedNumber, gameOverHandler]);

  function nextGuessHandler(direction) {
    if (
      (direction === 'lower' && currentGuess < pickedNumber) ||
      (direction === 'higher' && currentGuess > pickedNumber)
    ) {
      Alert.alert("Don't Lie!", 'You know this is wrong...', { text: 'Sorry!', style: 'cancel' });
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const rndNum = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(rndNum);
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or Lower?</Text>
        <View style={styles.buttonsContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'higher')}>+</PrimaryButton>
        </View>
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
