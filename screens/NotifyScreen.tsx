import React, { useEffect, useState } from "react"
import { Box, FlatList, Center, NativeBaseProvider } from "native-base"
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import ApiCommon from "../constants/ApiCommon";
import { TouchableRipple } from "react-native-paper";
export default function NotifyScreen() {
  const { getItem, setItem } = useAsyncStorage('token');
  const [retrieve, setRetrieve] = useState(true);
  const [token, setToken] = useState<string | null>('');
  const [isLoading, setLoading] = useState(true);
  const [itemNotifi, setItemNotifi] = useState([]);
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

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <FlatList
          data={itemNotifi}
          renderItem={({ item }) => (
            <TouchableRipple onPress={() => console.log()}>
              <Box width={300} px={5} py={2} rounded="md" my={1} bg="primary.300">
                {item.title}
              </Box>
            </TouchableRipple>
          )}
          keyExtractor={(item) => item.id}
        />
      </Center>
    </NativeBaseProvider>
  )
}