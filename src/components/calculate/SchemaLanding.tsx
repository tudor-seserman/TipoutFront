import React from "react";

const SchemaLanding = () => {
  return (
    <>
      <h2>Please select a schema for calculating tips above.</h2>
      <h3> Additional schemas coming soon.</h3>
      <h4>Including:</h4>
      <ul>
        <li>Tipout as percent of sales.</li>
        <li>
          Tipout by sales type (Bartenders get % of beverage sales but not food
          sales).
        </li>
        <li>Some employees pooling tips but others not.</li>
      </ul>
    </>
  );
};

export default SchemaLanding;
