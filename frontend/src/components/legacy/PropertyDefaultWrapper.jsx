

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import { VisibilityLock2 } from "../../icons/VisibilityLock2";
import { VisibilityLock3 } from "../../icons/VisibilityLock3";
import styles from "./PropertyDefaultWrapper.module.css";

export const PropertyDefaultWrapper = ({ property1, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`property_default_wrapper ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      <div className={`text_wrapper_2 property_1_1_${state.property1}`}>
        Senha
      </div>

      {["variant_2", "variant_3"].includes(state.property1) && (
        <div className={`text_wrapper_3 property_1_2_${state.property1}`}>
          |
        </div>
      )}

      {state.property1 === "variant_2" && (
        <VisibilityLock2 className={styles["visibility_lock"]} />
      )}

      {state.property1 === "variant_3" && (
        <VisibilityLock3 className={styles["visibility_lock_3"]} />
      )}
    </div>
  );
};

function reducer(state, action) {
  if (state.property1 === "default") {
    switch (action) {
      case "click":
        return {
          property1: "variant_2",
        };
    }
  }

  if (state.property1 === "variant_2") {
    switch (action) {
      case "click":
        return {
          property1: "default",
        };
    }
  }

  if (state.property1 === "variant_3") {
    switch (action) {
      case "click":
        return {
          property1: "default",
        };
    }
  }

  return state;
}

PropertyDefaultWrapper.propTypes = {
  property1: PropTypes.oneOf(["variant_2", "variant_3", "default"]),
};
