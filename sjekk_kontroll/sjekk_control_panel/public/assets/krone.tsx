import React from 'react';

interface IconProps {
  size?: number; // Default size will be 24 like Lucide icons
  color?: string; // Color to control SVG fill
  strokeColor?: string; // Color to control SVG stroke
  strokeWidth?: number; // Stroke width to control line thickness
  className?: string; // Allow passing custom class names
}

const KroneIcon: React.FC<IconProps> = ({
  size = 24, // Default size 24x24
  color = 'currentColor', // Default to `currentColor` for inheriting text color
  strokeColor = 'currentColor', // Default stroke color to match fill color
  strokeWidth = 2, // Default stroke width for bolder lines
  className = '', // Allow optional className
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 68.277 68.277"
      fill={color}
      stroke={strokeColor} // Add stroke color
      strokeWidth={strokeWidth} // Add stroke width for bolder lines
      className={className}
    >
      <g>
        <g>
          <g>
            <path d="M50.389,68.277h-8.174c-0.576,0-1.136-0.235-1.537-0.646c-0.381-0.371-0.617-0.931-0.617-1.506l0.009-45.477
              c0-1.186,0.965-2.15,2.149-2.15h7.137c1.187,0,2.15,0.965,2.15,2.15v1.724c2.623-2.049,6.801-4.023,13.164-4.023
              c1.188,0,2.152,0.965,2.152,2.151v7.115c0,0.579-0.227,1.122-0.639,1.529c-0.379,0.389-0.938,0.623-1.514,0.623h-2.818
              c-4.711,0.117-7.992,3.27-8.969,8.648c-0.166,0.999-0.34,2.212-0.34,3.468v24.242C52.542,67.312,51.577,68.277,50.389,68.277z
              M43.062,65.277h6.479V41.883c0-1.475,0.194-2.841,0.386-3.981c1.219-6.724,5.772-10.981,11.887-11.134h2.009v-5.405
              c-7.427,0.234-11.087,3.531-12.63,5.526c-0.393,0.506-1.064,0.707-1.672,0.502c-0.606-0.208-1.014-0.778-1.014-1.42v-4.473
              h-5.438L43.062,65.277z M36.141,68.277h-7.188c-0.759,0-1.495-0.312-2.02-0.855L13.123,53.038V65.5
              c0,1.531-1.255,2.776-2.799,2.776h-6.07c-1.543,0-2.799-1.245-2.799-2.776V2.776C1.455,1.245,2.71,0,4.254,0h6.07
              c1.543,0,2.799,1.245,2.799,2.776V34.44l11.762-14.93c0.521-0.665,1.345-1.065,2.203-1.065h7.537c1.039,0,1.987,0.567,2.475,1.48
              c0.521,0.969,0.41,2.156-0.282,3.022L20.131,43.82l18.083,19.816c0.768,0.844,0.942,2.047,0.448,3.069
              C38.188,67.665,37.2,68.277,36.141,68.277z M29.032,65.277h6.616L17.051,44.895c-0.498-0.545-0.524-1.371-0.063-1.946
              l17.19-21.503h-6.997L12.802,39.696c-0.395,0.501-1.065,0.696-1.669,0.487s-1.009-0.777-1.009-1.416V2.999H4.456v62.277h5.668
              V49.87c0-0.817,0.657-1.485,1.475-1.5l0.53-0.009c0.42,0.002,0.818,0.16,1.107,0.461L29.032,65.277z"/>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default KroneIcon;
