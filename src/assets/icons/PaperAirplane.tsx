const PaperAirplane = ({
  color,
  stroke,
  className,
}: {
  color?: string;
  stroke?: string;
  className?: string;
}) => {
  return (
    <svg
      width="27"
      height="27"
      fill="none"
      viewBox="0 0 27 27"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="heroicons-outline/paper-airplane">
        <path
          id="Vector"
          d="M6.99976 13.5L4.04126 3.88489C11.2077 5.96668 17.8633 9.24901 23.776 13.4997C17.8633 17.7505 11.2077 21.0329 4.04136 23.1148L6.99976 13.5ZM6.99976 13.5L15.1251 13.5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={stroke || "#F9FAFB"}
        />
      </g>
    </svg>
  );
};

export default PaperAirplane;
