/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";

interface Props {
    initialStates: any[];
    finalStates: any[];
    dependents: any[];
}

const useAsyncStates = ({ initialStates, finalStates, dependents }: Props) => {
    const [statesArray, setStatesArray] = useState(initialStates);

    useEffect(() => {
        setStatesArray(finalStates);
    }, [...dependents]);

    return statesArray;
};

export default useAsyncStates;
