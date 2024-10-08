import { useState, useEffect } from 'react';
import axios from "axios";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Modal,
} from 'react-native';
import { fonts } from '../assets/fonts/fonts';

const snackImages = [
  require('../assets/images/snack_01.jpeg'),
  require('../assets/images/snack_02.jpeg'),
  require('../assets/images/snack_03.jpeg'),
  require('../assets/images/snack_04.jpeg'),
  require('../assets/images/snack_05.jpeg'),
  require('../assets/images/snack_06.jpeg')
];

const drinkImages = [
  require('../assets/images/drink_01.jpeg'),
  require('../assets/images/drink_02.jpeg'),
  require('../assets/images/drink_03.jpeg')
];

const DetailPage = ({ setShowDetail, index }) => {
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
    requestGet();
  }, []);

  const requestGet = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      const data = response.data;

      const snackItems = data.products.filter(item => item.category === "1");
      const drinkItems = data.products.filter(item => item.category === "2");

      if (index === 0) {
        setItems(snackItems);
      } else if (index === 1) {
        setItems(drinkItems);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.background}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 40,
          paddingVertical: 20,
        }}>
        <View style={{ flexDirection: 'row', algnItems: 'center' }}>
          <Text style={fonts.Subtitle1}>과자</Text>
        </View>
        <Text style={fonts.Subtitle1}>이름/수량</Text>
        <Text style={fonts.Subtitle1}>재고관리</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          data={items}
          numColumns={1}
          style={{ width: '100%' }}
          renderItem={({ item, index }) => (
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
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image 
                  source={item.category === "1" ? snackImages[index % snackImages.length] : drinkImages[index % drinkImages.length]} 
                  style={styles.image} 
                />
                <View style={{ marginLeft: 40 }}>
                  <Text style={[fonts.Subtitle2, { textAlign: 'center', width: 90 }]}>
                    {item.name}
                  </Text>
                  {item.now_amount > 0 ? (
                    <Text
                      style={[
                        fonts.Subtitle2,
                        { color: 'black' },
                        { textAlign: 'center' },
                      ]}>
                      {item.now_amount}/{item.amount}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        fonts.Subtitle2,
                        { color: 'red' },
                        { textAlign: 'center' },
                      ]}>
                      {item.now_amount}/{item.amount}
                    </Text>
                  )}
                </View>
                <Pressable
                  onPress={handleOrder}
                  style={[styles.orderButton, { marginLeft: 40 }]}>
                  <Text
                    style={[
                      fonts.Subtitle2,
                      { color: 'white', textAlign: 'center' },
                    ]}>
                    주문하기
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        />
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
        <Pressable onPress={handleGoBack} style={styles.goBackButton}>
          <Text
            style={[fonts.Subtitle2, { color: 'white', textAlign: 'center' }]}>
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
    position: 'absolute',
    alignItems: 'center',
    width: 100,
    padding: 10,
    backgroundColor: '#0247F9',
    borderRadius: 16,
    bottom: 40,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
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
