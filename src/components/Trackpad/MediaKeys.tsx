import React, { useState } from "react";

interface MediaKeysProps {
    sendKey: (key: string) => void;
}

const UTILITY_KEYS: { label: string; key: string }[] = [
    { label: "Esc", key: "esc" },
    { label: "Tab", key: "tab" },
    { label: "Ctrl", key: "ctrl" },
    { label: "Alt", key: "alt" },
    { label: "Shift", key: "shift" },
    { label: "Meta", key: "meta" },
    { label: "Home", key: "home" },
    { label: "End", key: "end" },
    { label: "PgUp", key: "pgup" },
    { label: "PgDn", key: "pgdn" },
    { label: "Ins", key: "insert" },
    { label: "Del", key: "del" },
];

const MEDIA_KEYS: { label: string; key: string }[] = [
    { label: "Mute", key: "audiomute" },
    { label: "Vol−", key: "audiovoldown" },
    { label: "Vol+", key: "audiovolup" },
    { label: "Prev", key: "audioprev" },
    { label: "Next", key: "audionext" },
];

export const MediaKeys: React.FC<MediaKeysProps> = ({ sendKey }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleInteract = (e: React.PointerEvent, key: string) => {
        e.preventDefault();
        sendKey(key);
    };

    const handlePlayPause = (e: React.PointerEvent) => {
        e.preventDefault();
        sendKey(isPlaying ? "audiopause" : "audioplay");
        setIsPlaying((prev) => !prev);
    };

    return (
        <div className="grid grid-cols-6 gap-1 p-2">
            {UTILITY_KEYS.map(({ label, key }) => (
                <button
                    key={key}
                    type="button"
                    className="btn btn-sm btn-neutral min-w-0"
                    onPointerDown={(e) => handleInteract(e, key)}
                >
                    {label}
                </button>
            ))}
            {MEDIA_KEYS.map(({ label, key }) => (
                <button
                    key={key}
                    type="button"
                    className="btn btn-sm btn-warning min-w-0"
                    onPointerDown={(e) => handleInteract(e, key)}
                >
                    {label}
                </button>
            ))}
            <button
                type="button"
                className="btn btn-sm btn-warning min-w-0"
                onPointerDown={handlePlayPause}
                title={isPlaying ? "Pause" : "Play"}
            >
                {isPlaying ? "Pause" : "Play"}
            </button>
        </div>
    );
};
