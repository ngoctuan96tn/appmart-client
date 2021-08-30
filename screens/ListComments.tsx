import {
  NativeBaseProvider, Modal, Button
} from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput, Image, SafeAreaView
} from 'react-native';
import moment from "moment";
import ApiCommon from '../constants/ApiCommon';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";

export default function ListComments(route: any) {
  const postId = route.route.params.postId;
  const [listComments, setListComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [retrieve, setRetrieve] = useState(true);
  const [token, setToken] = useState<string | null>('');
  const { getItem, setItem } = useAsyncStorage('token');
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState(undefined);
  const [updateComment, setUpdateComment] = useState('');
  const [commentId, setcommentId] = useState(Number);
  const [postArticles, setPostArticles] = useState([])
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
          }
        })

      const headers = { 'Authorization': `Bearer ${token}` }
      fetch(ApiCommon.rootUrl + `/api/post/${postId}`, { headers })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.code == 1) {
            setPostArticles(responseJson.listData);
            setLoading(false)
          }
        })
    }

  }, [retrieve]);

  const openModal = (placement: any) => {
    setOpen(true)
    setPlacement(placement)
  }

  return (
    <View style={styles.container}>
      <NativeBaseProvider>
        <FlatList
          data={postArticles}
          renderItem={({ item }) => (
            <SafeAreaView>
              <View style={styles.profileUserStatus}>
                <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${item.user.avatarHashCode}` }} />

                <View style={styles.nameContainer}>
                  <Text style={styles.nameText}>{item.user.userName}</Text>
                  <Text style={styles.timeText}>{moment(item.createDate).format("hh:mm DD-MM-YY")}</Text>
                </View>
              </View>
              <Text style={styles.captionText}>{item.content}</Text>
              <FlatList
                data={item.mediaList}
                renderItem={({ item }) => (
                  <Image style={styles.feedImage} source={{ uri: `data:image/jpeg;base64,${item.attachBase64}` }} />
                )}
              />
            </SafeAreaView>
          )}
        />
        <FlatList
          style={styles.root}
          data={listComments}
          renderItem={({ item }) => (
            <View style={styles.containerComment}>
              <ScrollView>
                <View style={styles.content}>
                  <View style={styles.profileUserStatus}>
                    <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${item.userImageBase64}` }} />

                    <View style={styles.nameContainer}>
                      <Text style={styles.name}>{item.userName}</Text>
                      <Text style={styles.time}>
                        {moment(item.createAt).format("hh:mm DD-MM-YY")}
                      </Text>
                    </View>
                    <MenuProvider style={{ flexDirection: "column", padding: 30 }}>
                      <Menu>

                        <MenuTrigger >
                          <MaterialCommunityIcons name="dots-vertical" color={'#fff'} size={25} />
                        </MenuTrigger  >

                        <MenuOptions>
                          <MenuOption value={"Cập nhật"}>
                            <Text style={styles.menuContent} onPress={() => { openModal("top"), setUpdateComment(item.content), setcommentId(item.id) }}>Cập nhật</Text>
                          </MenuOption>
                          <MenuOption value={"Xóa"}>
                            <Text style={styles.menuContent} onPress={() => deleteComment(item.id, item.userId, token)}>Xóa</Text>
                          </MenuOption>
                        </MenuOptions>

                      </Menu>
                    </MenuProvider>
                  </View>
                  <Text>{item.content}</Text>
                </View>
                <View style={styles.buttonGroupContainer}>
                  <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={{ fontSize: 12 }}>Thích</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonContainer} onPress={() => setComment('Đang trả lời @' + item.userName)}>
                    <Text style={{ fontSize: 12 }}>Trả lời </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          )}
          keyExtractor={(item: any) => {
            return item.id;
          }}
        />

        <Modal isOpen={open} onClose={() => setOpen(false)} mt={12}>
          <Modal.Content maxWidth="400px" style={styles.top}>
            <Modal.CloseButton />
            <Modal.Body>
              <TextInput
                multiline={true}
                style={styles.input}
                placeholder="Viết bình luận công khai..."
                onChangeText={updateComment => setUpdateComment(updateComment)}
                value={updateComment}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button.Group variant="ghost" space={2}>
                <Button onPress={() => {
                  setOpen(false), updateComments(updateComment, commentId, token)
                }}>Cập nhật</Button>
                <Button onPress={() => {
                  setOpen(false)
                }}>
                  Đóng
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
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
      </NativeBaseProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    marginBottom: "auto",
    marginTop: 0,
  },
  feedImage: {
    height: 300,
    marginTop: 10,
  },
  menuContent: {
    padding: 1,
    fontSize: 15,
    backgroundColor: '#CCDEE4'
  },
  profileUserStatus: {
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
  captionText: {
    marginTop: 10,
    backgroundColor: '#CCDEE4',
    fontSize: 15,
    padding: 5
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
    backgroundColor: "#fff",
    marginTop: 10,
    height: '100%'
  },
  container: {
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: '100%'
  },
  containerComment: {
    paddingVertical: 2,
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
    marginRight: '35%'
  },
  buttonGroupContainer: {
    height: 35,
    flexDirection: 'row'
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

export function updateComments(content: string, commentId: Number, token: any) {
  fetch(ApiCommon.rootUrl + `/api/post/comment`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      content: content,
      id: commentId,
    }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.code == 1) {
        //reload screen
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

export function deleteComment(commentId: any, userId: any, token: any) {
  fetch(ApiCommon.rootUrl + `/api/post/comment/${commentId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.code == 1) {
        //reload screen
      }
    })
    .catch((error) => {
      console.log(error)
    });
}