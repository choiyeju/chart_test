import React from 'react';
import { ChartOtbBarLine } from "charts";
import {hemoglobinData, labels} from "./data";

const ChartOtb = () => {
    return (
        <>
            <ChartOtbBarLine
                text={{x: "Visit", y: "Hemoglobin (g/dL)"}}
                minMax={[12, 18]}
                gap={2}
                lowHigh={[13, 17.7]}
                labels={labels}
                datas={hemoglobinData}
            />
        </>
    )
}

export default ChartOtb;