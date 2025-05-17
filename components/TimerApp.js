import React, { useState } from 'react';
import { View } from 'react-native';
import CategorySection from './CategorySection';
export default function TimerApp() {
  const [timers, setTimers] = useState([
    { id: '1', name: 'Workout', duration: 300, remaining: 300, status: 'Paused' },
    { id: '2', name: 'Study', duration: 600, remaining: 600, status: 'Paused' },
  ]);
  const updateTimers = (updatedTimers) => {
    setTimers(updatedTimers);
  };
  return (
    <View>
      <CategorySection category="Timers" timers={timers} onUpdateTimers={updateTimers} />
    </View>
  );
}