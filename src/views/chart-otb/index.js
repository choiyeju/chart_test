import React from 'react';
import { ColorBLine, LowHighBLine } from "charts";
import {colorLabels, doesData, labels, neutrophilsData} from "./data";

const ChartOtb = () => {
    return (
        <>
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