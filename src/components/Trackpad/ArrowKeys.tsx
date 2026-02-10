import React from "react";

interface ArrowKeysProps {
    sendKey: (key: string) => void;
}

const ARROWS = {
    top: { label: "↑", key: "arrowup" },
    bottom: [
        { label: "←", key: "arrowleft" },
        { label: "↓", key: "arrowdown" },
        { label: "→", key: "arrowright" },
    ],
};

export const ArrowKeys: React.FC<ArrowKeysProps> = ({ sendKey }) => {
    const handleInteract = (e: React.PointerEvent, key: string) => {
        e.preventDefault();
        sendKey(key);
    };

    return (
        <div className="grid grid-rows-2 gap-1 p-2">
            <div className="flex justify-center">
                <button
                    type="button"
                    className="btn btn-sm btn-neutral min-w-[2.5rem]"
                    onPointerDown={(e) => handleInteract(e, ARROWS.top.key)}
                >
                    {ARROWS.top.label}
                </button>
            </div>
            <div className="grid grid-cols-3 gap-1">
                {ARROWS.bottom.map(({ label, key }) => (
                    <button
                        key={key}
                        type="button"
                        className="btn btn-sm btn-neutral min-w-[2.5rem]"
                        onPointerDown={(e) => handleInteract(e, key)}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
};
