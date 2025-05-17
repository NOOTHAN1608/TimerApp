import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TimerCard({ timer }) {
  const [timeLeft, setTimeLeft] = useState(timer.remaining);
  const [status, setStatus] = useState(timer.status);
  const [intervalId, setIntervalId] = useState(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setTimeLeft(timer.remaining);
    setStatus(timer.status);
    setShowMessage(false);
  }, [timer]);

  useEffect(() => {
    if (status === 'Running') {
      const id = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(id);
            setStatus('Completed');
            setShowMessage(true);
            saveToHistory();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    } else {
      clearInterval(intervalId);
    }
  }, [status]);

  const saveToHistory = async () => {
    try {
      const newEntry = {
        name: timer.name,
        category: timer.category || 'Uncategorized',
        duration: timer.duration,
        completedAt: new Date().toISOString(),
      };

      const existingHistory = await AsyncStorage.getItem('timerHistory');
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      history.push(newEntry);
      await AsyncStorage.setItem('timerHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  const percent = 1 - timeLeft / timer.duration;

  //  Change color to red if more than 50% time has passed
  const progressColor = percent >= 0.5 ? '#FF0000' : '#4caf50';

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://cdn.pixabay.com/photo/2016/03/16/09/58/hourglass-1260165_1280.jpg' }}
        style={styles.background}
      >
        <View style={styles.card}>
          <Text style={styles.timerName}>{timer.name}</Text>
          <ProgressBar progress={percent} width={null} color={progressColor} />

          <Text style={styles.statusText}>
            {status} - {timeLeft}s
          </Text>

          {showMessage && (
            <Text style={styles.happyMessage}>
              🎉 Congratulations! "{timer.name}" completed!
            </Text>
          )}

          <View style={styles.buttonContainer}>
            <Button title="Start" onPress={() => setStatus('Running')} color="#006400" />
            <Button title="Pause" onPress={() => setStatus('Paused')} color="#FFD700" />
            <Button
              title="Reset"
              onPress={() => {
                setTimeLeft(timer.duration);
                setStatus('Paused');
                setShowMessage(false);
              }}
              color="#8B0000"
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
      backgroundColor: '#000',
       justifyContent: 'center',
        alignItems: 'center' },
  background: { flex: 1, 
    justifyContent: 'center',
     alignItems: 'center', 
     width: '100%', 
     height: '100%' },
  card: { backgroundColor: 'rgba(51, 51, 51, 0.8)',
     margin: 5,
      padding: 20, 
      borderRadius: 10,
       width: '90%' },
  timerName: { fontSize: 18, 
    fontWeight: 'bold', 
    color: '#fff',
     marginBottom: 10 },
  statusText: { marginVertical: 10,
     fontSize: 16,
      color: '#fff' },
  happyMessage: { marginVertical: 10, 
    fontSize: 18, 
    color: '#FFD700', 
    textAlign: 'center' },
  buttonContainer: { flexDirection: 'row',
     justifyContent: 'space-between',
      marginTop: 10 },
});
