import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";


export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme:true,
    }
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };
  
  render() {
      return (
         <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate("PostScreen", {
              post: this.props.post
            })
          }
        >
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea}></SafeAreaView>
            <View style={this.state.light_theme
                ? styles.cardContainerLight
                : styles.cardContainer}>
              <View style={styles.authorContainer}>
                <View style={styles.authorImageContainer}>
                  <Image
                    source={require("../assets/image_1.jpg")}
                    style={styles.profileImage}
                  ></Image>
                </View>
                <View style={styles.authorNameContainer}>
                    <Text style={  this.state.light_theme
                    ? styles.postAuthorTextLight
                    : styles.postAuthorText}>{this.props.post.author}</Text>
                </View>
              </View>
              <Image source={require("../assets/image_1.jpg")} style={styles.postImage}></Image>
              <View style={styles.captionContainer}>
                <Text style={ this.state.light_theme
                    ? styles.captionTextLight
                    : styles.captionText}>
                  {this.props.post.caption}
                </Text>
              </View>
              <View style={styles.actionContainer}>
                <View style={styles.likeButton}>
                  <Ionicons name={"heart"} size={RFValue(30)} color={"white"}/>
                  <Text style={ this.state.light_theme
                      ? styles.likeTextLight
                      : styles.likeText}>12K</Text>
                </View>
              </View>
            </View>
        </View>
        </TouchableOpacity>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  cardContainer: {
    margiTop:-20,
    marginBottom:20,
    marginLeft:20,
    marginRight:10,
    backgroundColor:"#231F20",
    borderRadius:200,
    height:undefined,
    padding:10,
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: "#231F20",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2)
  },
  authorContainer:{
    flexDirection:"row"
  },
  authorImageContainer:{
  resizeMode:"center"
  },
 profileImage:{
  resizeMode:"contain",
  width:Dimensions.get('window').width-60,
  height:undefined,
  borderRadius:10
 },
  authorNameContainer:{
   alignItems:"center",
   justifyContent:"center",
  },
 postAuthorNameText:{
    fontSize:RFValue(18),
    color:"white",
    marginLeft:-50,
    alignItems:"center",
  },
  postAuthorTextLight: {
    fontSize: RFValue(18),
    color: "black",
    marginLeft:-50,
    alignItems:"center",
  },
  captionContainer:{
    marginTop:2,
     marginRight:160,
    alignItems:"center",
    color:"white"
  },
  captionText:{
    marginRight:10,
    fontSize:RFValue(13),
    color:"white"
  },
  captionTextLight: {
    fontSize: RFValue(13),
    color: "black"
  },
  actionContainer:{
    marginTop:100,
    justifyContent:"center",
    alignItems:"center"
  },
  likeButton:{
    backgroundColor:"#eb3948",
    borderRadius:30,
    width:160,
    height:40,
    flexDirection:"row",
    marginTop:-120,
  },
  likeText:{
    color:"white",
    fontSize:25,
    marginLeft:25,
    marginTop:-2,
  },
  likeTextLight: {
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});
