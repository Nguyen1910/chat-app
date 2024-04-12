import { IconProps } from "../../types/icons";

const MoonIcon = ({ color, className }: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.1637 18.5102L16.5996 18.2654L16.1637 18.5102ZM15.5781 19.9582L15.4349 19.4791L15.5781 19.9582ZM15.4389 6.249L15.7865 6.6084L15.4389 6.249ZM16.1637 5.48976L16.5996 5.73464L16.1637 5.48976ZM15.5781 4.04183L15.4349 4.52092L15.5781 4.04183ZM13.5 12C13.5 9.88358 14.376 7.97262 15.7865 6.6084L15.0913 5.8896C13.494 7.43443 12.5 9.60156 12.5 12H13.5ZM15.7865 17.3916C14.376 16.0274 13.5 14.1164 13.5 12H12.5C12.5 14.3984 13.494 16.5656 15.0913 18.1104L15.7865 17.3916ZM15 19.5C10.8579 19.5 7.5 16.1421 7.5 12H6.5C6.5 16.6944 10.3056 20.5 15 20.5V19.5ZM7.5 12C7.5 7.85786 10.8579 4.5 15 4.5V3.5C10.3056 3.5 6.5 7.30558 6.5 12H7.5ZM15.0913 18.1104C15.3115 18.3234 15.4681 18.4749 15.5792 18.5893C15.7006 18.7141 15.7282 18.7558 15.7278 18.7551L16.5996 18.2654C16.5277 18.1372 16.4106 18.0099 16.2963 17.8923C16.1718 17.7642 16.0017 17.5998 15.7865 17.3916L15.0913 18.1104ZM15 20.5C15.264 20.5 15.4952 20.5048 15.7212 20.4373L15.4349 19.4791C15.3808 19.4952 15.32 19.5 15 19.5V20.5ZM15.7278 18.7551C15.8846 19.0344 15.7418 19.3874 15.4349 19.4791L15.7212 20.4373C16.6422 20.1621 17.0704 19.1034 16.5996 18.2654L15.7278 18.7551ZM15.7865 6.6084C16.0017 6.40021 16.1718 6.23583 16.2963 6.10769C16.4106 5.99011 16.5277 5.86275 16.5996 5.73464L15.7278 5.24488C15.7282 5.2442 15.7006 5.28585 15.5792 5.41074C15.4681 5.52507 15.3115 5.67658 15.0913 5.8896L15.7865 6.6084ZM15 4.5C15.32 4.5 15.3808 4.50475 15.4349 4.52092L15.7212 3.56275C15.4952 3.49525 15.264 3.5 15 3.5V4.5ZM16.5996 5.73464C17.0704 4.89659 16.6422 3.83785 15.7212 3.56275L15.4349 4.52092C15.7418 4.61259 15.8846 4.96563 15.7278 5.24488L16.5996 5.73464Z"
        fill={color}
      />
    </svg>
  );
};

export default MoonIcon;
