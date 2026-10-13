import React, { useEffect, useRef } from 'react';
import { Copy, X } from 'lucide-react';
import { copyRmusicSongLink, useRmusicShareCopyStore } from '../../services/rmusicShare';

export default function RmusicShareCopyDialog() {
    const { data, close } = useRmusicShareCopyStore();
    const field = useRef<HTMLTextAreaElement>(null);
    const dialog = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if (data && dialog.current && !dialog.current.open) {
            dialog.current.showModal();
            field.current?.focus();
            field.current?.select();
        } else if (!data) dialog.current?.close();
    }, [data]);
    return <dialog ref={dialog} onCancel={close}
        className="m-auto w-[min(420px,calc(100vw-32px))] rounded-2xl border border-white/15 bg-zinc-900 p-5 text-white shadow-2xl backdrop:bg-black/65"
        aria-labelledby="rmusic-share-copy-title">
        {data && <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h2 id="rmusic-share-copy-title" className="text-lg font-semibold">分享歌曲</h2>
                    <p className="mt-1 text-sm text-white/60 break-words">{data.title}</p>
                </div>
                <button type="button" onClick={close} aria-label="关闭" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-white/10"><X size={18} /></button>
            </div>
            <textarea ref={field} readOnly value={data.url} rows={3} aria-label="歌曲分享链接"
                onFocus={event => event.currentTarget.select()}
                className="w-full resize-none rounded-xl border border-white/15 bg-black/25 p-3 text-sm leading-relaxed select-text focus:outline-none focus:border-white/40" />
            <p className="text-xs text-white/55">可以长按链接或选中文本后手动复制。</p>
            <button type="button" onClick={() => { void copyRmusicSongLink(data).then(copied => { if (copied) close(); }); }}
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-zinc-950 font-medium hover:bg-white/90">
                <Copy size={18} />复制链接
            </button>
        </div>}
    </dialog>;
}
