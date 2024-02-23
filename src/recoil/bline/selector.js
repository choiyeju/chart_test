import { selectorFamily } from "recoil";
import { blineState } from "./atom";

export const blineSelector = selectorFamily({
    key: "blineSelector",
    get:  (param) => ({ get }) => get(blineState),
    set: () => ({ set, get }, value) => {
        const names = get(blineState);
        set(blineState, names);

    },
});