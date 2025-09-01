import React from 'react';
import Svg, { Path } from 'react-native-svg';

const BackIcon = ({ size = 24, color = '#e3e3e3' }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
    >
      <Path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
    </Svg>
  );
};

export default BackIcon;
