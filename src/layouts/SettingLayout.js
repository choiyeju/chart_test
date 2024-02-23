import React, {useEffect, useState} from "react";
import { useRecoilState } from "recoil";
import { chartOptionsState, chartTypeState } from "stores";

export const SettingLayout = ({children}) => {
    const [settingType, setSettingType] = useState('axes');
    const [chartType, setChartType] = useRecoilState(chartTypeState);

    const [chartOptions, setChartOptions] = useRecoilState(chartOptionsState);

    const handleChangeText = (e, axis) => {
        const text = JSON.parse(JSON.stringify(chartOptions.text));
        text[axis] = e.target.value;
        setChartOptions({ ...chartOptions, text });
    };

    // useEffect(() => {
    //     if (chartType === 'bline') {
    //         if (values) setBLineValues(values);
    //         else setValues(blineValues);
    //         // console.log(values);
    //     } else if (!values && chartType === 'line') {
    //
    //     } else if (!values && chartType === 'bar') {
    //
    //     }
    // }, [values]);

    if (!chartOptions) return <>로딩중</>;

    return (
        <div className="setting">
            <div className="setting_sidebar">
                {settingType === 'axes'?
                    <>
                        x: <input value={chartOptions.text.x} onChange={e => handleChangeText(e, "x")} /><br/>
                        y: <input value={chartOptions.text.y} onChange={e => handleChangeText(e, "y")} /><br/>
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