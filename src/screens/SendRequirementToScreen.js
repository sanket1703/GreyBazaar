import React, { Component } from "react";
import { ImageBackground, View, StatusBar, Dimensions, Platform, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Container, Button, H3, Text, Header, Left, Right, Body, Title, } from "native-base";
import colors from '../../assets/colors'
const deviceHeight = Dimensions.get("window").height;


export default class SendRequirementToScreen extends Component {

    state = {
        qualityType: '',
        quantity: '',
    }


    componentDidMount() {
        console.disableYellowBox = true;
        const params = this.props.navigation.getParam('allRequirementsData', 'None')
        console.log('params from previous screen', params)
    }

    render() {
        return (
            <Container style={{ flex: 1, backgroundColor: colors.colorBlue }}>

                {/* <Header style={{ backgroundColor: colors.colorBlack }}>
                    <Body style={{ marginLeft: 40, }}>
                        <Title>Post My Requirement </Title>
                    </Body>
                    <Right />
                </Header> */}

                <Body style={styles.container}>

                    <Text style={styles.label}> Send Requirement To: </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SearchProfiles')} style={styles.button}>
                        <View>
                            <Text>Profiles</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Favorites')} style={styles.button}>
                        <View>
                            <Text> Favorites</Text>
                        </View>
                    </TouchableOpacity>
                </Body>
            </Container>
        )
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
    nextFont: {
        color: colors.colorBlack,

    },
    button: {
        backgroundColor: colors.colorWhite,
        marginTop: 40,
        borderRadius: 10,
        alignSelf: 'flex-end',
    },
})
