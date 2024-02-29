import React, {useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
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
} from './assets/icons/svg';
import {fonts} from './src/assets/fonts/fonts';
import DetailPage from './DetailPage';

const data = [
  {key: 0, title: '과자', icon: 'Snack'},
  {key: 1, title: '음료', icon: 'Drink'},
  {key: 2, title: '디저트', icon: 'Dessert'},
  {key: 3, title: '라면', icon: 'Ramen'},
  {key: 4, title: '생활용품', icon: 'Household_goods'},
  {key: 5, title: '유제품', icon: 'Dairy_products'},
  {key: 6, title: '의약용품', icon: 'Medicine'},
  {key: 7, title: '주류', icon: 'Alcoholic'},
  {key: 8, title: '미용', icon: 'Beauty'},
];

const App = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [key, setKey] = useState();

  const handlePress = key => {
    setShowDetail(true);
    setKey(key);
    //console.log(data[key]);
  };

  // const data = [
  //   {key: '1', title: '바나나킥1'},
  //   {key: '2', title: '바나나킥2'},
  //   {key: '3', title: '바나나킥3'},
  // ];

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{backgroundColor: '#0247F9', flex: 1}}
        edges={['top']}>
        {/* 위 부분 (소개) */}
        <View style={styles.intro_container}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text style={[fonts.H3, {color: 'white'}]}>이승섭</Text>
              <Text style={[fonts.Body1, {color: 'white'}]}>
                님, 안녕하세요.
              </Text>
            </View>
            <View>
              <Text style={[fonts.Body1, {color: 'white'}]}>
                세븐일레븐 한양대학교 에리카점
              </Text>
            </View>
          </View>
          {/* 알람 */}
          <View style={{justifyContent: 'center'}}>
            <Alarm />
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
                <Text style={fonts.Subtitle1}>1월27일 토요일</Text>
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
                      <Text style={[fonts.H3, {color: 'black'}]}>26°C</Text>
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
                      <Text style={[fonts.H3, {color: 'black'}]}>50%</Text>
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
                      <Text style={[fonts.H3, {color: 'black'}]}>50%</Text>
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
                    {true && (
                      <View style={styles.alarm}>
                        {/* 알람 숫자 */}
                        <Text style={[fonts.Subtitle2, {color: 'white'}]}>
                          4
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
                      {item.icon === 'Household_goods' && <Household_goods />}
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
});

export default App;
