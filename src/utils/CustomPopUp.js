import React from "react";
import { Popup } from "semantic-ui-react";

export default function CustomPopUp({ content, position, children }) {
  return (
    <Popup
      inverted
      size="tiny"
      content={content}
      position={position}
      trigger={children}
    />
  );
}
