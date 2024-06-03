import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Pressable,
  Switch,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {
  Alarm,
  Alcoholic,
  Beauty,
  Dairy_products,
  Dessert,
  Drink,
  Household_goods,
  Medicine,
  Ramen,
  Snack,
  Status,
} from './src/assets/icons/svg';
import {fonts} from './src/assets/fonts/fonts';
import DetailPage from './src/components/DetailPage';
import AlarmPage from './src/components/AlarmPage';
import getDate from './src/util/getDate';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const App = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [showAlarm, setShowAlarm] = useState(false);
  const [showRedDot, setShowRedDot] = useState(true);
  const [onoff, setonoff] = useState(false);
  const [key, setKey] = useState();
  const [snackAlarmCount, setsnackAlarmCount] = useState(0);
  const [drinkAlarmCount, setdrinkAlarmCount] = useState(0);
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchDataInterval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => {
      clearInterval(fetchDataInterval);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      const responseData = response.data.products;
      socket.on('sensorData', data => {
        let {light, temp, humi} = data;

        // console.log(light); // light 값을 출력하여 확인
        // console.log(temp); // temp 값을 출력하여 확인
        // console.log(humi); // humi 값을 출력하여 확인

        // 이전 상태를 직접 수정하고 새로운 배열을 생성하지 않음
        setSensorData([light, temp, humi]);
      });

      const snackItems = responseData.filter(item => item.category === '1');
      const drinkItems = responseData.filter(item => item.category === '2');

      setsnackAlarmCount(
        snackItems.filter(item => item.now_amount === 0).length,
      );
      setdrinkAlarmCount(
        drinkItems.filter(item => item.now_amount === 0).length,
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setShowRedDot(false);
  }, [snackAlarmCount, drinkAlarmCount]);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 서버에서 onoff 상태를 가져옴
    axios
      .get('http://localhost:3000/onoff')
      .then(response => {
        console.log(response.data); // 서버에서 받은 onoff 값 출력
        setonoff(response.data); // 서버에서 받은 상태로 업데이트
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const data = [
    {key: 0, title: '과자', icon: 'Snack', count: snackAlarmCount},
    {key: 1, title: '음료', icon: 'Drink', count: drinkAlarmCount},
    {key: 2, title: '디저트', icon: 'Dessert', count: 0},
    {key: 3, title: '라면', icon: 'Ramen', count: 0},
    {key: 4, title: '생활용품', icon: 'Household_goods', count: 0},
    {key: 5, title: '유제품', icon: 'Dairy_products', count: 0},
    {key: 6, title: '의약용품', icon: 'Medicine', count: 0},
    {key: 7, title: '주류', icon: 'Alcoholic', count: 0},
    {key: 8, title: '미용', icon: 'Beauty', count: 0},
  ];

  const handlePress = key => {
    setShowDetail(true);
    setKey(key);
  };

  const AlarmPress = () => {
    setShowAlarm(true);
    setShowRedDot(true);
  };

  const toggleAlarm = () => {
    const newOnoff = !onoff; // 현재 상태의 반대 값을 계산
    setonoff(newOnoff); // 상태 업데이트

    // 서버로 새로운 상태를 전송
    axios
      .post('http://localhost:3000/onoff', {onoff_now: newOnoff})
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{backgroundColor: '#0247F9', flex: 1}}
        edges={['top']}>
        {/* 알람 화면 */}
        {showAlarm && <AlarmPage setShowAlarm={setShowAlarm} />}
        {/* 나머지 페이지 */}
        {!showAlarm && (
          <View style={{flex: 1}}>
            <View style={styles.intro_container}>
              <View>
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                  <Text style={[fonts.H3, {color: 'white'}]}>이승섭</Text>
                  <Text style={[fonts.Body1, {color: 'white'}]}>
                    님, 안녕하세요.
                    {/* {socketData && <Text>{JSON.stringify(socketData)}</Text>} */}
                  </Text>
                </View>
                <View>
                  <Text style={[fonts.Body1, {color: 'white'}]}>
                    세븐일레븐 한양대학교 에리카점
                  </Text>
                  <Pressable onPress={toggleAlarm}></Pressable>
                </View>
              </View>
              {/* 알람 */}
              <View style={{justifyContent: 'center'}}>
                <Pressable onPress={AlarmPress}>
                  {!showRedDot && <View style={styles.redDots}></View>}
                  <Alarm />
                </Pressable>
              </View>
            </View>
            {/* 중간 부분 (매장 상태) */}
            {!showDetail ? (
              <View style={styles.background}>
                <View
                  style={{
                    backgroundColor: '#ECECEC',
                    borderRadius: 32,
                    paddingBottom: 36,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 32,
                      paddingVertical: 36,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Status style={{marginRight: 12}} />
                      <Text style={fonts.Subtitle1}>매장상태</Text>
                    </View>
                    <Switch
                      trackColor={{false: '#767577', true: '#81b0ff'}}
                      thumbColor={onoff ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleAlarm}
                      value={onoff}
                      style={{
                        marginLeft: -60,
                        transform: [{scaleX: 0.8}, {scaleY: 0.8}],
                      }}
                    />
                    <Text style={fonts.Subtitle1}>{getDate()}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 16,
                    }}>
                    {/* 온도 */}
                    <View style={styles.shadow}>
                      <View style={styles.status_box}>
                        <View style={styles.status_top}>
                          <Text style={[fonts.Subtitle2, {color: 'white'}]}>
                            온도
                          </Text>
                        </View>
                        <View style={styles.status_bottom}>
                          <Text style={[fonts.H3, {color: 'black'}]}>
                            {sensorData[1]}'C
                          </Text>
                          {/* <Text style={[fonts.H3, {color: 'black'}]}>19'C</Text> */}
                        </View>
                      </View>
                    </View>
                    {/* 습도 */}
                    <View style={styles.shadow}>
                      <View style={styles.status_box}>
                        <View style={styles.status_top}>
                          <Text style={[fonts.Subtitle2, {color: 'white'}]}>
                            습도
                          </Text>
                        </View>
                        <View style={styles.status_bottom}>
                          <Text style={[fonts.H3, {color: 'black'}]}>
                            {sensorData[2]}%
                          </Text>
                          {/* <Text style={[fonts.H3, {color: 'black'}]}>50%</Text> */}
                        </View>
                      </View>
                    </View>
                    {/* 조도 */}
                    <View style={styles.shadow}>
                      <View style={styles.status_box}>
                        <View style={styles.status_top}>
                          <Text style={[fonts.Subtitle2, {color: 'white'}]}>
                            조도
                          </Text>
                        </View>
                        <View style={styles.status_bottom}>
                          <Text style={[fonts.H3, {color: 'black'}]}>
                            {sensorData[0]}%
                          </Text>
                          {/* <Text style={[fonts.H3, {color: 'black'}]}>50%</Text> */}
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                {/* 구분선 */}
                <View style={{height: 12}} />
                {/* 아래 */}
                <View
                  style={{
                    backgroundColor: '#ECECEC',
                    borderRadius: 32,
                    flex: 1,
                  }}>
                  <FlatList
                    data={data}
                    numColumns={3}
                    renderItem={({item}) => (
                      <Pressable
                        style={styles.category_box}
                        onPress={() => handlePress(item.key)}>
                        {/* 빨간 알람 아이콘 */}
                        {item.count > 0 && (
                          <View style={styles.alarm}>
                            {/* 알람 숫자 */}
                            <Text style={[fonts.Subtitle2, {color: 'white'}]}>
                              {item.count}
                            </Text>
                          </View>
                        )}
                        {/* 카테고리 아이콘 */}
                        <View
                          style={{
                            width: 52,
                            height: 52,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          {item.icon === 'Snack' && <Snack />}
                          {item.icon === 'Drink' && <Drink />}
                          {item.icon === 'Dessert' && <Dessert />}
                          {item.icon === 'Ramen' && <Ramen />}
                          {item.icon === 'Household_goods' && (
                            <Household_goods />
                          )}
                          {item.icon === 'Dairy_products' && <Dairy_products />}
                          {item.icon === 'Medicine' && <Medicine />}
                          {item.icon === 'Alcoholic' && <Alcoholic />}
                          {item.icon === 'Beauty' && <Beauty />}
                        </View>
                        <Text style={fonts.Subtitle3}>{item.title}</Text>
                      </Pressable>
                    )}
                    keyExtractor={item => item.key}
                    contentContainerStyle={{
                      paddingVertical: 42,
                      flex: 1,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    scrollEnabled={false}
                  />
                </View>
              </View>
            ) : (
              <DetailPage setShowDetail={setShowDetail} index={key} />
            )}
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  intro_container: {
    backgroundColor: '#0247F9',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  background: {
    backgroundColor: '#DCDCDC',
    borderRadius: 32,
    flex: 1,
  },
  status_box: {
    backgroundColor: 'white',
    borderRadius: 32,
    overflow: 'hidden',
  },
  status_top: {
    width: 100,
    height: 36,
    backgroundColor: '#0247F9',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.85,
  },
  status_bottom: {
    width: 100,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 4,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  category_box: {
    width: 90,
    height: 90,
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 32,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 4,
  },
  alarm: {
    backgroundColor: 'red',
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    top: -6,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redDots: {
    position: 'absolute',
    right: 1,
    top: -2,
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#F64444',
  },
});

export default App;
