import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await AsyncStorage.getItem('timerHistory');
        setHistory(data ? JSON.parse(data).reverse() : []);
      } catch (error) {
        console.error('Failed to load history:', error);
      }
    };
    fetchHistory();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.name} ({item.category})</Text>
      <Text style={styles.subtitle}>Duration: {item.duration}s</Text>
      <Text style={styles.subtitle}>Completed at: {new Date(item.completedAt).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Timer History</Text>
      {history.length === 0 ? (
        <Text style={styles.noData}>No timers completed yet.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#121212' },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
  item: { backgroundColor: '#1e1e1e', padding: 15, marginVertical: 8, borderRadius: 10 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#4caf50' },
  subtitle: { fontSize: 14, color: '#ccc' },
  noData: { color: '#999', fontSize: 16 },
});
