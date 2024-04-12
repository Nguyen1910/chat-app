import { IconProps } from "../../types/icons";

const ExpandLeft = ({ color, className, onClick }: IconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path d="M15 6L9 12L15 18" stroke={color} stroke-width="2" />
    </svg>
  );
};

export default ExpandLeft;
