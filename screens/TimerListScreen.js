import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategorySection from '../components/CategorySection';

export default function TimerListScreen({ navigation }) {
  const [timers, setTimers] = useState([]);

  const loadTimers = async () => {
    const stored = await AsyncStorage.getItem('timers');
    setTimers(stored ? JSON.parse(stored) : []);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadTimers);
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={{ padding: 10 }}>
      <Button title="Add Timer" onPress={() => navigation.navigate('Add Timer')} />
      <Button title="History" onPress={() => navigation.navigate('History')} />
      {Array.from(new Set(timers.map(t => t.category))).map(category => (
        <CategorySection key={category} category={category} timers={timers.filter(t => t.category === category)} />
      ))}
    </ScrollView>
  );
}
