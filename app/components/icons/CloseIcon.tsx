import { Icon, IconProps } from "@chakra-ui/react";

export default function CloseIcon(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5.6 20L4 18.4L10.4 12L4 5.6L5.6 4L12 10.4L18.4 4L20 5.6L13.6 12L20 18.4L18.4 20L12 13.6L5.6 20Z"
        fill="currentColor"
      />
    </Icon>
  );
}

CloseIcon.displayName = "CloseIcon";
