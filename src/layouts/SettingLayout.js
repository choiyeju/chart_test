import React, {useEffect, useState} from "react";
import { useRecoilState } from "recoil";
import {chartDatasState, chartOptionsState, chartTypeState} from "stores";

export const SettingLayout = ({children}) => {
    const [settingType, setSettingType] = useState('axes');
    const [chartType, setChartType] = useRecoilState(chartTypeState);

    const [chartDatas, setChartDatas] = useRecoilState(chartDatasState);
    const [chartOptions, setChartOptions] = useRecoilState(chartOptionsState);

    const handleChangeText = (e, axis) => {
        const text = JSON.parse(JSON.stringify(chartOptions.text));
        text[axis] = e.target.value;
        setChartOptions({ ...chartOptions, text });
    };

    const handleClickButton = () => {
        let datas = JSON.parse(JSON.stringify(chartDatas)).datas;
        datas[0].pop();
        datas[0].push(17.0);
        console.log(datas);
        setChartDatas({ ...chartDatas, datas });
    };

    if (!chartOptions) return <>로딩중</>;

    return (
        <div className="setting">
            <div className="setting_sidebar">
                {settingType === 'axes'?
                    <>
                        x: <input value={chartOptions.text.x} onChange={e => handleChangeText(e, "x")} /><br/>
                        y: <input value={chartOptions.text.y} onChange={e => handleChangeText(e, "y")} /><br/>
                        <button onClick={handleClickButton}>BUTTON</button>
                    </> :
                    settingType === 'color'?
                    <>
                        color
                    </>:
                settingType === "datalabels"?
                    <>
                        datalabels
                    </>:
                    <>
                        tooltip
                    </>
                }
            </div>
            {children}
        </div>
    )
}