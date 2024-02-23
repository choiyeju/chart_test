import React, {useEffect, useState} from 'react';
import { useRecoilState } from "recoil";
import {chartDatasState, chartOptionsState, chartTypeState} from "stores";

import { SettingLayout } from "layouts";
import { Charts } from "components";
import { averageDatas, bodyWeightDatas, bodyWeightLabels } from "./data";
import {initOptions} from "components/Charts/BLine/data";

const ChartCustom = () => {
    // 이곳은 chart 타입 결정하는 곳
    // 이곳은 api로 데이터 받아오고 수정하는 곳
    
    const [isSetting, setIsSetting] = useState(false);
    const [, setChartType] = useRecoilState(chartTypeState);
    const [chartDatas, setChartDatas] = useRecoilState(chartDatasState);
    const [chartOptions, setChartOptions] = useRecoilState(chartOptionsState);

    const handleClickButton = (type, labels, datas, options) => {
        setIsSetting(!isSetting);
        setChartType(type);
        setChartDatas({
            labels,
            datas
        });
        setChartOptions(options);
    };

    useEffect(() => {
        if (!chartOptions) setChartOptions(initOptions);
    }, [chartOptions]);

    if (!chartOptions) <>로딩중...</>

    return (
        <>
            <a href="http://localhost:3001/chart-setting" target="_blank">
                <button onClick={() => handleClickButton("bline", bodyWeightLabels, [bodyWeightDatas, averageDatas], chartOptions)}>SETTING</button>
            </a>
            <Charts
                type="bline"
                labels={bodyWeightLabels}
                datas={[bodyWeightDatas, averageDatas]}
                {...chartOptions}
            />
        </>
    )
}

export default ChartCustom;