import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const blineValuesState = atom({
    key: 'blineValuesState',
    default: null,
    effects_UNSTABLE: [persistAtom],
});