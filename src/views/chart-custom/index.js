import React, { useState } from 'react';
import { SettingLayout } from "layouts";
import { Charts } from "components";

const ChartCustom = () => {
    const [isSetting, setIsSetting] = useState(false);
    const [chartType, setChartType] = useState("bline");

    const handleClickButton = (type) => {
        setIsSetting(!isSetting);
        setChartType(type);
    };

    return (
        <>
            <button onClick={() => handleClickButton("bline")}>SETTING</button>
            <Charts type="bline"/>

            <button onClick={() => handleClickButton("line")}>SETTING</button>
            <Charts type="line"/>

            {isSetting &&
                <SettingLayout>
                    <Charts type={chartType}/>
                </SettingLayout>
            }
        </>
    )
}

export default ChartCustom;