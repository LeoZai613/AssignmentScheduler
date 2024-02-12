import React, {useState} from 'react';
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

const DashboardScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDateTime, setDueDateTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleLogout = () => {
    navigation.navigate('Home');
  };

  const handleSubmit = () => {
    if (!title || !description || !dueDateTime) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newTask = {
      title,
      description,
      dueDateTime: dueDateTime.toLocaleString(),
    };
    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
    setDueDateTime(new Date());
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

  return (
    <SafeAreaView style={{flex: 1, padding: 20}}>
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
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default DashboardScreen;
