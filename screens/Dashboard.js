import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
  ScrollView,
  Platform,
} from 'react-native';

import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../constants';

import { TextButton } from '../components';

// set up the contants variable for the countries item sizes or item width
const COUNTRIES_ITEM_SIZE = SIZES.width / 3;
const PLACES_ITEM_SIZE = Platform.OS === 'android' ? SIZES.width / 1.25 : SIZES.width / 1.2

// this is the width for the two empty object that are in our state hooks {id: -1} and {d: -2}
const EMPTY_ITEM_SIZES = (SIZES.width - PLACES_ITEM_SIZE) / 2

const Dashboard = ({ navigation }) => {

  // keep track the Animated Value of country Flatlist Scroll Position, this is that so we can work on the animations later on
  const countryScollX = useRef(new Animated.Value(0)).current;
  const placesScollX = useRef(new Animated.Value(0)).current;

  // as in the selected countries will always be in the middle 
  // we will need to pre-append and append empty objects into this React State Hook
  const [countries, setCountries] = useState([{id: 1}, ...dummyData.countries, {id: -2}])

  // same thing as the top explanation
  // the first object in the countries to be more precise
  const [places, setPlaces] = useState([{id: -1}, ...dummyData.countries[0].places, {id: -2}])


  // the Explore Button will allow us to capture the current selected place and navigate to the second screen
  const [placesScrollPosition, setPlacesScrollPosition] = useState(0)

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.base,
          alignItems: 'center',
          marginTop: 40,
        }}
      >
        {/* Side Drawer */}
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => console.log("Side Drawer")}
        >
          <Image 
            source={icons.side_drawer}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.white
            }}
          />
        </TouchableOpacity>

        {/* Label/Title */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
            }}
          >ASIA</Text>
        </View>

        {/* Profile */}
        <TouchableOpacity
          onPress={() => console.log('Profile')}
        >
          <Image 
            source={images.profile_pic}
            resizeMode="contain"
            style={{
              width: 45,
              height: 45,
              borderRadius: 30
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  function renderCountries() {
    return (
      <Animated.FlatList 
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={COUNTRIES_ITEM_SIZE}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        data={countries}
        keyExtractor={item => `${item.id}`}
        // this is to keep track of the scrol POsition for us to do the animtion later
        onScroll={
          Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: countryScollX
                }
              }
            }
          ], { useNativeDriver: false })}
          // this will able to change the right countries when we scroll to a country
        onMomentumScrollEnd={(event) => {
          // with these we can actually calc the current position
          var position = (event.nativeEvent.contentOffset.x / COUNTRIES_ITEM_SIZE).toFixed(0)

          // once we calc the position, we can Set the Place
          setPlaces([
            {id: -1},
            ...dummyData.countries[position].places,
            {id: -2}
          ])
        }}
        renderItem={({item, index}) => {
          const opacity = countryScollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRIES_ITEM_SIZE,
              (index - 1) * COUNTRIES_ITEM_SIZE,
              index * COUNTRIES_ITEM_SIZE
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          })

          const mapSize = countryScollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRIES_ITEM_SIZE,
              (index - 1) * COUNTRIES_ITEM_SIZE,
              index * COUNTRIES_ITEM_SIZE
            ],
            outputRange: [25, Platform.OS === 'android' ? 80 : 60, 25],
            extrapolate: 'clamp'
          })

          const fontSize = countryScollX.interpolate({
            inputRange: [
              (index - 2) * COUNTRIES_ITEM_SIZE,
              (index - 1) * COUNTRIES_ITEM_SIZE,
              index * COUNTRIES_ITEM_SIZE
            ],
            outputRange: [15, 25, 15],
            extrapolate: 'clamp',
          })

          // so if its the first item and the last item, we going to return an empty View
          if(index == 0 || index == countries.length - 1) {
            return (
              <View 
                style={{
                  width: COUNTRIES_ITEM_SIZE
                }}
              />
            )
            // if i am going to return something else
          } else {
            return (
              <Animated.View
                opacity={opacity}
                style={{
                  height: 130,
                  width: COUNTRIES_ITEM_SIZE,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Animated.Image 
                  source={item.image}
                  resizeMode="contain"
                  style={{
                    width: mapSize,
                    height: mapSize,
                    tintColor: COLORS.white
                  }}
                />
                <Animated.Text 
                  style={{
                    marginTop: 3,
                    color: COLORS.white,
                    ...FONTS.h1,
                    fontSize: fontSize
                  }}
                >
                  {item.name}
                </Animated.Text>
              </Animated.View>
            )
          }
        }}
      />
    )
  }


  // were retreivin selectedPlace the data when click using useEffect on Place Screen 
  function exploreButtonHandler() {
    // get places current index
    const currentIndex = parseInt(placesScrollPosition, 10) + 1 
    console.log(places[currentIndex])
    // Navigate to the next screen
    navigation.navigate('Place', {selectedPlace: places[currentIndex] })
  }

  function renderPlaces() {
    return (
      <Animated.FlatList 
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={places}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        snapToAlignment="center"
        snapToInterval={Platform.OS == 'android' ? PLACES_ITEM_SIZE + 28 : PLACES_ITEM_SIZE}
        scrollEventThrottle={16}
        decelerationRate={0}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                x: placesScollX
              }
            }
          }
        ],{useNativeDriver: false})}
        onMomentumScrollEnd={(event) => {
          // calc the position
          var position = (event.nativeEvent.contentOffset.x / PLACES_ITEM_SIZE).toFixed(0)

          // set the place scroll position
          setPlacesScrollPosition(position)
        }}
        renderItem={({item, index}) => {

          const opacity = placesScollX.interpolate({
            inputRange: [
              (index - 2) * PLACES_ITEM_SIZE,
              (index - 1) * PLACES_ITEM_SIZE,
              index * PLACES_ITEM_SIZE
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          })

          let activeHeight = 0;

          if (Platform.OS === 'android') {
            if(SIZES.height > 800) {
              activeHeight = SIZES.height / 2
            } else {
              activeHeight = SIZES.height / 1.65
            }
          } else {
            activeHeight = SIZES.height / 1.6
          }

          const height = placesScollX.interpolate({
            inputRange: [
              (index - 2) * PLACES_ITEM_SIZE,
              (index - 1) * PLACES_ITEM_SIZE,
              index * PLACES_ITEM_SIZE
            ],
            outputRange: [SIZES.height / 2.25, activeHeight, SIZES.height / 2.25],
            extrapolate: 'clamp'
          })

          // if its the first and the last item i will return an empty View
          if (index == 0 || index == places.length - 1) {
            return (
              <View 
                style={{
                  width: EMPTY_ITEM_SIZES,
                }}
              />
            )
          } else {
            return (
              <Animated.View
                opacity={opacity}
                style={{
                  width: PLACES_ITEM_SIZE,
                  height: height,
                  alignItems: 'center',
                  borderRadius: 20,
                  padding: 10,
                }}
              >
                <Image 
                  source={item.image}
                  resizeMode="cover"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: 20
                  }}
                />

                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginHorizontal: SIZES.padding
                  }}
                >
                  <Text
                    style={{
                      marginBottom: SIZES.radius,
                      color: COLORS.white,
                      ...FONTS.h1
                    }}
                  >{item.name}</Text>

                  <Text
                    style={{
                      marginBottom: SIZES.padding * 2,
                      textAlign: 'center',
                      color: COLORS.white,
                      ...FONTS.body3
                    }}
                  >{item.description}</Text>

                  <TextButton 
                    label="Explore"
                    customContainerStyle={{
                      position: 'absolute',
                      bottom: -20,
                      width: 150
                    }}
                    onPress={() => exploreButtonHandler()}
                  />
                </View>
              </Animated.View>
            )
          }
        }}
      />
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.black
      }}
    >
      {renderHeader()}

      <ScrollView
        contentContainerStyle={{
          // this is so the content of the ScrollView will not be block by the bottom TabNavigator 
          paddingBottom: Platform.OS === 'android' ? 40 : 0
        }}  
      >
        <View
          style={{
            height: 700,
          }}
        >
          {/* Countries */}
          <View>
            {renderCountries()}
          </View>

          {/* Places */}
          <View
            style={{
              height: Platform.OS === 'android' ? 500 : 450
            }}
          >
            {renderPlaces()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Dashboard;