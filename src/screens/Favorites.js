import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Dimensions, Platform, StyleSheet, TextInput, TouchableOpacity,FlatList,ActivityIndicator } from "react-native";
import { Container, H3, Text, Header, Left, Right, Body, Title, } from "native-base";
import colors from '../../assets/colors'
const deviceHeight = Dimensions.get("window").height;

import {Item,Icon,Input,CheckBox,Card,CardItem,Content,Thumbnail,Grid,Button, Subtitle} from 'native-base'
import ProfileCard from '../../src/components/ProfileCard.js'
import * as firebase from 'firebase/app'
import 'firebase/firestore'


export default class SearchProfiles extends Component {

    constructor(props) {
        super(props);
        this.state = {
          db: firebase.firestore(),
          data:[],
          search: '',
          displayData: [],
          favs : [],
          favData : [],
          documentData: [],
                limit: 9,
                lastVisible: null,
                loading: false,
                refreshing: false,
                notfirstTime: true,
                direct: 'false',
                visible: false,
    
        }
      
      }
    
    
      onFocusFunction = (email) => {
        const user = firebase.auth().currentUser
        console.log("i am focused")
        firebase
          .firestore()
          .collection("Users").doc(email)
          .get()
          .then((querySnapshot) => { 
          
              var favs
              favs = querySnapshot.get("favorites")
             this.setState(
               {
                 favs : favs
               }
             )
          
          });
        this.handleChange('')
    
    }
    
    
    
    componentDidMount() {
    
    
        const user = firebase.auth().currentUser
        email = 'abc@gmail.com'
        this.setState({ email: email })
        
        console.log("success kinda")
        
        //this.firebasegetdata(user.email)
        //this.retrieveData(user.email)
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.onFocusFunction(email)
        })
        
        // firebase
        //   .firestore()
        //   .collection("Users").doc(user.email)
        //   .get()
        //   .then((querySnapshot) => { 
          
        //       var favs
        //       favs = querySnapshot.get("favorites")
        //      console.log("My Favs"+favs)
          
        //   });
    
    }
    
    componentWillUnmount() {
        this.focusListener.remove()
    }
    
        
        renderFooter = () => {
          try {
              // Check If Loading
              if (this.state.loading) {
                  return (
                      <View style = {{flex:1, justifyContent:'center', marginTop:300}}>
                        <ActivityIndicator size="large" color="#1a237e"/>
                      </View>
                  )
              }
              else {
                  return null;
              }
          }
          catch (error) {
              console.log(error);
          }
      };
    
    
    
    
    
    
      static navigationOptions = {
        headerShown:false
    }
    
    
    
    
    showFav = async() => {
      let data  = []
      console.log("This is the list"+this.state.favs)
      await this.state.favs.forEach(
      async (elem)=>{
        await
      firebase
      .firestore()
      .collection("Users").doc(elem)
      .get()
      .then((querySnapshot) => { 
        
        console.log("My DATA"+querySnapshot.data().email)
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          
         data.push(querySnapshot.data())
        
      //  this.setState(
      //    {
      //      favData :[ ...this.state.favData, querySnapshot.data() ]
      //    }
      //  )
    
        });
    
       
    });
     this.setState(
    
          { favData : data,
            loading : false
          }
    
      )
    console.log("Check data "+data)
    console.log("Chevk state "+ this.state.favData)
    }
    
    
    
    
    
    
    
    
    handleChange = async(search) => {
      let Data = []
      this.setState({displayData: []})
      try {
        this.setState({loading:true})
        console.log('searching for ',search)
        await this.state.db.collection('Users')
            .where('keywords','array-contains',search)
            .get()
            .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
                  Data.push(doc.data());
                  
              
              });
          })
          console.log(Data)
          this.setState({
           //documentData: Data,
           displayData:Data,
            loading:false,
    
          },console.log("This is the data we are looking for : "+ this.state.displayData));
          //Data=[]
          
    
        
      }
     
     catch (error) {
       console.log(error);
     }
    }
    
    
    
    handleRefresh = () => {
      try {
        this.setState({refreshing:true})
        this.showFav()
        this.handleChange('')
        
        this.setState({
            
            refreshing:false
        })
    }
    catch (error) {
      console.log(error);
    }
    }
    render() {
        console.disableYellowBox = true
        var {navigate} = this.props.navigation;
        return (
            

              
    
            <View style = {{flex:1}}>
              
              <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search people" 
                   onChangeText={(search) => this.handleChange(search)}
                   />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search </Text>
          </Button>
          
        </Header>
        
          {(this.state.loading)?<ActivityIndicator size='large'/>:null}
        <View>
          <Text>
            favorites
          </Text>
        </View>
        {(Array.isArray(this.state.favs))?
          <FlatList
          
          scrollEnabled={true}
          
          data= {this.state.favData}
          renderItem={({ item }) => 
          <TouchableOpacity onPress = {
            ()=>navigate("ProfileDetails",{item})
        }>
        <ProfileCard
            // image  = {require('../../assets/media2.jpg')}
          Name = {item.name}
          Sports = {item.name}
          Ratings = {item.email}
          Branch={item.email}
          Year = {item.state}
        >
      </ProfileCard>
    </TouchableOpacity>
    
      }
      ListHeaderComponent={this.renderHeader}
                   
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}

        />:
        <Text>You have no Favorites</Text>}
        
           
            </View>
            
      );
                        
               
        
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        color: colors.colorWhite,
        fontSize: 14,
    },
    inputBox: {
        marginVertical: 14,
        paddingHorizontal: 16,
        width: 300,
        height: 50,
        backgroundColor: colors.colorShadow,
        fontSize: 16,
        // borderRadius: 25,
    },
    nextFont:{
        color: colors.colorBlack,
      
    },
    button: {
        backgroundColor: colors.colorWhite,
        marginTop: 40,
        borderRadius: 10,
        alignSelf:'flex-end',
    },
})
