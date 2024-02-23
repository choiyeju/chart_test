import React from 'react';

import { SettingLayout } from "layouts";
import { Charts } from "components";

import { useRecoilState } from "recoil";
import { chartDatasState, chartTypeState } from "stores";

const ChartSetting = () => {
    const [chartType] = useRecoilState(chartTypeState);
    const [chartDatas] = useRecoilState(chartDatasState);

    console.log(chartDatas);

    return (
        <SettingLayout>
            <Charts
                type={chartType}
                labels={chartDatas.labels}
                datas={chartDatas.datas}
            />
        </SettingLayout>
    )
}

export default ChartSetting;