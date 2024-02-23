import React from 'react';

import { SettingLayout } from "layouts";
import { Charts } from "components";

import { useRecoilState } from "recoil";
import {chartDatasState, chartOptionsState, chartTypeState} from "stores";

const ChartSetting = () => {
    const [chartType] = useRecoilState(chartTypeState);
    const [chartDatas] = useRecoilState(chartDatasState);
    const [chartOptions] = useRecoilState(chartOptionsState);

    return (
        <SettingLayout>
            <Charts
                type={chartType}
                labels={chartDatas.labels}
                datas={chartDatas.datas}
                {...chartOptions}
            />
        </SettingLayout>
    )
}

export default ChartSetting;