import React, { useEffect, useState } from "react";
import SchemaSelector from "./SchemaSelector";
import { Schemas } from "../utils/Schemas";
import SchemaLanding from "./SchemaLanding";

const InputCollectedTips = () => {
  const [schema, setSchema] = useState(<SchemaLanding />);
  const [submitting, setSubmitting] = useState(false);

  function handleSchemaSelection(value) {
    setSubmitting(true);
    setSchema(Schemas[value]);
    setSubmitting(false);
  }

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
