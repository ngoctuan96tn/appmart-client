import {
  NativeBaseProvider, Modal, Button, Input, KeyboardAvoidingView
} from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput, Image, SafeAreaView, Alert
} from 'react-native';
import moment from "moment";
import ApiCommon from '../constants/ApiCommon';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { createStackNavigator } from '@react-navigation/stack';
import { TabOneParamList } from '../types';

export function ListComments(route: any) {
  const postId = route.route.params.data.route.params.postId;
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
  const [userLogin, setUserLogin] = useState<any>({});

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
        });

      const headers = { 'Authorization': `Bearer ${token}` }
      fetch(ApiCommon.rootUrl + `/api/post/${postId}`, { headers })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.code == 1) {
            setPostArticles(responseJson.listData);
            setLoading(false)
          }
        });

      fetch(ApiCommon.rootUrl + '/api/user/login', { headers })
        .then((response) => response.json())
        .then((responseJson) => setUserLogin(responseJson));

    }

  }, [retrieve]);

  const openModal = (placement: any) => {
    setOpen(true)
    setPlacement(placement)
  }
  const loadCommentData = () => {
    fetch(ApiCommon.rootUrl + `/api/post/${postId}/comments`)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code == 1) {
          setListComments(responseJson.listData);
        }
      });
  }
  const saveComment = (comment: any, token: any, postId: any) => {
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
          //reload list comment
          loadCommentData();
          setComment('');
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const deleteComment = (commentId: any, userId: any, token: any) => {
    Alert.alert(
      "Xóa bình luận",
      `Bạn có chắc chắn muốn xóa bình luận ?`,
      [
        // The "Yes" button
        {
          text: "Có",
          onPress: async () => {

            // gọi api xóa bình luận
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
                  loadCommentData();
                }
              })
              .catch((error) => {
                console.log(error)
              });
            // gọi api xóa bình luận

          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Không",
        },
      ]
    );

  }

  const updateComments = (content: string, commentId: Number, token: any) => {
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
          loadCommentData();
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
      <View style={{ height: '87%', padding: '3%' }}>
        <ScrollView>

          <FlatList
            data={postArticles}
            renderItem={({ item }) => (
              <SafeAreaView>
                <View style={styles.profileUserStatus}>
                  <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${item.user.avatarHashCode}` }} />

                  <View style={styles.nameContainer}>
                    <Text style={{ fontWeight: 'bold' }}>{item.user.userName}</Text>
                    <Text>{moment(item.createDate).format("hh:mm DD-MM-YY")}</Text>
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
          <View style={{ flex: 1, height: 3, backgroundColor: 'black' }} />
          <FlatList
            style={styles.root}
            data={listComments}
            renderItem={({ item }) => (
              <View style={styles.containerComment}>


                <View style={styles.content}>
                  <View style={styles.profileUserStatus}>
                    <View style={{ width: '15%' }}>
                      <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${item.userImageBase64}` }} />
                    </View>

                    <View style={{ width: '80%' }}>
                      <Text style={styles.name}>{item.userName}</Text>
                      <Text>{item.content}</Text>
                    </View>
                    {/* <View style={{ width: '5%', paddingTop: 10 }}>
                      <MenuProvider style={{ flexDirection: "column", }}>
                        <Menu style={{ position: 'absolute' }}>
                          <MenuTrigger >
                            <MaterialCommunityIcons name="dots-vertical" color={'#000'} size={25} />
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
                    </View> */}
                  </View>
                </View>
                {item.userId == userLogin.id &&
                  <View style={styles.buttonGroupContainer}>
                    <Text style={styles.menuContent}>{moment(item.createAt).format("hh:mm DD-MM-YY")}</Text>
                    <TouchableOpacity onPress={() => { openModal("top"), setUpdateComment(item.content), setcommentId(item.id) }}>
                      <Text style={styles.menuContent}>Cập nhật</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteComment(item.id, item.userId, token)}>
                      <Text style={styles.menuContent} >Xóa</Text>
                    </TouchableOpacity>
                  </View>
                }

                {item.userId != userLogin.id &&
                  <View style={styles.buttonGroupContainer}>
                    <Text style={styles.menuContent}>{moment(item.createAt).format("hh:mm DD-MM-YY")}</Text>
                    <TouchableOpacity onPress={() => setComment('Trả lời @' + item.userName + ' ')}>
                      <Text style={{ fontSize: 12, marginLeft: '10%', fontWeight: 'bold' }}>Trả lời </Text>
                    </TouchableOpacity>
                  </View>
                }


              </View>
            )}
            keyExtractor={(item: any) => {
              return item.id;
            }}
          />
          <View style={{ height: 50 }}></View>
        </ScrollView>
        </View>
        <Modal isOpen={open} onClose={() => setOpen(false)} mt={12}>
          <Modal.Content maxWidth="400px" style={styles.top}>
            <Modal.Body>
              {/* <TextInput
                multiline={true}
                style={styles.input}
                placeholder="Viết bình luận công khai..."
                onChangeText={updateComment => setUpdateComment(updateComment)}
                value={updateComment}
              /> */}
              <Input
                variant="rounded"
                placeholder="Nhập bình luận..."
                m={1}
                w='100%'
                value={updateComment}
                _light={{
                  placeholderTextColor: "blueGray.400",
                }}
                _dark={{
                  placeholderTextColor: "blueGray.50",
                }}
                onChangeText={updateComment => setUpdateComment(updateComment)}
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
        <KeyboardAvoidingView behavior='position' style = {{backgroundColor: '#f5f5f5', flex: 1}}>
        <View style={styles.searchSection}>
          <Input
            variant="rounded"
            placeholder="Nhập bình luận..."
            m={1}
            w='80%'
            value={comment}
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
            onChangeText={comment => setComment(comment)}
          />
          <Feather name='send' size={30} style={{ width: '15%', paddingLeft: '3%', paddingTop: '3%' }} onPress={() => { saveComment(comment, token, postId) }} />

        </View>
        </KeyboardAvoidingView>
      </NativeBaseProvider>
    </SafeAreaView>
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
    fontSize: 12,
    marginLeft: 10,
    fontWeight: 'bold'
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
    fontSize: 15,
    padding: 5
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 5,
    width: '100%',
    height: 50
  },
  root: {
    backgroundColor: "#fff",
    marginTop: 20
  },
  container: {
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: '100%',
    flex: 1
  },
  containerComment: {
  },
  content: {
    flex: 1,
    borderRadius: 10,
    margin: 5,
    backgroundColor: '#f5f5f5'
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
    marginLeft: '2%',
    fontSize: 15,
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
    marginTop: '2%',
    height: 35,
    flexDirection: 'row'
  },
});

