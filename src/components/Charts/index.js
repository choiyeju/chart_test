import React, {useEffect} from 'react';
import {useRecoilState} from "recoil";

import { BLine } from "./BLine";
import { initValues } from "./BLine/data";
import { blineState } from "recoil/bline/atom";

export const Charts = (props) => {
    const { type } = props;
    const [blineValues, setBLineValues] = useRecoilState(blineState);

    useEffect(() => {
        // 만약 api에서 가져온 값이 있으면 그 값을 대입힌다
        setBLineValues(initValues);
    }, [blineValues]);

    if (!blineValues) return <>데이터 가져오는 중...</>

    if (type === "bline") {
        return (
            <BLine
                {...blineValues}
                {...props}
            />
        );
    } else if (type === "line") {
        return "line";
    } else {
        return null;
    }
};