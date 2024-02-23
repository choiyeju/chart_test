import React from 'react';
import { useRecoilState } from "recoil";

import { BLine } from "./BLine";
import { chartOptionsState } from "stores";

export const Charts = (props) => {
    const { type, values } = props;
    const [chartOptions] = useRecoilState(chartOptionsState);

    if (!chartOptions) return <>데이터 가져오는 중...</>

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