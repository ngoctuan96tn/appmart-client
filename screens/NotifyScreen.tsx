import React, { useEffect, useState } from "react"
import { Box, FlatList, Center, NativeBaseProvider, Icon } from "native-base"
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import ApiCommon from "../constants/ApiCommon";
import { TouchableRipple } from "react-native-paper";
import { Modal, Button } from "native-base";
export default function NotifyScreen() {
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
            <TouchableRipple onPress={() => { openModal("top"), setContent(item.content) }}>
              <Box width={300} px={5} py={2} rounded="md" my={1} bg="primary.300">
                {item.title}
              </Box>
            </TouchableRipple>
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