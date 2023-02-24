import IconType from './type';

const SVG = ({ style = {}, fill = '', width = '13', height = '12', className = '', viewBox = '0 0 100 125' }: IconType) => (
  <svg
    width={width}
    style={style}
    height={height}
    viewBox={viewBox}
    xmlns='http://www.w3.org/2000/svg'
    className={`svg-icon ${className || ''}`}
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <g>
      <g>
        <path
          fill={fill}
          d='M95.7,45.7L75.6,25.6c-2.4-2.4-6.2-2.4-8.6,0c-2.4,2.4-2.4,6.2,0,8.6l9.7,9.7H33.9c-3.4,0-6.1,2.7-6.1,6.1     c0,3.4,2.7,6.1,6.1,6.1h42.8L67,65.8c-2.4,2.4-2.4,6.2,0,8.6c1.2,1.2,2.7,1.8,4.3,1.8s3.1-0.6,4.3-1.8l20.1-20.1     C98.1,51.9,98.1,48.1,95.7,45.7z'
        />
        <path
          fill={fill}
          d='M31.1,80.2H14.7V19.8h16.5c3.4,0,6.1-2.7,6.1-6.1c0-3.4-2.7-6.1-6.1-6.1H8.6c-3.4,0-6.1,2.7-6.1,6.1v72.5     c0,3.4,2.7,6.1,6.1,6.1h22.6c3.4,0,6.1-2.7,6.1-6.1C37.2,82.9,34.5,80.2,31.1,80.2z'
        />
      </g>
    </g>
  </svg>
);

export default SVG;
