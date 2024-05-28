import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, ScrollView, Alert, Pressable, Image, Platform, Text, TouchableOpacity } from "react-native";
import { Avatar, Button, Icon, Input } from "react-native-elements";
import { map, size, filter, isEmpty, set } from "lodash";
import MapView, { Marker } from "react-native-maps";
import { format } from 'date-fns';

import DateTimePicker from '@react-native-community/datetimepicker'
import es from 'date-fns/locale/es';

import { getCurrentLocation, loadImageFromGallery } from "../../utils/helpers";
import Modal from "../../components/Modal"

const widthScreen = Dimensions.get("window").width

export default function AddPostForm({ toastRef, setLoading, navigation }) {
    const [formData, setFormData] = useState(defaultFormValues());
    const [errorName, setErrorName] = useState(null);
    const [errorDescription, setErrorDescription] = useState(null);
    const [errorAddress, setErrorAddress] = useState(null);
    const [imagesSelected, setImagesSelected] = useState([]);
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [locationField, setLocationField] = useState(null);
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showPickerDate, setShowPickerDate] = useState(false);
    const [showPickerTime, setShowPickerTime] = useState(false);


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
        if (!locationField) {
            toastRef.current.show("Debes localizar la cancha en el mapa.", 3000);
            isValid = false;
        }
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
                setIsVisibleMap={setIsVisibleMap}
                locationField={locationField}
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
                showPickerTime={showPickerTime}
                setShowPickerTime={setShowPickerTime}
                showPickerDate={showPickerDate}
                setShowPickerDate={setShowPickerDate}
                eventDate={eventDate}
                setEventDate={setEventDate}
                eventTime={eventTime}
                setEventTime={setEventTime}
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
    const [newRegion, setNewRegion] = useState(null)

    useEffect(() => {
        (async () => {
            const response = await getCurrentLocation()
            if (response.status) {
                setNewRegion(response.location)
            }
        })()
    }, [])

    const confirmLocation = () => {
        setLocationField(newRegion)
        toastRef.current.show("Localizacion guardada correctamente", 3000)
        setIsVisibleMap(false)
    }


    return (
        <Modal isVisible={isVisibleMap} setVisible={setIsVisibleMap}>
            <View>
                {
                    newRegion && (
                        <MapView
                            style={styles.mapStyle}
                            initialRegion={newRegion}
                            showsUserLocation={true}
                            onRegionChange={(region) => setNewRegion(region)}
                        >
                            <Marker
                                coordinate={{
                                    latitude: newRegion.latitude,
                                    longitude: newRegion.longitude
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
                        onPress={confirmLocation}
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
    setIsVisibleMap,
    locationField,
    eventDate,
    setEventDate,
    eventTime,
    setEventTime,
    date,
    setDate,
    time,
    setTime,
    showPickerTime,
    setShowPickerTime,
    showPickerDate,
    setShowPickerDate,

}) {

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const selectedDate = new Date()


    const onChangeDate = (event, selectedDate) => {
        setShowPickerDate(Platform.OS === "ios");
        if (selectedDate) {
            const formattedDate = format(selectedDate, "dd MMMM yyyy", {
                locale: es,
            });
            setDate(selectedDate);
            setEventDate(formattedDate);
        }
    };

    function toTimeStringWithoutSeconds(date) {
        if (!(date instanceof Date)) {
            throw new Error("Invalid date object");
        }

        const hours = date.getHours().toString().padStart(2, '0'); // Obtener las horas y asegurarse de que tenga dos dígitos
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Obtener los minutos y asegurarse de que tenga dos dígitos

        return `${hours}:${minutes}`;
    }

    const selectedTime = new Date()
    const formattedTimeWithoutSeconds = toTimeStringWithoutSeconds(selectedTime);

    const onChangeTime = (event, selectedTime) => {
        setShowPickerTime(Platform.OS === "ios");
        if (selectedTime) {
            const formattedTime = format(selectedTime, "HH:mm", { locale: es });
            setTime(selectedTime);
            setEventTime(formattedTime);
        }
    };

    const showDatePicker = () => {
        setShowPickerDate(true);
    };

    const showTimePicker = () => {
        setShowPickerTime(true);
    };

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
                    color: locationField ? "green" : "red",
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

            <View>
                {showPickerDate && (                //SET DATE
                    <DateTimePicker
                        mode="date"
                        display="spinner"
                        value={date}
                        locale="es-ES"
                        onChange={onChangeDate}
                        style={styles.datePicker}
                        timeZoneName={'America/Argentina/a'}

                    />
                )}
                {showPickerDate && Platform.OS === 'ios' && (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: "space-around"
                        }}
                    >
                        <TouchableOpacity style={[
                            styles.buttonDate,
                            styles.pickerButton,
                            { backgroundColor: '#11182711' }
                        ]}
                            onPress={() => setShowPickerDate(false)}                        >
                            <Text
                                style={[styles.buttonText,
                                { color: "#075985" }
                                ]}
                            >Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[
                            styles.buttonDate,
                            styles.pickerButton,
                        ]}
                            onPress={() => {
                                setShowPickerDate(false);
                            }}
                        >
                            <Text
                                style={[styles.buttonText,
                                ]}
                            >confirmar</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {showPickerTime && (        //SET TIME
                    <DateTimePicker
                        mode="time"
                        display="spinner"
                        value={date}
                        locale="es-ES"
                        onChange={onChangeTime}
                        style={styles.datePicker}
                        timeZoneName={'America/Argentina/a'}

                    />
                )}


                {showPickerTime && Platform.OS === 'ios' && (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: "space-around"
                        }}
                    >
                        <TouchableOpacity style={[
                            styles.buttonDate,
                            styles.pickerButton,
                            { backgroundColor: '#11182711' }
                        ]}
                            onPress={() => setShowPickerTime(false)}
                        >
                            <Text
                                style={[styles.buttonText,
                                { color: "#075985" }
                                ]}
                            >Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[
                            styles.buttonDate,
                            styles.pickerButton,
                        ]}
                            onPress={() => {
                                setShowPickerTime(false);
                            }}
                        >
                            <Text
                                style={[styles.buttonText,
                                ]}
                            >confirmar</Text>
                        </TouchableOpacity>
                    </View>
                )}


                {!showPickerDate && (
                    <Pressable onPress={showDatePicker}>
                        <Input
                            placeholder={format(date, "dd MMMM yyyy", { locale: es })}
                            value={eventDate}
                            onChangeText={setEventDate}
                            editable={false}
                            rightIcon={{
                                type: "font-awesome",
                                name: "calendar",
                                onPress: showDatePicker,
                            }}
                        />
                    </Pressable>
                )}

                {!showPickerTime && (
                    <Pressable onPress={showTimePicker}>
                        <Input
                            placeholder={format(time, "HH:mm", { locale: es })}
                            value={eventTime}
                            onChangeText={setEventTime}
                            editable={false}
                            rightIcon={{
                                type: "font-awesome",
                                name: "clock-o",
                                onPress: showTimePicker,
                            }}
                        />
                    </Pressable>
                )}
            </View>

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
    },
    datePicker: {
        height: 120,
        marginTop: -10
    },
    buttonDate: {
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: '#075985'
    },
    pickerButton: {
        paddingHorizontal: 20
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "500",
        color: '#fff'
    }
})


