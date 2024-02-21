import React from 'react';
import { LowHighBLine } from "charts";
import { labels, neutrophilsData } from "./data";

const ChartOtb = () => {
    return (
        <>
            chart border 색상 변경
            <LowHighBLine
                text={{x: "Visit", y: "Neutrophils (10/uL)"}}
                min={0} max={12} gap={2}
                low={2} high={7}
                labels={labels}
                datas={neutrophilsData}
            />
        </>
    )
}

export default ChartOtb;