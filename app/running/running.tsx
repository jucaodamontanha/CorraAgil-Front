import { Image, StatusBar, Text, View, Alert } from "react-native"
import { useEffect, useRef, useState } from "react";
import styles from "./style"
import { Button } from "../../src/components/Button"
import { AntDesign, MaterialIcons, Octicons } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';


export default function Running() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [customInterval, setCustomInterval] = useState<ReturnType<typeof setInterval> | null>(null);
  const [paused, setPaused] = useState(true);

  const [distance, setDistance] = useState(0);
  const [previousLocation, setPreviousLocation] = useState<Location.LocationObject | null>(null);
  const [calories, setCalories] = useState(0);
  const userWeight = 70; // Peso do usuário (pode ser dinâmico)
  const MET = 9.8; // Corrida a 10km/h

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const mapRef = useRef<MapView>(null);


  // Função para calcular a distância percorrida
  const getDistanceFromLatLonInKm = (coords1: Location.LocationObjectCoords, coords2: Location.LocationObjectCoords) => {

    const toRad = (value: number) => (value * Math.PI) / 180;

    const R = 6371; // Raio da Terra em km
    const dLat = toRad(coords2.latitude - coords1.latitude);
    const dLon = toRad(coords2.longitude - coords1.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coords1.latitude)) * Math.cos(toRad(coords2.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Retorna a distância em km
  };


  // Atualiza a localização do usuário em tempo real
  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 1000, // Atualiza a cada 1s
          distanceInterval: 1, // Atualiza a cada 1m
        },
        (response) => {
          if (previousLocation) {
            const newDistance = getDistanceFromLatLonInKm(previousLocation.coords, response.coords);

            setDistance((prev) => prev + newDistance);
          }

          setPreviousLocation(response);
          setLocation(response);
          mapRef.current?.animateCamera({ center: response.coords });
        }
      );
    })();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [previousLocation]);


  // Atualiza o cálculo das calorias gastas com base no tempo
  const updateCalories = (newDistance: number) => {
    if (newDistance > distance) {
      const elapsedTime = (hours * 60) + minutes + (seconds / 60); // Tempo total em minutos
      const MET = 9.8; // Valor de MET para corrida (ajuste conforme necessário)
      const userWeight = 70; // Peso do usuário em kg (pode ser dinâmico)

      const newCalories = userWeight * MET * (elapsedTime / 60);
      setCalories(parseFloat(newCalories.toFixed(2)));
    }
  };

  useEffect(() => {
    if (location && previousLocation) {
      const newDistance = getDistanceFromLatLonInKm(previousLocation.coords, location.coords);
      setDistance((prev) => prev + newDistance);
      updateCalories(distance + newDistance);
    }
    setPreviousLocation(location);
  }, [location]);



  // Função para solicitar permissão de localização
  async function requestLocationPermissions() {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {

      Alert.alert("Permissão negada", "É necessário permitir o acesso à localização.");
      return;
    }

    const currentPosition = await Location.getCurrentPositionAsync();
    setLocation(currentPosition);
  }

  useEffect(() => {
    requestLocationPermissions();
  }, [])

  useEffect(() => {
    if (location) {
      mapRef.current?.animateCamera({ center: location.coords });
    }
  }, [location]);


  // Funções para controle do cronômetro
  const startTimer = () => {
    if (customInterval !== null && !paused) {
      return
    }

    const intervalId = setInterval(() => {
      changeTime();
    }, 1000);

    setCustomInterval(intervalId);
    setPaused(false);
  }

  const stopTimer = () => {
    if (customInterval) {
      clearInterval(customInterval);
      setCustomInterval(null);
      setPaused(true);
    }
  };

  const clearTimer = () => {
    stopTimer();
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setPaused(true);
  }

  const changeTime = () => {
    setSeconds((prevState) => {
      if (prevState + 1 === 60) {
        setMinutes((prevMinutes) => {
          if (prevMinutes + 1 === 60) {
            setHours((prevHours) => prevHours + 1);
            return 0;
          }
          return prevMinutes + 1;

        });

        return 0;
      }

      return prevState + 1;
    })
  }

  const confirmFinishRun = () => {
    stopTimer(); // Pausa o cronômetro

    Alert.alert(
      "Finalizar corrida",
      "Tem certeza que deseja finalizar a corrida?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Finalizar",
          onPress: () => {
            clearTimer(); // Reseta o tempo
            setPaused(true);

            const userTimer = getTotalTimeInSeconds()
            const userDistance = distance;
            const userCalories = calories;

            setDistance(0);
            setCalories(0);

          }
        }
      ]
    );
  };

  const getTotalTimeInSeconds = () => {
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    return totalSeconds;
  };

  // useEffect(() => {
  //   let subscription: Location.LocationSubscription | null = null;

  //   (async () => {
  //     subscription = await Location.watchPositionAsync(
  //       {
  //         accuracy: Location.Accuracy.Highest,
  //         timeInterval: 1000,
  //         distanceInterval: 1,
  //       },
  //       (response) => {
  //         setLocation(response);
  //         mapRef.current?.animateCamera({ center: response.coords });
  //       }
  //     );
  //   })();

  //   return () => {
  //     if (subscription) {
  //       subscription.remove();
  //     }
  //   };
  // }, []);

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
          <Text style={styles.timer}>
            {hours < 10 ? "0" + hours : hours}:
            {minutes < 10 ? "0" + minutes : minutes}:
            {seconds < 10 ? "0" + seconds : seconds}
          </Text>
          <Text style={styles.duration}>Duração</Text>
        </View>

        <View style={styles.status}>
          <View style={styles.distance}>
            <Text style={styles.distanceKM}>{distance.toFixed(2)}</Text>
            <Text style={{ color: "#FFA500" }}>Distancia(KM)</Text>
          </View>

          <View style={styles.calories}>
            <Text style={styles.caloriesQuant}>{calories}</Text>
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
            initialRegion={
              location
                ? {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005
                }
                : undefined
            }
            showsUserLocation={true}
            customMapStyle={darkMapStyle}
          />
        }

        <View style={styles.transparentView}>
          <View>
            {paused ?
              <Button
                title="CORRER"
                variant="primary"
                onPress={startTimer}
                IconCenter={AntDesign}
                IconCenterName="caretright"
              />
              :
              <View style={styles.boxButton}>
                <Button
                  title="Finalizar"
                  variant="primary"
                  onPress={confirmFinishRun}
                  style={styles.buttonRun} />

                <Button
                  title="Pausar"
                  variant="primary"
                  onPress={stopTimer}
                  style={styles.buttonRun}
                  IconCenter={MaterialIcons}
                  IconCenterName="pause" />

              </View>
            }
          </View>

          <BlurView intensity={4} style={[styles.blurView, { backgroundColor: '#12263A' }]}>

            <View style={styles.buttonMenu}>

              <View style={styles.notification}>
                <MaterialIcons name="notifications" size={24} color="#FFA500" />
                <Text style={styles.text}> Notificação </Text>
              </View>

              <View style={styles.run}>
                <MaterialIcons name="directions-run" size={24} color="#FFA500" />
                <Text style={styles.text}> Correr </Text>
              </View>

              <View style={styles.timerButton}>
                <MaterialIcons name="timer" size={24} color="#FFA500" />
                <Text style={styles.text}> Timer </Text>
              </View>

              <View style={styles.historical}>
                <Octicons name="history" size={24} color="#FFA500" />
                <Text style={styles.text}> Histórico </Text>

              </View>

            </View>

          </BlurView>
        </View>
      </View>

    </View>
  )
}