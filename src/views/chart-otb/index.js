import React from 'react';
import {ColorBLine, LowHighBLine, SideBLine} from "charts";
import {averageData, bodyWeightData, colorLabels, doesData, labels, neutrophilsData, sideLabels} from "./data";

const ChartOtb = () => {
    return (
        <>
            <SideBLine
                text={{x: "Visit", y: "Body Weight (g)"}}
                min={0} max={20} gap={2}
                labels={sideLabels}
                datas={bodyWeightData}
                sideDatas={averageData}
            />
            <ColorBLine
                text={{x: "Visit", y: "Does (mg)"}}
                min={0} max={150} gap={25}
                labels={colorLabels}
                datas={doesData}
            />
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