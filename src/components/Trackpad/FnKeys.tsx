import React from "react";

interface FnKeysProps {
    sendKey: (key: string) => void;
}

const FN_KEYS: { label: string; key: string }[] = [
    { label: "F1", key: "f1" },
    { label: "F2", key: "f2" },
    { label: "F3", key: "f3" },
    { label: "F4", key: "f4" },
    { label: "F5", key: "f5" },
    { label: "F6", key: "f6" },
    { label: "F7", key: "f7" },
    { label: "F8", key: "f8" },
    { label: "F9", key: "f9" },
    { label: "F10", key: "f10" },
    { label: "F11", key: "f11" },
    { label: "F12", key: "f12" },
];

export const FnKeys: React.FC<FnKeysProps> = ({ sendKey }) => {
    const handleInteract = (e: React.PointerEvent, key: string) => {
        e.preventDefault();
        sendKey(key);
    };

    return (
        <div className="grid grid-cols-6 grid-rows-2 gap-1 p-2">
            {FN_KEYS.map(({ label, key }) => (
                <button
                    key={key}
                    type="button"
                    className="btn btn-sm btn-info min-w-0"
                    onPointerDown={(e) => handleInteract(e, key)}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};
