import React, { useState } from 'react';
import { SettingLayout } from "layouts";
import { Charts } from "components";
import { averageDatas, bodyWeightDatas, bodyWeightLabels } from "./data";

const ChartCustom = () => {
    // 이곳은 chart 타입 결정하는 곳
    // 이곳은 api로 데이터 받아오고 수정하는 곳
    
    const [isSetting, setIsSetting] = useState(false);
    const [chartType, setChartType] = useState("bline");
    const [chartLabels, setChartLabels] = useState();
    const [chartDatas, setChartDatas] = useState();

    const handleClickButton = (type, labels, datas) => {
        setIsSetting(!isSetting);
        setChartType(type);
        setChartLabels(labels);
        setChartDatas(datas);
    };

    return (
        <>
            <button onClick={() => handleClickButton("bline", bodyWeightLabels, [bodyWeightDatas, averageDatas])}>SETTING</button>
            <Charts
                type="bline"
                labels={bodyWeightLabels}
                datas={[bodyWeightDatas, averageDatas]}
            />

            <button onClick={() => handleClickButton("line")}>SETTING</button>
            <Charts type="line" />

            {isSetting &&
                <SettingLayout>
                    <Charts
                        type={chartType}
                        labels={chartLabels}
                        datas={chartDatas}
                    />
                </SettingLayout>
            }
        </>
    )
}

export default ChartCustom;