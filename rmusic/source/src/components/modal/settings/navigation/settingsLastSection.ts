import type { SettingsSubviewId } from '../../../../stores/useSettingsModalStore';
import { SETTINGS_NAV_GROUP_SPECS, type SettingsSectionId } from './settingsNavModel';

export const sectionForSettingsSubview = (subview: SettingsSubviewId | null | undefined): SettingsSectionId | null => {
    if (subview === 'globalLyricOffset' || subview === 'lyricFilter') return 'playback';
    return SETTINGS_NAV_GROUP_SPECS.some(group => group.sections.some(section => section.id === subview))
        ? subview as SettingsSectionId : null;
};
