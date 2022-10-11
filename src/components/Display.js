import React from "react";

export const Display = ({ strToDisplay }) => {
  return <div className="display prank">{strToDisplay || "0.00"}</div>;
};
