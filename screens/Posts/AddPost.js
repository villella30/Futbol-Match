import React, { useRef, useState } from "react";
import { View, Text } from "react-native";
import Toast from 'react-native-easy-toast'
import AddPostForm from "../../posts/addPostForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function AddPost({ navigation }) {
    const toastRef = useRef();
    const [loading, setLoading] = useState(false);


    return (
        <KeyboardAwareScrollView>
            <AddPostForm toastRef={toastRef} setLoading={setLoading} />
        </KeyboardAwareScrollView>
    );
}



export default AddPost;