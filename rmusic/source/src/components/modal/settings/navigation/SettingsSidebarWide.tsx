import React from "react";
import type { SettingsNavGroup } from "./settingsNavModel";
import type { SettingsSectionId } from "./settingsNavModel";

import { flattenSettingsNavItems } from "./settingsNavModel";

type SettingsSidebarWideProps = {
    groups: SettingsNavGroup[];
    activeSectionId: SettingsSectionId;
    onSelectSection: (sectionId: SettingsSectionId) => void;
    isDaylight: boolean;
};

export const SettingsSidebarWide: React.FC<SettingsSidebarWideProps> = ({ groups, activeSectionId, onSelectSection, isDaylight }) => (
    <nav aria-label="设置" className="w-1/3 max-w-[264px] shrink-0 overflow-y-auto custom-scrollbar pr-3 flex flex-col gap-2 border-r border-white/10 pb-4">
        {flattenSettingsNavItems(groups).map(section => {
            const Icon = section.icon;
            const active = activeSectionId === section.id;
            return (
                <button
                    key={section.id}
                    type="button"
                    aria-current={active ? 'page' : undefined}
                    onClick={() => onSelectSection(section.id)}
                    className={`flex items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors ${active ? (isDaylight ? 'border-zinc-300/70 bg-white/80' : 'border-white/20 bg-white/10') : (isDaylight ? 'border-transparent hover:bg-white/50' : 'border-transparent hover:bg-white/5')}`}
                    style={{ color: 'var(--text-primary)' }}
                >
                    <Icon size={20} className="shrink-0 opacity-70" />
                    <span className="text-sm font-medium">{section.label}</span>
                </button>
            );
        })}
    </nav>
);

export default SettingsSidebarWide;
