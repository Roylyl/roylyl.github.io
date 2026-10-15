import React from 'react';
import { deferDialog } from '../../shared/deferDialog';
import { createPortal } from 'react-dom';
import { AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
const LyricMatchModal = deferDialog(() => import('../../modal/LyricMatchModal'));
const NaviLyricMatchModal = deferDialog(() => import('../../modal/NaviLyricMatchModal'));
const OnlineLyricMatchModal = deferDialog(() => import('../../modal/OnlineLyricMatchModal'));
const UnavailableReplacementDialog = deferDialog(() => import('../../modal/UnavailableReplacementDialog'));
const SettingsModal = deferDialog(() => import('../../modal/SettingsModal'));
import ConfirmDialog from '../../shared/ConfirmDialog';
import RmusicShareCopyDialog from '../../shared/RmusicShareCopyDialog';
import type { AppDialogsModel } from './buildAppDialogsModel';
import { countRender } from '../../../dev/renderCount';

// Centralized app-level dialog and toast renderer for the player shell.
type AppDialogsProps = {
    model: AppDialogsModel;
};

const AppDialogs: React.FC<AppDialogsProps> = ({ model }) => {
    countRender('AppDialogs');
    const { statusToast, lyricMatchDialog, naviLyricMatchDialog, onlineLyricMatchDialog, unavailableReplacementDialog, settingsDialog, wallpaperEntryConfirmDialog } = model;

    return (
        <>
            {createPortal(
                <AnimatePresence>
                    {statusToast && (
                        <motion.div
                            key={statusToast.toastKey}
                            initial={{ opacity: 0, y: -20, x: '-50%' }}
                            animate={{ opacity: 1, y: 30, x: '-50%' }}
                            exit={{ opacity: 0, y: -20, x: '-50%' }}
                            data-rmusic-status-toast
                            style={{ top: 'var(--rmusic-safe-top, 0px)', maxWidth: 'calc(100vw - 32px - var(--rmusic-safe-left, 0px) - var(--rmusic-safe-right, 0px))' }}
                            className={`fixed top-0 left-1/2 z-[210] px-6 py-3 backdrop-blur-md rounded-full font-medium text-sm shadow-xl flex items-center gap-3 ${statusToast.onAction || statusToast.onCancel ? 'pointer-events-auto' : 'pointer-events-none'} ${statusToast.isDaylight ? 'bg-white/70 text-zinc-800 border border-black/5' : 'bg-white/10 text-white'}`}
                        >
                            {statusToast.type === 'error'
                                ? <AlertCircle size={18} className={statusToast.isDaylight ? 'text-red-500' : 'text-red-400'} />
                                : statusToast.type === 'success'
                                    ? <CheckCircle2 size={18} className={statusToast.isDaylight ? 'text-green-600' : 'text-green-400'} />
                                    : <Sparkles size={18} className={statusToast.isDaylight ? 'text-blue-600' : 'text-blue-400'} />}
                            <span className="min-w-0 break-words">{statusToast.text}</span>
                            {statusToast.onCancel && statusToast.cancelLabel && (
                                <button
                                    type="button"
                                    onClick={statusToast.onCancel}
                                    className={`px-2.5 py-1 rounded-full text-xs transition-colors ${statusToast.isDaylight ? 'text-zinc-500 hover:bg-black/5 hover:text-zinc-800' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                                >
                                    {statusToast.cancelLabel}
                                </button>
                            )}
                            {statusToast.onAction && statusToast.actionLabel && (
                                <button
                                    type="button"
                                    onClick={statusToast.onAction}
                                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${statusToast.isDaylight ? 'bg-zinc-900 text-white hover:bg-zinc-700' : 'bg-white text-zinc-950 hover:bg-white/85'}`}
                                >
                                    {statusToast.actionIcon && <statusToast.actionIcon size={14} className={statusToast.isDaylight ? 'text-amber-300' : 'text-amber-500'} />}
                                    {statusToast.actionLabel}
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body,
            )}

            <RmusicShareCopyDialog />
            {lyricMatchDialog && <LyricMatchModal {...lyricMatchDialog} />}
            {naviLyricMatchDialog && <NaviLyricMatchModal {...naviLyricMatchDialog} />}
            {onlineLyricMatchDialog && <OnlineLyricMatchModal {...onlineLyricMatchDialog} />}
            {unavailableReplacementDialog && <UnavailableReplacementDialog {...unavailableReplacementDialog} />}
            {wallpaperEntryConfirmDialog && <ConfirmDialog {...wallpaperEntryConfirmDialog} />}
            <AnimatePresence>
                {settingsDialog && <SettingsModal {...settingsDialog} />}
            </AnimatePresence>
        </>
    );
};

export default React.memo(AppDialogs);
