import { View, Text, Image, TouchableOpacity, TextInput, FlatList, Dimensions, Platform, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { Datos } from '../../components/Products.js';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    backgroundColor: 'green'
  },
  headerCont: {
    display: 'flex',
    alignContent: 'center'
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
  },
  searchBar: {
    color: 'black',
    backgroundColor: 'white',
    height: 30,
    borderRadius: 15,
    width: '85%',
    display: 'flex',
    alignSelf: 'center',
    marginTop: 10,
    paddingHorizontal: 10
  },
  posts: {
    backgroundColor: 'white',  
    borderRadius: 8,  
    paddingVertical: 35,  
    paddingHorizontal: 25,  
    width: '100%',  
    marginVertical: 10,  
  },
  shadowProp: {
    shadowOffset: { width: -2, height: 4 },
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  postsImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 7,
    marginHorizontal: 10,

  },
  postsName: {
    marginBottom: 7,
    marginHorizontal: 10,

  },
  postsLastName: {
    marginBottom: 7,
    marginHorizontal: 10,

  },
  postsFollowers: {
    marginBottom: 7,
    marginHorizontal: 10,

  },
  postsDescription: {
    marginBottom: 20,
    marginHorizontal: 10,

  }

})

export default function HomeScreen() {
  return (

    // Header //

    <View style={style.container}>
      <SafeAreaView style={style.safe}>
        <View style={style.headerCont}>
          <Text style={style.headerText}>
            Buenos Aires, ARG
          </Text>
        </View>

        {/* Search Bar */}

        <View>
          <View>
            <TextInput placeholder='Buscar' style={style.searchBar} />
          </View>
        </View>
      </SafeAreaView>

      {/* Posts */}

      <View style={style.container}>
        <FlatList
          data={Datos}
          renderItem={({ item: Data }) => (
            <View style={[style.posts, style.shadowProp]} key={Data.id}>
              <Image style={style.postsImage} source={Data.img} />
              <Text style={style.postsName}>Nombre: {Data.name}</Text>
              <Text style={style.postsLastName}>Apellido: {Data.apellido}</Text>
              <Text style={style.postsFollowers}>Seguidores: {Data.seguidores}</Text>
              <Text style={style.postsDescription}>Descripcion: {Data.texto}</Text>
            </View>
          )}
        />
      </View>

    </View>
  )
}