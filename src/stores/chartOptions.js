import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const chartOptionsState = atom({
    key: 'chartOptionsState',
    default: null,
    effects_UNSTABLE: [persistAtom],
});