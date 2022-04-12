import React, { useEffect } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';

import backgroundImage from '../Assets/mountainBackground.jpg';
import { BackgoundImage } from './styles';
import {
  INPUT_RANGE_START,
  INPUT_RANGE_END,
  OUTPUT_RANGE_START,
  OUTPUT_RANGE_END,
  ANIMATION_TO_VALUE,
  ANIMATION_DURATION,
} from './Constants';

const translateIn = {
  inX: -(Dimensions.get('window').width * 0.9375),
  inY: -(Dimensions.get('window').height * 0.9375),
};

export default function BackgroundAnimation() {
  const inicialValue = 0;
  const translateValue = new Animated.Value(inicialValue);

  useEffect(() => {
    const translate = () => {
      translateValue.setValue(inicialValue);
      Animated.timing(translateValue, {
        toValue: ANIMATION_TO_VALUE,
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => translate());
    };

    translate();
  }, [translateValue]);

  const translateAnimation = translateValue.interpolate({
    inputRange: [0.01,0.02,0.03,0.04,0.05,0.06,0.07,0.08,0.09,0.1,0.11,0.12,0.13,0.14,0.15,0.16,0.17,0.18,0.19,0.2,0.21,0.22,0.23,0.24,0.25,0.26,0.27,0.28,0.29,0.3,0.31,0.32,0.33,0.34,0.35,0.36,0.37,0.38,0.39,0.4,0.41,0.42,0.43,0.44,0.45,0.46,0.47,0.48,0.49,0.5,0.51,0.52,0.53,0.54,0.55,0.56,0.57,0.58,0.59,0.6,0.61,0.62,0.63,0.64,0.65,0.66,0.67,0.68,0.69,0.7,0.71,0.72,0.73,0.74,0.75,0.76,0.77,0.78,0.79,0.8,0.81,0.82,0.83,0.84,0.85,0.86,0.87,0.88,0.89,0.9,0.91,0.92,0.93,0.94,0.95,0.96,0.97,0.98,0.99,1],//[INPUT_RANGE_START, 0.5, INPUT_RANGE_END],
    outputRange: [576,577,581,585,590,597,605,614,624,635,647,660,674,688,704,720,737,754,772,791,810,829,848,868,888,907,927,946,965,984,1003,1021,1038,1055,1071,1087,1101,1115,1128,1140,1151,1161,1170,1178,1185,1190,1194,1198,1199,1200,1199,1198,1194,1190,1185,1178,1170,1161,1151,1140,1128,1115,1101,1087,1071,1055,1038,1021,1003,984,965,946,927,907,888,868,848,829,810,791,772,754,737,720,704,688,674,660,647,635,624,614,605,597,590,585,581,577,576,575]//[OUTPUT_RANGE_START, OUTPUT_RANGE_END, OUTPUT_RANGE_START],
  });

  const AnimetedImage = Animated.createAnimatedComponent(BackgoundImage);

  return (
    <AnimetedImage
      source={backgroundImage} 
      style={{
        zIndex: 10,
        position: 'absolute',
        
        zIndex:0,
        transform: [
          {
            translateX: translateAnimation,
          },
        //   {
        //     translateY: translateAnimation,
        //   },
        ],
      }}
      translateIn={translateIn}
    />
  );
}