import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Animated,
} from 'react-native';

import { COLORS, SIZES, FONTS, icons } from '../constants';

import { HeaderBar, TextIconButton } from '../components';

const Place = ({navigation, route}) => {

  const [selectedPlace, setSelectedPlace] = React.useState(null);

  // were using useEffect hook to retreive selectedPlace from Dashboard Screens and store it into useState hook in this file
  React.useEffect(() => {
    let {selectedPlace} = route.params;
    setSelectedPlace(selectedPlace)
  }, [])

  function renderPlace() {
    return (
      <ImageBackground
        source={selectedPlace?.image}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <HeaderBar 
          title=""
          leftOnPressed={() => navigation.goBack()}
          right={false}
          containerStyle={{
            marginTop: SIZES.padding * 2
          }}
        />
        <View
          style={{
            flex: 1,
            paddingHorizontal: SIZES.padding,
            justifyContent: 'flex-end',
            marginBottom: 100
          }}
        >
          {/* Name & Rating */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.largeTitle,
              }}
            >{selectedPlace?.name}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  marginRight: 5,
                  color: COLORS.white,
                  ...FONTS.h3
                }}
              >{selectedPlace?.rate}</Text>
              <Image 
                source={icons.star}
                style={{
                  width: 20,
                  height: 20
                }}
              />
            </View>
          </View>

          {/* Description */}
          <Text
            style={{
              marginTop: SIZES.base,
              color: COLORS.white,
              ...FONTS.body3
            }}
          >{selectedPlace?.description}</Text>
          
          {/* Text Icon BUtton */}
          <TextIconButton 
            label="Book a flight"
            icon={icons.aeroplane}
            customContainerStyle={{
              marginTop: SIZES.padding
            }}
            onPress={() => console.log('Book a flight')}
          />
        </View>
      </ImageBackground>
    )
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {renderPlace()}
    </View>
  )
}

export default Place;