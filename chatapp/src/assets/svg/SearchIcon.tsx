import { IconProps } from "../../types/icons";

const SearchIcon = ({ color, className }: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="11" cy="11" r="7" stroke={color} stroke-width="2" />
      <path
        d="M20 20L17 17"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default SearchIcon;
