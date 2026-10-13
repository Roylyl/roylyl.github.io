import { create } from 'zustand';
import { HEX_CARD_MIN_SCALE_DEFAULT, HEX_CARD_MIN_OPACITY_DEFAULT } from '../utils/hexCardFalloff';

export type GridViewSettingsState = {
    gridViewFullBleedCover: boolean;
    gridViewSquareCards: boolean;
    gridViewMinCardScale: number;
    gridViewMinCardOpacity: number;
};

// Fixed appearance. Previous per-device overrides no longer affect the grid.
export const useGridViewSettingsStore = create<GridViewSettingsState>(() => ({
    gridViewFullBleedCover: true,
    gridViewSquareCards: true,
    gridViewMinCardScale: HEX_CARD_MIN_SCALE_DEFAULT,
    gridViewMinCardOpacity: HEX_CARD_MIN_OPACITY_DEFAULT,
}));

export const selectGridViewCardFalloff = (state: GridViewSettingsState) => ({
    minScale: state.gridViewMinCardScale,
    minOpacity: state.gridViewMinCardOpacity,
});
