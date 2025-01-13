import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Logo = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 64 64"
    {...props}
  >
    <Path
      stroke="#f15bb5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M36.862 52.625h-22.3a4 4 0 0 1-4-4v-33.92a4 4 0 0 1 4-4h33.919a4 4 0 0 1 4 4v22.25"
    />
    <Path
      stroke="#f15bb5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="m52.486 36.958-15.629 15.67v-15.67h15.629Z"
    />
    <Path
      stroke="#f15bb5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M31.524 52.628h5.333l15.629-15.67v-8"
    />
  </Svg>
);
export default Logo;
