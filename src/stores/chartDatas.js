import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const chartDatasState = atom({
    key: 'chartDatasState',
    default: null,
    effects_UNSTABLE: [persistAtom],
});