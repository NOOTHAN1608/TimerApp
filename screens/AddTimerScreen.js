// screens/AddTimerScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
export default function AddTimerScreen({ navigation }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('Workout');
  const cardAnimation = useRef(new Animated.Value(-500)).current; // Start from above the screen
  useEffect(() => {
    // Animate the card coming down
    Animated.timing(cardAnimation, {
      toValue: 0,
      duration: 500, 
      useNativeDriver: true,
    }).start();
  }, [cardAnimation]);
  const saveTimer = async () => {
    if (!name || !duration) {
      Alert.alert('Validation', 'Please fill in all fields.');
      return;
    }
    const newTimer = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration),
      remaining: parseInt(duration),
      category,
      status: 'Paused',
    };
    try {
      const existing = await AsyncStorage.getItem('timers');
      const timers = existing ? JSON.parse(existing) : [];
      timers.push(newTimer);
      await AsyncStorage.setItem('timers', JSON.stringify(timers));
      navigation.goBack();
    } catch (e) {
      console.error('Failed to save timer', e);
    }
  };
  return (
    <ImageBackground
      source={{ uri: 'https://cdn.pixabay.com/photo/2017/01/18/15/07/temporal-distance-1990035_1280.jpg' }} // Background image URL
      style={styles.background}
    >
      <Animated.View style={[styles.container, { transform: [{ translateY: cardAnimation }] }]}>
        <Text style={styles.label}>Timer Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter timer name"
          placeholderTextColor="#fff"
        />
        <Text style={styles.label}>Duration (seconds)</Text>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
          placeholder="Enter duration"
          placeholderTextColor="#fff"
        />
        <Text style={styles.label}>Category</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Workout" value="Workout" />
          <Picker.Item label="Study" value="Study" />
          <Picker.Item label="Break" value="Break" />
        </Picker>
        <Button title="Save Timer" onPress={saveTimer} color="#841584" />
      </Animated.View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better readability
    borderRadius: 10,
    marginTop: 100, // Space from the top to start the animation
    marginHorizontal: 16, // Margin on the sides
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff', // White color for the label text
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 5,
    borderRadius: 4,
    borderColor: '#ccc',
    color: '#fff', // White color for input text
  },
  picker: {
    marginVertical: 10,
    color: '#fff', // White color for the picker text
  },
});