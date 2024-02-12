import React, {useState, useEffect, useMemo} from 'react';
import {
  FlatList,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://7e05f9f6db676f57c7aa4851234ac018@o4506733350092800.ingest.sentry.io/4506733351731200',
});

const ErrorBoundary = Sentry.withErrorBoundary(
  ({children, ...props}) => children,
  (error, errorInfo) => {
    Sentry.captureException(error);
    Alert.alert('An error occurred');
  },
);

const DashboardScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDateTime, setDueDateTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Error fetching tasks from AsyncStorage:', error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    navigation.navigate('Home');
  };

  const handleSubmit = async () => {
    if (!title || !description || !dueDateTime) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newTask = {
      title,
      description,
      dueDateTime: dueDateTime.toLocaleString(),
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setTitle('');
    setDescription('');
    setDueDateTime(new Date());
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks to AsyncStorage:', error);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDateTime;
    setShowPicker(false);
    setDueDateTime(currentDate);
  };

  const showMode = () => {
    setShowPicker(true);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity style={{padding: 20}}>
      <Text>Title: {item.title}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Due Date: {item.dueDateTime}</Text>
    </TouchableOpacity>
  );

  // Memoize the tasks array to prevent unnecessary re-renders
  const memoizedTasks = useMemo(() => tasks, [tasks]);

  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
      <ErrorBoundary>
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
        <Text>Due Date and Time</Text>
        <Button onPress={showMode} title="Show date and time picker!" />
        {showPicker && (
          <DateTimePicker
            value={dueDateTime}
            mode={'datetime'}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <Text>Selected: {dueDateTime.toLocaleString()}</Text>
        <Button title="Submit" onPress={handleSubmit} />
        <FlatList
          data={memoizedTasks} // Use the memoized tasks array
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </ErrorBoundary>
    </SafeAreaView>
  );
};

export default DashboardScreen;
