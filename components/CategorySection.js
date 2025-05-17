import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import TimerCard from './TimerCard';
export default function CategorySection({ category, timers, onUpdateTimers }) {
  const [expanded, setExpanded] = useState(true);
  const handleStartAll = () => {
    const updatedTimers = timers.map(timer => ({
      ...timer,
      status: 'Running',
      remaining: timer.remaining > 0 ? timer.remaining : timer.duration,
    }));
    onUpdateTimers(updatedTimers);
  };
  const handlePauseAll = () => {
    const updatedTimers = timers.map(timer => ({
      ...timer,
      status: 'Paused',
    }));
    onUpdateTimers(updatedTimers);
  };
  const handleResetAll = () => {
    const updatedTimers = timers.map(timer => ({
      ...timer,
      remaining: timer.duration,
      status: 'Paused',
    }));
    onUpdateTimers(updatedTimers);
  };
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }} onPress={() => setExpanded(!expanded)}>
        {category} ({expanded ? '▼' : '▶'})
      </Text>
      {expanded && timers.map(timer => (
        <TimerCard key={timer.id} timer={timer} />
      ))}
      {expanded && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button title="Start All" onPress={handleStartAll} />
          <Button title="Pause All" onPress={handlePauseAll} />
          <Button title="Reset All" onPress={handleResetAll} />
        </View>
      )}
    </View>
  );
}