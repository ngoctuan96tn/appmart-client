import React, { useEffect, useState } from "react"
import { Box, FlatList, Center, NativeBaseProvider, Icon, View, Image, Text } from "native-base"
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import ApiCommon from "../constants/ApiCommon";
import { Modal, Button } from "native-base";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function NotifyScreen() {
  const navigation = useNavigation();
  const { getItem, setItem } = useAsyncStorage('token');
  const [retrieve, setRetrieve] = useState(true);
  const [token, setToken] = useState<string | null>('');
  const [isLoading, setLoading] = useState(true);
  const [itemNotifi, setItemNotifi] = useState([]);
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState(undefined)
  const [content, setContent] = useState({})
  useEffect(() => {
    const readToken = async () => {
      const item = await getItem();
      setToken(item);
      setRetrieve(false);
    };
    if (retrieve) {
      readToken();
    }
    if (retrieve === false) {
      const headers = { 'Authorization': `Bearer ${token}` }
      if (isLoading) {
        fetch(ApiCommon.rootUrl + `/api/notifycations`, { headers })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.code == 1) {
              setItemNotifi(responseJson.listData);
              setLoading(false)
            }
          })
      }
    }
  }, [retrieve]);

  const openModal = (placement: any) => {
    setOpen(true)
    setPlacement(placement)
  }

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <FlatList
          data={itemNotifi}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              if (item.notifyType == 1) {
                navigation.navigate('UserBilling')
              } else {
                openModal("top"), setContent(item.content)
              }


            }}>
              <View style={{ flexDirection: "row", marginTop: '5%' }}>
                <View style={{ width: '15%', alignContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../assets/images/MiMartLogoGradientApp.png')} alt="image base" resizeMode="cover" width='80%' height={45} rounded="80" />
                  {item.notifyType == 1 &&
                    <Center
                      p={1}
                      rounded="full"
                      bg='#FFCC66'
                      boxSize={25}
                      position="absolute"
                      right={0}
                      m={2}
                      top={3}
                      left={6}
                      _text={{
                        color: "white",
                        textAlign: "center",
                        fontWeight: "700",
                        fontSize: "xs",
                      }}
                    >
                      <FontAwesome name='dropbox' color='#fff' size={18} />
                    </Center>
                  }
                </View>
                <View style={{ width: '85%' }}>
                  <Box width='100%' px={5} py={2} rounded="lg" bg="primary.300" height={55} backgroundColor='#FFCC66'>
                    <Text style={{fontWeight:'bold'}}>{item.title}</Text>
                    {item.notifyType == 1 &&
                    <Text style={{fontSize:12, fontStyle:'italic'}}>{item.content}</Text>
                  }
                  </Box>
                </View>

              </View>

            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </Center>
      <Modal isOpen={open} onClose={() => setOpen(false)} mt={12}>
        <Modal.Content maxWidth="400px" style={styles.top}>
          <Modal.CloseButton />
          <Modal.Header>Nội dung</Modal.Header>
          <Modal.Body>
            {content}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button
                onPress={() => {
                  setOpen(false)
                }}
              >
                Đóng
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </NativeBaseProvider>
  )
}

const styles = {
  top: {
    marginBottom: "auto",
    marginTop: 0,
  },
  bottom: {
    marginBottom: 0,
    marginTop: "auto",
  },
  left: {
    marginLeft: 0,
    marginRight: "auto",
  },
  right: {
    marginLeft: "auto",
    marginRight: 0,
  },
  center: {},
}