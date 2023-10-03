import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, ScrollView, Alert, Text, Image } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { Avatar, Button, Icon, Input } from "react-native-elements";
import { map, size, filter, isEmpty, set } from "lodash";
import { getCurrentLocation, loadImageFromGallery } from "../../utils/helpers";
import Modal from "../../components/Modal"
import MapView, { Marker } from "react-native-maps";

const widthScreen = Dimensions.get("window").width

export default function AddPostForm({ toastRef, setLoading, navigation }) {
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])
    // const [isVisibleMap, setIsVisibleMap] = useState(false)
    // const [locationField, setLocationField] = useState(null)



    const AddPost = () => {
        if (!validForm()) {
            return
        }
        console.log("se subio el post")
    }

    const validForm = () => {
        clearErrors()
        let isValid = true;

        if (isEmpty(formData.name)) {
            setErrorName("Debes ingresar el nombre de la cancha");
            isValid = false;
        }
        if (isEmpty(formData.address)) {
            setErrorAddress("Debes ingresar la direccion de la cancha");
            isValid = false;
        }
        if (isEmpty(formData.description)) {
            setErrorDescription("Debes ingresar una descripcion de la cancha");
            isValid = false;
        }
        // if (!locationField) {
        //     toastRef.current.show("Debes localizar la cancha en el mapa.", 3000);
        //     isValid = false;
        // } 
        if (size(imagesSelected) === 0) {
            toastRef.current.show("Debes agregar al menos una imagen de la cancha.", 3000);
            isValid = false;
        }
        return isValid;
    }

    const clearErrors = () => {
        setErrorDescription(null)
        setErrorName(null)
        setErrorAddress(null)
    }



    return (
        <ScrollView style={styles.containerView}>
            <ImageField
                imageCancha={imagesSelected[0]}
            />
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorDescription={errorDescription}
                errorAddress={errorAddress}
                // setIsVisibleMap={setIsVisibleMap}
                // locationField={locationField}
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
            {/* <MapField
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                locationField={locationField}
                setLocationField={setLocationField}
                toastRef={toastRef}
            /> */}
        </ScrollView>
    );
}

// function MapField({ isVisibleMap, setIsVisibleMap, locationField, setLocationField, toastRef }) {
//     const [newRegion, setNewRegion] = useState(null)

//     useEffect(() => {
//         (async () => {
//             const response = await getCurrentLocation()
//             if (response.status) {
//                 setNewRegion(response.location)
//             }
//         })()
//     }, [])

//     const confirmLocation = () => {
//         setLocationField(newRegion)
//         toastRef.current.show("Localizacion guardada correctamente", 3000)
//         setIsVisibleMap(false)
//     }


//     return (
//         <Modal isVisible={isVisibleMap} setVisible={setIsVisibleMap}>
//             <View>
//                 {
//                     newRegion && (
//                         <MapView
//                             style={styles.mapStyle}
//                             initialRegion={newRegion}
//                             showsUserLocation={true}
//                             onRegionChange={(region) => setNewRegion(region)}
//                         >
//                             <Marker
//                                 coordinate={{
//                                     latitude: newRegion.latitude,
//                                     longitude: newRegion.longitude
//                                 }}
//                                 draggable
//                             />
//                         </MapView>
//                     )
//                 }
//                 <View style={styles.viewMapButton} >
//                     <Button
//                         title="Guardar Ubicación"
//                         containerStyle={styles.viewMapBtnContainerSave}
//                         buttonStyle={styles.viewMapBtnSave}
//                         onPress={confirmLocation}
//                     />
//                     <Button
//                         title="Cancelar Ubicación"
//                         containerStyle={styles.viewMapBtnContainerCancel}
//                         buttonStyle={styles.viewMapBtnCancel}
//                         onPress={() => setIsVisibleMap(false)}
//                     />
//                 </View>
//             </View>
//         </Modal>
//     );
// }

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

function ImageField({ imageCancha }) {
    return (
        <View style={styles.viewPhoto}>
            <Image
                style={{ width: widthScreen, height: 200 }}
                source={
                    imageCancha
                        ? { uri: imageCancha }
                        : require("../../assets/no-image-icon-4.png")
                }
            />
        </View>
    )
}

function FormAdd({
    formData,
    setFormData,
    errorName,
    errorDescription,
    errorAddress,
    // setIsVisibleMap,
    // locationField
}) {

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
                    color: "green"
                    // color: locationField ? "green" : "red",
                    // onPress: () => {
                    //     setIsVisibleMap(true)
                    // }
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


