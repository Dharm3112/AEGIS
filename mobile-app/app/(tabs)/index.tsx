import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

export default function App() {
  const [location, setLocation] = useState(null);
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  const sendSOS = async () => {
    if (!location) {
        Alert.alert("Getting GPS... wait a moment.");
        return;
    }
    setLoading(true);
    try {
      // REPLACE 'YOUR_PC_IP_ADDRESS' with your actual local IP (e.g., 192.168.1.5)
      // because "localhost" on mobile refers to the phone itself, not your PC.
      const res = await axios.post('http://192.168.1.X:5000/api/sos', {
        lat: location.coords.latitude,
        long: location.coords.longitude,
        description: desc || "EMERGENCY - HELP NEEDED"
      });
      Alert.alert("Success", "Help is on the way! Priority Score: " + res.data.priority_score);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Could not send SOS");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LifeLine</Text>

      <TextInput
        style={styles.input}
        placeholder="Describe Emergency (e.g. Fire, Flood)"
        placeholderTextColor="#aaa"
        onChangeText={setDesc}
        value={desc}
      />

      <TouchableOpacity style={styles.sosButton} onPress={sendSOS}>
        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.sosText}>SOS</Text>}
      </TouchableOpacity>

      <Text style={styles.status}>
        GPS: {location ? "Locked ✅" : "Searching..."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#d8b4fe',
    marginBottom: 50,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#6b21a8',
    borderWidth: 1,
    borderRadius: 10,
    color: 'white',
    padding: 10,
    marginBottom: 20,
  },
  sosButton: {
    width: 200,
    height: 200,
    backgroundColor: '#ef4444',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#991b1b',
    shadowColor: '#ef4444',
    elevation: 20,
  },
  sosText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  status: {
    marginTop: 20,
    color: '#888',
  }
});