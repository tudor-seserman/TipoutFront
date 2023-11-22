import React, { useEffect, useState } from "react";
import WeightedTippoolByRole from "./schemas/WeightedTippoolByRole";
import SchemaSelector from "./SchemaSelector";
import { Schemas } from "../utils/Schemas";

const InputCollectedTips = () => {
  const [schema, setSchema] = useState(<WeightedTippoolByRole />);
  const [submitting, setSubmitting] = useState(false);

  function handleSchemaSelection(value) {
    setSubmitting(true);
    console.log(value);
    setSchema(Schemas[value]);
    setSubmitting(false);
  }

  // useEffect(() => {}, [schema]);

  return (
    <>
      <SchemaSelector
        isDisabled={submitting}
        handleChange={(value) => handleSchemaSelection(value.value)}
        options={Object.keys(Schemas).map((t: string) => ({
          value: t,
          label: t,
        }))}
      />
      {schema}
    </>
  );
};

export default InputCollectedTips;
