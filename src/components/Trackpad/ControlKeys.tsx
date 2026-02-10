import React from "react";

interface ControlKeysProps {
	scrollMode: boolean;
	showKeyboard: boolean;
	onToggleScroll: () => void;
	onLeftClick: () => void;
	onRightClick: () => void;
	onToggleKeyboard: () => void;
}

export const ControlKeys: React.FC<ControlKeysProps> = ({
	scrollMode,
	showKeyboard,
	onToggleScroll,
	onLeftClick,
	onRightClick,
	onToggleKeyboard,
}) => {
	const handleInteraction = (e: React.PointerEvent, action: () => void) => {
		e.preventDefault();
		action();
	};

	return (
		<div className="bg-base-200 p-2 grid grid-cols-4 gap-2 shrink-0">
			<button
				className={`btn btn-sm ${scrollMode ? "btn-primary" : "btn-outline"}`}
				onPointerDown={(e) => handleInteraction(e, onToggleScroll)}
			>
				{scrollMode ? "Scroll" : "Cursor"}
			</button>
			<button
				className="btn btn-sm btn-outline"
				onPointerDown={(e) => handleInteraction(e, onLeftClick)}
			>
				L-Click
			</button>
			<button
				className="btn btn-sm btn-outline"
				onPointerDown={(e) => handleInteraction(e, onRightClick)}
			>
				R-Click
			</button>
			<button
				className={`btn btn-sm ${showKeyboard ? "btn-secondary" : "btn-accent"}`}
				onPointerDown={(e) => handleInteraction(e, onToggleKeyboard)}
			>
				Keyboard
			</button>
		</div>
	);
};
