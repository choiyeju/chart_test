import React from 'react';
import { BLine } from "./BLine";

export const Charts = ({type}) => {
    if (type === "bline") {
        return <BLine />
    } else if (type === "line") {
        return "line";
    } else return null;
};