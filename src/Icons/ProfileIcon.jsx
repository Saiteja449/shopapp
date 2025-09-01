import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ProfileIcon = ({ size = 24, color = '#e3e3e3' }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 -960 960 960"
      fill={color}
    >
      <Path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0 80q100 0 170 70t70 170v30H240v-30q0-100 70-170t170-70Z" />
    </Svg>
  );
};

export default ProfileIcon;
