import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { COLORS, FONTS, SIZES, icons } from '../constants';

const HeaderBar = ({ title, leftOnPressed, right, containerStyle }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        ...containerStyle,
      }}
    >
      {/* Back */}
      <View
        style={{
          alignItems: 'flex-start',
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.transparentBlack
          }}
          onPress={leftOnPressed}
        >
          <Image 
            source={icons.left_arrow}
            resizeMode='contain'
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.white
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            colot: COLORS.white,
            ...FONTS.h3
          }}
        >
          {title}
        </Text>
      </View>

      {/* Settings */}
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: right ? COLORS.transparentBlack : null
        }}
      >
        {/* if the right prop is eqaul to true, then i will render this image */}
        {right &&
          <Image 
            source={icons.settings}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.white
            }}
          /> 
        }
      </TouchableOpacity>
    </View>
  )
}

export default HeaderBar

const styles = StyleSheet.create({})
