import React, { useState } from "react";
import { SketchPicker } from 'react-color';
import { useRecoilState } from "recoil";
import { chartOptionsState, chartTypeState } from "stores";

export const SettingLayout = ({children}) => {
    const [settingType, setSettingType] = useState('axes');
    const [chartType, setChartType] = useRecoilState(chartTypeState);

    const [chartOptions, setChartOptions] = useRecoilState(chartOptionsState);

    const changeColor2RGB = (color) => {
        const rgbList = color.match(/\d+/g);
        return {
            r: Number(rgbList[0]),
            g: Number(rgbList[1]),
            b: Number(rgbList[2]),
            a: 1,
        };
    };
    const changeRGB2Color = (rgb) => {
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    };

    const handleSelectType = (e) => {
        setSettingType(e.target.value);
    }

    console.log(chartOptions);
    const handleChangeText = (e, axis) => {
        const text = JSON.parse(JSON.stringify(chartOptions.text));
        text[axis] = e.target.value;
        setChartOptions({ ...chartOptions, text });
    };

    const handleChangeSketchPicker = (selectedColor, event) => {
        event.stopPropagation();
        event.preventDefault();

        const elements = JSON.parse(JSON.stringify(chartOptions)).elements;
        elements[0].borderColor = changeRGB2Color(selectedColor.rgb);
        setChartOptions({ ...chartOptions, elements, });
    };

    const handleChangeComplete = (color) => {
        const elements = JSON.parse(JSON.stringify(chartOptions)).elements;
        elements[0].borderColor = changeRGB2Color(color.rgb);
        setChartOptions({ ...chartOptions, elements, });
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
                            <SketchPicker
                                // color={color}
                                color={changeColor2RGB(chartOptions.elements[0].borderColor)}
                                onChange={handleChangeSketchPicker}
                                onChangeComplete={ handleChangeComplete }
                            />
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