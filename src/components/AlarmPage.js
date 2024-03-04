import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, StyleSheet, Pressable} from 'react-native';
import {Arrow} from '../assets/icons/svg';

import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {fonts} from '../assets/fonts/fonts';

const mainData = [
  {
    key: '1',
    title: '바나나킥을 주문해주세요!',
    body: '바나나킥 재고가 다 떨어졌습니다!',
    date: '2024-03-02',
    isRead: false,
  },
  {
    key: '2',
    title: '바나나킥을 주문해주세요!',
    body: '바나나킥 재고가 다 떨어졌습니다!',
    date: '2024-03-02',
    isRead: false,
  },
  {
    key: '3',
    title: '바나나킥을 주문해주세요!',
    body: '바나나킥 재고가 다 떨어졌습니다!',
    date: '2024-03-02',
    isRead: false,
  },
  {
    key: '4',
    title: '바나나킥을 주문해주세요!',
    body: '바나나킥 재고가 다 떨어졌습니다!',
    date: '2024-03-02',
    isRead: false,
  },
  {
    key: '5',
    title: '바나나킥을 주문해주세요!',
    body: '바나나킥 재고가 다 떨어졌습니다!',
    date: '2024-03-02',
    isRead: false,
  },
  {
    key: '6',
    title: '바나나킥을 주문해주세요!',
    body: '바나나킥 재고가 다 떨어졌습니다!',
    date: '2024-03-02',
    isRead: false,
  },
];

const AlarmPage = ({setShowAlarm}) => {
  const handleGoBack = () => {
    setShowAlarm(false); // 알람 페이지를 닫음
  };

  return (
    <View style={{backgroundColor: '#0247F9', flex: 1}} edges={['top']}>
      <View style={styles.intro_container}>
        <View style={styles.header}>
          <Pressable
            onPress={handleGoBack}
            style={{marginLeft: 20, marginTop: 10}}>
            <Arrow />
          </Pressable>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 35,
            }}>
            <Text style={[fonts.H3, {color: 'white'}]}>알림</Text>
          </View>
        </View>
      </View>
      <View style={styles.background}>
        <FlatList
          data={mainData}
          numColumns={1}
          style={{
            width: '100%',
            marginBottom: 20,
            marginTop: 30,
          }}
          renderItem={({item}) => {
            return (
              <View style={styles.alarmItem}>
                <View style={styles.redDots}></View>
                <Text
                  style={[fonts.Subtitle2, {marginTop: 10, marginLeft: 22}]}>
                  {item.title}
                </Text>
                <Text style={[fonts.body2, {marginTop: 10, marginLeft: 22}]}>
                  {item.body}
                </Text>
                <Text style={styles.DateText}>{item.date}</Text>
              </View>
            );
          }}
          keyExtractor={item => item.key}
          contentContainerStyle={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  intro_container: {
    backgroundColor: '#0247F9',
    width: '100%',
    height: '11%',
  },
  header: {
    marginTop: 25,
    flexDirection: 'row',
  },
  background: {
    backgroundColor: '#ECECEC',
    borderRadius: 32,
    flex: 1,
    justifyContent: 'center',
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
  redDots: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#F64444',
  },
  DateText: [
    fonts.Caption1,
    {
      position: 'absolute',
      right: 13,
      bottom: 8,
      color: '#444444',
    },
  ],
});

export default AlarmPage;
