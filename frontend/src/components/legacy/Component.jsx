
import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";

export const Component = ({ property1, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`component ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      <div className={`textWrapper property_1 ${state.property1}`}>
        Usuário
      </div>

      {["variant2", "variant3"].includes(state.property1) && (
        <div className={`div property_1_0 ${state.property1}`}>|</div>
      )}
    </div>
  );
};

function reducer(state, action) {
  if (state.property1 === "default") {
    switch (action) {
      case "click":
        return {
          property1: "variant2",
        };
    }
  }

  if (state.property1 === "variant2") {
    switch (action) {
      case "click":
        return {
          property1: "default",
        };
    }
  }

  if (state.property1 === "variant3") {
    switch (action) {
      case "click":
        return {
          property1: "default",
        };
    }
  }

  return state;
}

Component.propTypes = {
  property1: PropTypes.oneOf(["variant2", "variant3", "default"]),
};
