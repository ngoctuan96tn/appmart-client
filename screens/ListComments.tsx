import { NativeBaseProvider } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView, TextInput, Image
} from 'react-native';
import ApiCommon from '../constants/ApiCommon';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ListComments(route: any) {
  const postId = route.route.params.postId;
  const [listComments, setListComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [retrieve, setRetrieve] = useState(true);
  const [token, setToken] = useState<string | null>('');
  const { getItem, setItem } = useAsyncStorage('token');
  useEffect(() => {

    const readToken = async () => {
      const item = await getItem();
      setToken(item);
      setRetrieve(false);
    };

    if (retrieve) {
      readToken();
    }

    if (isLoading) {
      fetch(ApiCommon.rootUrl + `/api/post/${postId}/comments`)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.code == 1) {
            setListComments(responseJson.listData);
            setLoading(false)
          }
        })
    }

  }, [retrieve]);

  return (
    <><FlatList
      style={styles.root}
      data={listComments}
      extraData={listComments}
      ItemSeparatorComponent={() => {
        return (
          <View style={styles.separator} />
        );
      }}
      keyExtractor={(item: any) => {
        return item.id;
      }}
      renderItem={(item) => {
        const commentData = item.item;
        console.log(commentData);
        return (
          <SafeAreaView style={styles.container}>
            <NativeBaseProvider>
              <ScrollView>
                <View style={styles.content}>
                  <View style={styles.profileUserStatus}>
                    <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${commentData.userImageBase64}` }} />

                    <View style={styles.nameContainer}>
                      <Text style={styles.name}>{commentData.userName}</Text>
                      <Text style={styles.time}>
                        {commentData.createAt}
                      </Text>
                    </View>
                  </View>
                  <Text>{commentData.content}</Text>
                </View>
                <View style={styles.buttonGroupContainer}>
                  <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={{ fontSize: 12 }}>Thích</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer} onPress={() => setComment('Đang trả lời @' + commentData.userName)}>
                    <Text style={{ fontSize: 12 }}>Trả lời </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </NativeBaseProvider>
          </SafeAreaView>
        );
      }} />
      <View style={styles.searchSection}>
        <TextInput
          multiline={true}
          style={styles.input}
          placeholder="Viết bình luận công khai..."
          onChangeText={comment => setComment(comment)}
          value={comment}
        />
        <TouchableOpacity>
          <MaterialCommunityIcons name="comment-arrow-right" style={{ paddingTop: 10 }} color={'#CCDEE4'} size={70} onPress={() => {
            saveComment(comment, token, postId)
          }} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  profileUserStatus: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#CCDEE4',
    color: '#424242',
    borderRadius: 10,
    height: 70,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0
  },
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  buttonGroupContainer: {
    height: 30,
    flexDirection: 'row'
  },
  container: {
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#CCDEE4'
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#BDBDBD',
  },
  nameContainer: {
    marginLeft: 10,
  },
});

export function saveComment(comment: any, token: any, postId: any) {
  const body = {
    content: comment,
    postId: postId,
  }

  fetch(ApiCommon.rootUrl + '/api/post/comment', {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.code == 1) {
      }
    })
    .catch((error) => {
      console.log(error)
    });
}