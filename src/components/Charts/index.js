import React from 'react';
import { useRecoilState } from "recoil";

import { BLine } from "./BLine";
import { chartOptionsState } from "stores";

export const Charts = (props) => {
    const { type } = props;

    if (type === "bline") {
        return (
            <BLine
                {...props}
            />
        );
    } else if (type === "line") {
        return "line";
    } else {
        return null;
    }
};