import {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Modal,
} from 'react-native';
import {fonts} from '../assets/fonts/fonts';

const snackImage = require('../assets/images/snack_bananakick.jpeg');

const DetailPage = ({setShowDetail, index}) => {
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const mainData = [
    [
      {key: '1', title: '바나나킥1'},
      {key: '2', title: '바나나킥2'},
      {key: '3', title: '바나나킥3'},
    ],

    [
      {key: '1', title: '사이다1'},
      {key: '2', title: '사이다2'},
      {key: '3', title: '사이다3'},
    ],
  ];

  const handleGoBack = () => {
    setShowDetail(false);
  };

  const handleOrder = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    setItems(mainData[index]);
    console.log(mainData[index]);
  }, []);

  return (
    <View style={styles.background}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 40,
          paddingVertical: 20,
        }}>
        <View style={{flexDirection: 'row', algnItems: 'center'}}>
          <Text style={fonts.Subtitle1}>과자</Text>
        </View>
        <Text style={fonts.Subtitle1}>이름/수량</Text>
        <Text style={fonts.Subtitle1}>재고관리</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center', // 가운데 정렬을 위한 스타일 추가
          alignItems: 'center',
        }}>
        <FlatList
          data={items}
          numColumns={1}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 12,
                borderBottomWidth: 1,
                borderBottomColor: 'white',
                paddingBottom: 12,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={snackImage} style={styles.image} />
                <View style={{marginLeft: 60}}>
                  <Text style={[fonts.Subtitle2, {textAlign: 'center'}]}>
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      fonts.Subtitle2,
                      {color: 'red'},
                      {textAlign: 'center'},
                    ]}>
                    0/2
                  </Text>
                </View>
              </View>
              <Pressable
                onPress={handleOrder}
                style={[styles.orderButton, {marginLeft: 60}]}>
                <Text
                  style={[
                    fonts.Subtitle2,
                    {color: 'white'},
                    {textAlign: 'center'},
                  ]}>
                  주문하기
                </Text>
              </Pressable>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  closeModal();
                }}>
                {/* 모달 내용 */}
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>주문되었습니다!</Text>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => closeModal()}>
                      <Text style={styles.textStyle}>닫기</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
          )}
          keyExtractor={item => item.key}
          contentContainerStyle={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          scrollEnabled={false}
        />
        <Pressable onPress={handleGoBack} style={styles.goBackButton}>
          <Text
            style={[fonts.Subtitle2, {color: 'white'}, {textAlign: 'center'}]}>
            돌아가기
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ECECEC',
    borderRadius: 32,
    flex: 1,
  },
  goBackButton: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: 100,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 16,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  orderButton: {
    width: 92,
    height: 36,
    backgroundColor: '#0247F9',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default DetailPage;
