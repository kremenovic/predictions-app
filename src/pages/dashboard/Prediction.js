import React from "react";
import { useParams, Link } from "react-router-dom";
const Prediction = () => {
  const { id } = useParams();
  return <div>predictions for {id}</div>;
};

export default Prediction;
