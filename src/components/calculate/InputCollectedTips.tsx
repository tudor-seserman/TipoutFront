import { useEffect, useState } from "react";
import api from "../../API/axiosConfig";
import SchemaSelector from "./SchemaSelector";
import { Schemas } from "../utils/Schemas";
import SchemaLanding from "./SchemaLanding";
import EvenTippool from "./schemas/EvenTippool";
import WeightedTippoolByRole from "./schemas/WeightedTippoolByRole";
import TipoutMetadata from "./TipoutMetadata";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEmployerInfo } from "../../hooks/useEmployerInfo";
import { Employee } from "../utils/types/Employee";


const InputCollectedTips = () => {
  const { user, logout } = useAuth();
  const [schema, setSchema] = useState("");
  const [moneyHandlers, setMoneyHandlers] = useState<Employee[]>([]);
  const [nonMoneyHandlers, setNonMoneyHandlers] = useState<Employee[]>([]);
  const [calculateTips, setCalculateTips] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState("")
  const [metadata, setMetadata] = useState({});
  const navigate = useNavigate();
  const {
    refresh
  } = useEmployerInfo();
  const noEmployeesCreated = moneyHandlers.length === 0

  function handleSchemaSelection(value) {
    setSubmitting(true);
    setSchema(value);
    setApiEndpoint(Schemas[value])
    setSubmitting(false);
  }

  useEffect(() => {
    try {
      api
        .get("/calculate/EmployeeTipMap", {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        })
        .then((res) => {
          setMoneyHandlers(res.data.moneyHandlers);
          setNonMoneyHandlers(res.data.nonMoneyHandlers);
        });
    } catch (error) { }
  }, [user, calculateTips, refresh]);

  const tipsCollected = {
    ...metadata,
    moneyHandlers: moneyHandlers,
    nonMoneyHandlers: nonMoneyHandlers,
  }

  const calculateAPICall = async (e: any) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `/calculate/${apiEndpoint}`,
        tipsCollected,
        {
          headers: {
            Authorization: "Bearer " + user.accessToken,
          },
        }
      );
      setCalculateTips(!calculateTips)
      navigate("/calculate/report", { state: response.data });
    } catch (error: any) {
      console.log(error.response.request.status)
      if (error.response.request.status == 401) {
        alert("Your session has expired. Please log in again.");
        logout();
      }
      else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert("No tips were declared.");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        // and an instance of http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    }
  };



  return (
    <>
      <SchemaSelector
        disabled={noEmployeesCreated}
        handleChange={(value) => handleSchemaSelection(value.value)}
        options={Object.keys(Schemas).map((t: string) => ({
          value: t,
          label: t,
        }))}
      />

      {noEmployeesCreated && <h1>Please add employees that can collect tips in order to get started.</h1>}


      {!noEmployeesCreated && schema === "" && <SchemaLanding />}
      {schema != "" && <TipoutMetadata handleTipoutMetadata={setMetadata} />}
      {schema === "Weighted Tippool By Role" && <WeightedTippoolByRole handleSubmit={calculateAPICall} moneyHandlers={moneyHandlers} setMoneyHandlers={setMoneyHandlers} nonMoneyHandlers={nonMoneyHandlers} setNonMoneyHandlers={setNonMoneyHandlers} />}
      {schema === "Even Tippool" && <EvenTippool handleSubmit={calculateAPICall} moneyHandlers={moneyHandlers} setMoneyHandlers={setMoneyHandlers} nonMoneyHandlers={nonMoneyHandlers} setNonMoneyHandlers={setNonMoneyHandlers} />}
    </>
  );
};

export default InputCollectedTips;
