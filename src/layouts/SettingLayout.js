import React, { useState } from "react";
import { SketchPicker } from 'react-color';
import { useRecoilState } from "recoil";
import { chartOptionsState, chartTypeState } from "stores";

export const SettingLayout = ({children}) => {
    const [settingType, setSettingType] = useState('axes');
    const [chartType, setChartType] = useRecoilState(chartTypeState);

    const [chartOptions, setChartOptions] = useRecoilState(chartOptionsState);

    const [isShow, setIsShow] = useState(false);
    const [elNum, setElNum] = useState(0);
    const [optionColor, setOptionColor] = useState({ top: 60, option: "borderColor"});
    const selectColors = [{ top: 60, option: "borderColor"}, { top: 120, option: "pointBackgroundColor"}];

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

    const handleChangeText = (e, axis) => {
        const text = JSON.parse(JSON.stringify(chartOptions.text));
        text[axis] = e.target.value;
        setChartOptions({ ...chartOptions, text });
    };

    const handleChangeSketchPicker = (selectedColor, event) => {
        event.stopPropagation();
        event.preventDefault();

        const elements = JSON.parse(JSON.stringify(chartOptions)).elements;
        elements[0][optionColor.option] = changeRGB2Color(selectedColor.rgb);
        setChartOptions({ ...chartOptions, elements, });
    };

    const handleChangeComplete = (color) => {
        const elements = JSON.parse(JSON.stringify(chartOptions)).elements;
        elements[0][optionColor.option] = changeRGB2Color(color.rgb);
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
                        <div className="color_box">
                            {selectColors.map(({top, option}, idx) => {
                                return (
                                    <div key={idx}>
                                        {option}
                                        <button
                                            className="color_line"
                                            style={{backgroundColor: chartOptions.elements[0][option]}}
                                            onClick={() => {
                                                setOptionColor({ top, option });
                                                setIsShow(!isShow);
                                            }}
                                        >
                                            {chartOptions.elements[0][option]}
                                        </button>
                                    </div>
                                );
                            })}
                            {isShow &&
                                <div className="color_palette" style={{top: optionColor.top}}>
                                    <div className="color_palette_background" onClick={() => setIsShow(false)}/>
                                    <SketchPicker
                                        color={changeColor2RGB(chartOptions.elements[elNum][optionColor.option])}
                                        onChange={handleChangeSketchPicker}
                                        onChangeComplete={handleChangeComplete}
                                    />
                                </div>
                            }
                        </div> :
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