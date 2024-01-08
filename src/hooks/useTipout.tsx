import React, { createContext, useContext, useMemo, useState } from "react";
import { ContextProps } from "../components/utils/types/ContextProps";

const TipoutMetadata = createContext({});

export const TipoutProvider = ({ children }: ContextProps) => {

}

const useTipout = () => {
    return (
        <div>useTipout</div>
    )
}

export default useTipout