// export function saveComment(comment: any, token: any, postId: any) {
//   const body = {
//     content: comment,
//     postId: postId,
//   }

//   fetch(ApiCommon.rootUrl + '/api/post/comment', {
//     method: 'post',
//     body: JSON.stringify(body),
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     },
//   }).then((response) => response.json())
//     .then((responseJson) => {
//       if (responseJson.code == 1) {

//       }
//     })
//     .catch((error) => {
//       console.log(error)
//     });
// }

// export function updateComments(content: string, commentId: Number, token: any) {
//   fetch(ApiCommon.rootUrl + `/api/post/comment`, {
//     method: 'PUT',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     },
//     body: JSON.stringify({
//       content: content,
//       id: commentId,
//     }),
//   })
//     .then((response) => response.json())
//     .then((responseJson) => {
//       if (responseJson.code == 1) {
//         //reload screen
//       }
//     })
//     .catch((error) => {
//       console.error(error)
//     })
// }

// export function deleteComment(commentId: any, userId: any, token: any) {
//   Alert.alert(
//     "Xóa bình luận",
//     `Bạn có chắc chắn muốn xóa bình luận ?`,
//     [
//       // The "Yes" button
//       {
//         text: "Có",
//         onPress: async () => {

//           // gọi api xóa bình luận
//           fetch(ApiCommon.rootUrl + `/api/post/comment/${commentId}`, {
//             method: 'DELETE',
//             headers: {
//               Accept: 'application/json',
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//           }).then((response) => response.json())
//             .then((responseJson) => {
//               if (responseJson.code == 1) {
//                 //reload screen
//               }
//             })
//             .catch((error) => {
//               console.log(error)
//             });
//           // gọi api xóa bình luận

//         },
//       },
//       // The "No" button
//       // Does nothing but dismiss the dialog when tapped
//       {
//         text: "Không",
//       },
//     ]
//   );

// }


export default (data: any) => {
  return (
    <NativeBaseProvider>
      <TabOneNavigator data={data} />
    </NativeBaseProvider>
  )
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator(data: any) {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={ListComments}
        options={{ headerTitle: "BÌNH LUẬN", headerTitleAlign: 'center' }}
        initialParams={data}
      />
    </TabOneStack.Navigator>
  );
}
