import React, {useEffect, useState} from "react";
import { useRecoilState } from "recoil";
import { chartOptionsState, chartTypeState } from "stores";

export const SettingLayout = ({children}) => {
    const [settingType, setSettingType] = useState('axes');
    const [chartType, setChartType] = useRecoilState(chartTypeState);

    const [chartOptions, setChartOptions] = useRecoilState(chartOptionsState);

    const handleSelectType = (e) => {
        setSettingType(e.target.value);
    }

    const handleChangeText = (e, axis) => {
        const text = JSON.parse(JSON.stringify(chartOptions.text));
        text[axis] = e.target.value;
        setChartOptions({ ...chartOptions, text });
    };

    if (!chartOptions) return <>로딩중</>;

    return (
        <div className="setting">
            <div className="setting_sidebar">
                <select onChange={e => handleSelectType(e)}>
                    <option value="axes">axes</option>
                    <option value="color">color</option>
                    <option value="datalabels">datalabels</option>
                    <option value="tooltip">tooltip</option>
                </select><br/>
                {settingType === 'axes' ?
                    <>
                        x: <input value={chartOptions.text.x} onChange={e => handleChangeText(e, "x")}/><br/>
                        y: <input value={chartOptions.text.y} onChange={e => handleChangeText(e, "y")}/><br/>
                    </> :
                    settingType === 'color' ?
                        <>
                            color
                        </> :
                        settingType === "datalabels" ?
                            <>
                                datalabels
                            </> :
                            <>
                                tooltip
                            </>
                }
            </div>
            {children}
        </div>
    )
}