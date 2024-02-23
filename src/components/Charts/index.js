import React, {useEffect} from 'react';
import { BLine } from "./BLine";
import { initValues } from "./BLine/data";

export const Charts = (props) => {
    const { type } = props;

    useEffect(() => {
        // elements
        // recoil을 통하여 type에 따른 저장 값을 가져온다
        // 저장된 값이 없으면 initValue를 넣는다
    }, []);

    if (type === "bline") {
        return (
            <BLine
                {...initValues}
                {...props}
            />
        );
    } else if (type === "line") {
        return "line";
    } else {
        return null;
    }
};