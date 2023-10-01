import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, ScrollView, Alert, Text, Image } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { Avatar, Button, Icon, Input } from "react-native-elements";
import { map, size, filter, set } from "lodash";
import { getCurrentLocation, loadImageFromGallery } from "../constants/helpers";
import Modal from "../components/Modal"
import MapView, { Marker } from "react-native-maps";

const widthScreen = Dimensions.get("window").width

export default function AddPostForm({ toastRef, setLoading, navigation }) {
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])
    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const [locationField, setLocationField] = useState(null)



    const AddPost = () => {
        console.log(formData);
        console.log("se subio el post")
    }
    return (
        <ScrollView style={styles.containerView}>
            <ImageRestaurant
                imageRestaurant={imagesSelected[0]}
            />
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorDescription={errorDescription}
                errorAddress={errorAddress}
                setIsVisibleMap={setIsVisibleMap}
            />
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title="Subir post"
                onPress={AddPost}
                buttonStyle={styles.btnAddPost}
            />
            <MapField
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                locationField={locationField}
                setLocationField={setLocationField}
                toastRef={toastRef}
            />
        </ScrollView>
    );
}

function MapField({ isVisibleMap, setIsVisibleMap, locationField, setLocationField, toastRef }) {

    useEffect(() => {
        (async () => {
            const response = await getCurrentLocation()
            if (response.status) {
                setLocationField(response.location)
            }
        })()
    }, [])


    return (
        <Modal isVisible={isVisibleMap} setVisible={setIsVisibleMap}>
            <View>
                {
                    locationField && (
                        <MapView
                            style={styles.mapStyle}
                            initialRegion={locationField}
                            showsUserLocation={true}
                            onRegionChange={(region) => setLocationField(region)}
                        >
                            <Marker
                                coordinate={{
                                    latitude: locationField.latitude,
                                    longitude: locationField.longitude
                                }}
                                draggable
                            />
                        </MapView>
                    )
                }
                <View style={styles.viewMapButton} >
                    <Button
                        title="Guardar Ubicación"
                        containerStyle={styles.viewMapBtnContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                    />
                    <Button
                        title="Cancelar Ubicación"
                        containerStyle={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                        onPress={() => setIsVisibleMap(false)}
                    />
                </View>
            </View>
        </Modal>
    );
}

function UploadImage({ toastRef, imagesSelected, setImagesSelected }) {
    const imageSelect = async () => {
        const response = await loadImageFromGallery([4, 3])
        if (!response.status) {
            toastRef.current.show("No has seleccionado ninguna imagen.", 3000)
            return
        }
        setImagesSelected([...imagesSelected, response.image])
    }
    const removeImage = (image) => {
        Alert.alert(
            "Eliminar Imagen",
            "¿stas seguro de eliminar la imagen?",
            [
                {
                    text: 'No',
                    style: 'cancel'
                },
                {
                    text: 'Si',
                    onPress: () => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            {
                cancelable: true
            }
        )
    }
    return (
        <ScrollView
            horizontal
            style={styles.viewImage}
        >
            {
                size(imageSelect) < 10 && (
                    <Icon
                        type="materia-community"
                        name="camera"
                        color="#7a7a7a"
                        containerStyle={styles.containerIcon}
                        onPress={imageSelect}
                    />
                )

            }
            {map(imagesSelected, (imageCancha, index) => (
                <Avatar
                    key={index}
                    style={styles.miniatureStyle}
                    source={{ uri: imageCancha }}
                    onPress={() => { removeImage(imageCancha) }}

                />
            ))
            }

        </ScrollView>
    );
}

function ImageRestaurant({ imageRestaurant }) {
    return (
        <View style={styles.viewPhoto}>
            <Image
                style={{ width: widthScreen, height: 200 }}
                source={
                    imageRestaurant
                        ? { uri: imageRestaurant }
                        : require("../assets/no-image-icon-4.png")
                }
            />
        </View>
    )
}

function FormAdd({ formData, setFormData, errorName, errorDescription, errorAddress, setIsVisibleMap }) {

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre de la cancha"
                defaultValue={formData.name}
                onChange={(e) => onChange(e, "name")}
                errorMessage={errorName}
            />
            <Input
                placeholder="Direccion de la cancha"
                defaultValue={formData.address}
                onChange={(e) => onChange(e, "address")}
                errorMessage={errorAddress}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: "green",
                    onPress: () => {
                        setIsVisibleMap(true)
                    }
                }}
            />

            <Input
                placeholder="Descripción"
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.description}
                onChange={(e) => onChange(e, "description")}
                errorMessage={errorDescription}
            />
        </View>

    );
}

function defaultFormValues() {
    return {
        name: "",
        description: "",
        email: "",
        phone: "",
        address: "",
        country: "AR",
        callingCode: "54"
    }
}
const styles = StyleSheet.create({
    containerView: {
        height: '100%',
    },
    btnAddPost: {
        margin: 20,
        backgroundColor: 'green',
    },
    viewForm: {
        marginTop: 20,
        marginHorizontal: 10,
    },
    phoneView: {
        width: '80%'
    },
    // countryPicker: {

    // },
    inputPhone: {
        width: '80%'
    },
    textArea: {
        height: 100,
        width: '100%'
    },
    viewImage: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30,
    },
    containerIcon: {
        alignItems: 'center',
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10
    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
    mapStyle: {
        width: '100%',
        height: 550,

    },
    viewMapButton: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5
    },
    viewMapBtnContainerSave: {
        paddingRight: 5
    },
    viewMapBtnCancel: {
        backgroundColor: "#bababa",
    },
    viewMapBtnSave: {
        backgroundColor: "green"
    }


})


