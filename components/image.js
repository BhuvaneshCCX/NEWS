import React from "react";

function Image(props) {
  return (
    <img
      src={props.src}
      alt={props.alt}
      style={{ height: props.height, border: props.border }}
    />
  );
}

export default Image;
