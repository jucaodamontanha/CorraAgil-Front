import { Image, StatusBar, Text, View } from "react-native"
import { useEffect, useRef, useState } from "react";
import styles from "./style"
import { Button } from "../../src/components/Button"
import { Entypo } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function Running() {

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    
    const mapRef = useRef<MapView>(null);

    async function requestLocationPermissions() {
        const { granted } = await Location.requestForegroundPermissionsAsync();

        if (granted) {
            const currentPosition = await Location.getCurrentPositionAsync();
            setLocation(currentPosition);

        }
    }   

    useEffect( () => {
        requestLocationPermissions();
    }, [])

    useEffect( () => {
        Location.watchPositionAsync({
            accuracy: Location.LocationAccuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1
        }, (response) => {
            setLocation(response);
            mapRef.current?.animateCamera({
                center: response.coords
            })
        })
    },[])

    const darkMapStyle = [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#242f3e"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#263c3f"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#6b9a76"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#38414e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#212a37"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9ca5b3"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#746855"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#1f2835"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#f3d19c"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#2f3948"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#d59563"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#515c6d"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#17263c"
            }
          ]
        }
      ]


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#12263A" barStyle="light-content" />

            <View style={styles.boxTop}>
                <Image style={styles.logo} source={require("../../src/assets/corraAgil.png")} />

                <View style={styles.cronometro}>
                    <Text style={styles.timer}>00:00:00</Text>
                    <Text style={styles.duration}>Duração</Text>
                </View>

                <View style={styles.status}>
                    <View style={styles.distance}>
                        <Text style={styles.distanceKM}>0,00</Text>
                        <Text style={{ color: "#FFA500" }}>Distancia(KM)</Text>
                    </View>

                    <View style={styles.calories}>
                        <Text style={styles.caloriesQuant}>0</Text>
                        <Text style={{ color: "#FFA500" }}>Calorias</Text>
                    </View>

                    <View style={styles.steps}>
                        <Text style={styles.stepsDistance}>00:00</Text>
                        <Text style={{ color: "#FFA500" }}>Passos (min/km)</Text>
                    </View>

                </View>
            </View>

            <View style={styles.boxBottom}>

                {
                    location &&

                    <MapView
                    ref={mapRef}
                    style={styles.backgroundMap}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                    showsUserLocation={true}
                    customMapStyle={darkMapStyle}
                    />
                }

                <View style={styles.transparentView}>
                    <Button title="CORRER" variant="primary" />

                    <BlurView intensity={4} style={[styles.blurView, {backgroundColor: '#12263A'}]}>

                        <View style={styles.buttonMenu}>
                            <Text style={styles.text}>Notificação</Text>
                            <Text style={styles.text}>Correr</Text>
                            <Text style={styles.text}>Timer</Text>
                            <Text style={styles.text}>Histórico</Text>
                        </View>

                    </BlurView>
                </View>
            </View>

        </View>
    )
}