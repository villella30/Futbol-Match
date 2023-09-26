import React from "react";
import { View, Text, StyleSheet } from "react-native";



function AddPostForm() {
    return (
        <View>
            <Text></Text>
        </View>
    );
}

function FormAdd() {
    const [country, setCountry] = useState("ARG");
    const [callingCode, setCallingCode] = useState("54")
    const [phone, setPhone] = useState("")

    return (
        <View>
            <Input
                placeholder="Nombre de la cancha"
            />
            <Input
                placeholder="Direccion de la cancha"
            />
            <Input
                keyboardType="email-address"
                placeholder="Nombre de la cancha"
            />
            <View>
                 
            </View>
        </View>
    )
}

export default AddPostForm;

const styles = StyleSheet.create({
    
})