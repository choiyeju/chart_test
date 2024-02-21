import React from 'react';
import { ChartOtbBarLine } from "charts";
import {hemoglobinData, labels, neutrophilsData} from "./data";

const ChartOtb = () => {
    return (
        <>
            chart border 색상 변경
            <ChartOtbBarLine
                text={{x: "Visit", y: "Neutrophils (10/uL)"}}
                min={0} max={12} gap={2}
                low={2} high={7}
                labels={labels}
                datas={neutrophilsData}
            />
            <ChartOtbBarLine
                text={{x: "Visit", y: "Hemoglobin (g/dL)"}}
                min={12} max={18} gap={2}
                low={13} high={17.7}
                labels={labels}
                datas={hemoglobinData}
            />
        </>
    )
}

export default ChartOtb;