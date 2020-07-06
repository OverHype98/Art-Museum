import React, { Component } from "react";
import {
    View,
    Image,
    Dimensions,
} from "react-native";

let screenWidth = Dimensions.get("window").width;

export class ArtObjectCard extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={{
                    height: 200,
                    margin: 10,
                }}
            >
                <View

                >
                    <Image
                        borderRadius={15}
                        source={this.props.image}
                        style={{
                            width: this.props.width ? this.props.width : screenWidth - 20,
                            height: this.props.height ? this.props.height : 200,
                            resizeMode: "cover"
                        }}
                    />

                </View>
            </View>
        );
    }
}
