
import React, { useState } from 'react';
import {
  SafeAreaView, TextInput, Button, Text, ActivityIndicator, Alert,
  ScrollView, TouchableOpacity, Modal, View, StyleSheet, KeyboardAvoidingView,
  Platform, Switch, ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const cities = ['Tel Aviv', 'Jerusalem', 'Haifa', 'Eilat', 'Beersheba'];
const apiKey = '01b89b903712d6fab74d8147740a4dba';

const WeatherScreen = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [useKelvin, setUseKelvin] = useState(false);

  const navigation = useNavigation();

  const fetchWeather = async (cityName) => {
    if (!cityName) {
      Alert.alert("שגיאה", "אנא הכנס שם של עיר");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      );
      const data = await response.json();
  
      if (data.cod !== 200) {
        Alert.alert("שגיאה", `עיר לא נמצאה: ${cityName}`);
        setWeather(null);
      } else {
        setWeather(data);
        setModalVisible(false);
      }
    } catch (error) {
      Alert.alert("שגיאה", "בעיה בשליפת הנתונים מהשרת");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const convertTemp = (temp) => useKelvin ? `${temp}K` : `${(temp - 273.15).toFixed(1)}°C`;

  return (
    <ImageBackground source={{ uri: 'https://source.unsplash.com/featured/?weather' }} style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Weather App</Text>

          <TextInput
            placeholder="Enter city name"
            style={styles.input}
            value={city}
            onChangeText={setCity}
          />

          <Button title="Get Weather" onPress={() => fetchWeather(city)} />

          <TouchableOpacity style={styles.cityButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.cityButtonText}>Select City</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cityButton} onPress={() => navigation.navigate('Country Weather')
}>
            <Text style={styles.cityButtonText}>Go to Country Weather</Text>
          </TouchableOpacity>

          <View style={styles.switchRow}>
            <Text>Show Temperature in Kelvin</Text>
            <Switch value={useKelvin} onValueChange={setUseKelvin} />
          </View>

          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {weather && (
            <View style={styles.weatherContainer}>
              <Text style={styles.weatherText}>
                {`Weather in ${weather.name}: ${weather.weather[0].description}`}
              </Text>
              <Text style={styles.weatherText}>
                {`Temperature: ${convertTemp(weather.main.temp)}`}
              </Text>
            </View>
          )}

          <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Select City</Text>
              <ScrollView>
                {cities.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.cityItem} onPress={() => fetchWeather(item)}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </View>
          </Modal>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

// בסוף הקובץ WeatherScreen.js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 15,
    margin: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  cityButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    marginVertical: 8,
    borderRadius: 25,
  },
  cityButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  weatherContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  weatherText: {
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    height: '70%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  cityItem: {
    padding: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});

export default WeatherScreen;
