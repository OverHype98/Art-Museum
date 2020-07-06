import React, { Component } from "react";
import {
    Text,
    View,
    Image,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
} from "react-native";


import { scale } from "react-native-size-matters";

let screenWidth = Dimensions.get("window").width;

export class ExhibitCard extends Component<Props>{
    static defaultProps={
        title:"",
        description:"",
        buttonText:"Button text",
        image:"",
    }
    constructor(props) {
        super(props);
        this.state = {color:"#900c3f"}
    }
    render() {
        const {
            title,
            description,
            image,
            buttonText,
            buttonColor
        } = this.props;
        return (
            <View
                style={{
                    backgroundColor: "#fff",
                    alignSelf: "center",
                    margin: 10,
                    flexDirection: "column",
                    width: screenWidth - 20,
                    borderWidth: 0,
                    borderRadius: 12,
                    elevation: 2,
                    shadowColor: "#777",
                    shadowOpacity: 0.16,
                    shadowRadius: 3,
                    shadowOffset: {
                        height: 1,
                        width: 0
                    }
                }}
            >


                <ImageBackground
                    borderRadius={12}
                    source={image}
                    style={{

                    }}
                >

                    <View
                        style={{
                            backgroundColor: "rgba(0,0,0,0.5)",
                            borderRadius: 12,
                            flex: 3,
                            height:350,
                            resizeMode:"contain",
                            justifyContent: "center",
                            alignItems:"center"
                        }}>
                        {this.props.onClickBook?
                            <TouchableOpacity
                                onPress={() => this.props.onClickBook()}
                                style={[
                                    {
                                        marginLeft: 180,
                                        justifyContent: "center",
                                        borderWidth: 0,
                                        borderColor: "#eee",
                                        alignItems: "center",
                                        paddingLeft:20,
                                        paddingRight:20,
                                        height: scale(40),
                                        marginTop: 0,
                                        shadowRadius: 5,
                                        borderRadius: scale(0),
                                        backgroundColor:  "#a293ee"
                                    }
                                ]}
                            >
                                <Text
                                    style={{
                                        color: "#ffffff",
                                        fontSize: 12,
                                        fontWeight: "900"
                                    }}
                                >
                                    Book now
                                </Text>
                            </TouchableOpacity>
                            :null}
                        <Text
                            style={{ color: "#ffffff", fontSize: scale(16), marginLeft: scale(12), marginTop: scale(10) }}
                        >
                            {title}
                        </Text>

                        <Text
                            style={{ color: "#ffffff", fontSize: scale(9), margin: scale(12), textAlign:"center", width:screenWidth-200 }}
                        >
                            {description}
                        </Text>



                        {this.props.onClickButton?
                            <TouchableOpacity
                                onPress={() => this.props.onClickButton()}
                                style={[
                                    {
                                        justifyContent: "center",
                                        borderWidth: 0,
                                        borderColor: "#eee",
                                        alignItems: "center",
                                        paddingLeft:20,
                                        paddingRight:20,
                                        height: scale(40),
                                        marginTop: 70,
                                        shadowRadius: 5,
                                        borderRadius: scale(0),
                                        backgroundColor:  buttonColor
                                    }
                                ]}
                            >
                                <Text
                                    style={{
                                        color: "#ffffff",
                                        fontSize: 12,
                                        fontWeight: "900"
                                    }}
                                >
                                    {buttonText}
                                </Text>
                            </TouchableOpacity>
                            :null}

                    </View>
                </ImageBackground>





            </View>
        );
    }
}