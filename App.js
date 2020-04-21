import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  useEffect,
  useState,
  ActivityIndicator,
  
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
  FlatList,  
} from 'react-native/Libraries/NewAppScreen';

import MapView from "react-native-maps";
import { Marker } from 'react-native-maps';
import { Callout } from 'react-native-maps';



export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

// coucou

  componentDidMount () {
    return fetch('https://api-ratp.pierre-grimaud.fr/v4/schedules/buses/43/Chartres/A')
      .then ( (response) => response.json() )
      .then( (responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.result.schedules,
        })

      })

      .catch((error) => {
        console.log(error)
      })
  }

  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
// horaire
        let horaire = this.state.dataSource.map((val, key) => {
           return <View key={key} style={styles.item}>
                        <Text>{val.destination}</Text>
                        <Text>{val.message}</Text>

                  </View>
        });

    return (
      <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: 48.884831,
          longitude: 2.26851,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker 
        coordinate={{ latitude: 48.882754, longitude: 2.276920 }}
        title={"Bus 43"}
        // image={require('./43.png')}
        >
                    <Image source={require('./43.jpg')} style={{ width: 27, height: 16 }} />
                    <Callout style={{ width: 200, height: 100  }}>
                      <Text>Bus 43 : Chartres</Text>
                      {horaire}
                    </Callout>
        </Marker>
      </MapView>       
    </View>
    );
  }
  
  }
}




const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // height: 400,
    // width: 400,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });
// export default App;
