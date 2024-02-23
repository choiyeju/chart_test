import React, {useEffect, useState} from "react";
import { useRecoilState } from "recoil";
import {blineValuesState, chartTypeState} from "stores";

export const SettingLayout = ({children}) => {
    const [settingType, setSettingType] = useState('axes');
    const [chartType, setChartType] = useRecoilState(chartTypeState);

    const [blineValues, setBLineValues] = useRecoilState(blineValuesState);
    const [values, setValues] = useState(null);

    const handleChangeText = (e, axis) => {
        const text = JSON.parse(JSON.stringify(values.text));
        text[axis] = e.target.value;
        setValues({ ...values, text });
    };

    useEffect(() => {
        if (chartType === 'bline') {
            if (values) setBLineValues(values);
            else setValues(blineValues);
            // console.log(values);
        } else if (!values && chartType === 'line') {

        } else if (!values && chartType === 'bar') {

        }
    }, [values]);

    if (!values) return <>로딩중</>;

    return (
        <div className="setting">
            <div className="setting_sidebar">
                {settingType === 'axes'?
                    <>
                        x: <input value={values.text.x} onChange={e => handleChangeText(e, "x")} /><br/>
                        y: <input value={values.text.y} onChange={e => handleChangeText(e, "y")} /><br/>
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