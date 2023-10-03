import React, { useRef, useState } from "react";
import { View, Text } from "react-native";
import Toast from 'react-native-easy-toast'
import AddPostForm from "./addPostForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Loading from "../../components/Loading";

function AddPost({ navigation }) {
    const toastRef = useRef();
    const [loading, setLoading] = useState(false);


    return (
        <KeyboardAwareScrollView>
            <AddPostForm toastRef={toastRef} setLoading={setLoading} />
            <Loading isVisible={loading} />
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </KeyboardAwareScrollView>
    );
}



export default AddPost;