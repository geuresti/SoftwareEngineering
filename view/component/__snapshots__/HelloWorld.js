import React from "react";
import { Text, View } from "react-native";
import MainStyle from "../MainStyle.style";


export default function HelloWorld(props){
    return (
        <View style={MainStyle.centerView}>
            <Text style=
            {[MainStyle.emphasisText,{color:props.mycolor}]}>
                Hello {props.children}
            </Text>
        </View>
    );
}