import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';

const WeatherCountryScreen = () => {
  const [country, setCountry] = useState('Israel');
  const [citiesWeather, setCitiesWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Israel');
  const apiKey = '01b89b903712d6fab74d8147740a4dba'; // הכנס את המפתח שלך כאן

  const countries = [
    { name: 'Israel', cities: ['Tel Aviv', 'Jerusalem', 'Haifa', 'Eilat'] },
    { name: 'United States', cities: ['New York', 'Los Angeles', 'Chicago', 'Miami'] },
    { name: 'Germany', cities: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'] },
    { name: 'India', cities: ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata'] }
  ];

  const fetchWeatherForCities = async (country) => {
    const cities = country.cities;
    setLoading(true);
    try {
      const data = await Promise.all(
        cities.map(async (city) => {
          const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
          const weather = await response.json();
          return { city, weather };
        })
      );
      setCitiesWeather(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const countryObj = countries.find((c) => c.name === selectedCountry);
    if (countryObj) {
      fetchWeatherForCities(countryObj);
    }
  }, [selectedCountry]);

  const handleCountryChange = (countryName) => {
    setSelectedCountry(countryName);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather by Country</Text>

      <View style={styles.countryButtons}>
        {countries.map((country) => (
          <Button
            key={country.name}
            title={country.name}
            onPress={() => handleCountryChange(country.name)}
          />
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={citiesWeather}
          keyExtractor={(item) => item.city}
          renderItem={({ item }) => (
            <View style={styles.cityWeatherCard}>
              <Text style={styles.cityName}>{item.city}</Text>
              <Text>{`Weather: ${item.weather.weather[0].description}`}</Text>
              <Text>{`Temp: ${item.weather.main.temp - 273.15}°C`}</Text>
              <Text>{`Humidity: ${item.weather.main.humidity}%`}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eaf4fc',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  countryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  cityWeatherCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cityName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default WeatherCountryScreen;
