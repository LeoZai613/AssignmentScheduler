import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  Button,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from 'react-native';
import {DateTimePicker} from '@react-native-community/datetimepicker';
import axios from 'axios';

const DashboardScreen = ({navigation}) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?limit=151',
      );
      const promises = response.data.results.map(async pokemon => {
        const pokemonInfo = await axios.get(pokemon.url);
        return pokemonInfo.data;
      });
      const pokemonDetails = await Promise.all(promises);
      setPokemonData(pokemonDetails);
    };

    fetchPokemonData();
  }, []);

  const handleLogout = () => {
    navigation.navigate('Home');
  };

  const handleSubmit = () => {
    if (!title || !description || !dueDate) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newTask = {title, description, dueDate: dueDate.toLocaleDateString()};
    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
    setDueDate(new Date());
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={{padding: 20}}>
      <Text>Title: {item.title}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Due Date: {item.dueDate}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={{
        uri: 'https://w0.peakpx.com/wallpaper/204/837/HD-wallpaper-gengar-ghost-pokemon.jpg',
      }}
      style={{flex: 1, padding: 20}}>
      <View>
        <Button title="Logout" onPress={handleLogout} />
        <Text>Title</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
          }}
          onChangeText={setTitle}
          value={title}
        />
        <Text>Description</Text>
        <TextInput
          style={{
            height: 80,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
          }}
          onChangeText={setDescription}
          value={description}
          multiline
        />
        <Text>Due Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text>{dueDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || dueDate;
              setShowDatePicker(false);
              setDueDate(currentDate);
            }}
          />
        )}
        <Button title="Submit" onPress={handleSubmit} />
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ImageBackground>
  );
};

export default DashboardScreen;
