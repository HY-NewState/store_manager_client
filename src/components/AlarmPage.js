import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FlatList, View, Text, StyleSheet, Pressable } from 'react-native';
import { Arrow } from '../assets/icons/svg';
import { fonts } from '../assets/fonts/fonts';

const AlarmPage = ({ setShowAlarm }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchAlarms();
  }, []);

  const fetchAlarms = async () => {
    try {
      const response = await axios.get('http://localhost:3000/alarms');
      setItems(response.data.alarms);
    } catch (error) {
      console.error("Failed to fetch alarms:", error);
    }
  };

  const handleGoBack = () => {
    setShowAlarm(false);
  };

  const renderAlarmItem = ({ item }) => (
    <View style={styles.alarmItem}>
      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={styles.bodyText}>{item.body}</Text>
      <Text style={styles.dateText}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.introContainer}>
        <View style={styles.header}>
          <Pressable onPress={handleGoBack} style={styles.goBackButton}>
            <Arrow />
          </Pressable>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>알림</Text>
          </View>
        </View>
      </View>
      <View style={styles.background}>
        <FlatList
          data={items}
          numColumns={1}
          style={styles.flatList}
          renderItem={renderAlarmItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0247F9',
    flex: 1,
  },
  introContainer: {
    backgroundColor: '#0247F9',
    width: '100%',
    height: '11%',
  },
  header: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  goBackButton: {
    marginLeft: 20,
    marginTop: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 35,
  },
  headerTitle: {
    ...fonts.H3,
    color: 'white',
  },
  background: {
    backgroundColor: '#ECECEC',
    borderRadius: 32,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    width: '100%',
    marginBottom: 20,
    marginTop: 30,
  },
  contentContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alarmItem: {
    width: 344,
    height: 120,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  titleText: {
    ...fonts.Subtitle2,
    marginTop: 10,
    marginLeft: 22,
  },
  bodyText: {
    ...fonts.body2,
    marginTop: 10,
    marginLeft: 22,
  },
  dateText: {
    ...fonts.Caption1,
    position: 'absolute',
    right: 13,
    bottom: 8,
    color: '#444444',
  },
});

export default AlarmPage;
