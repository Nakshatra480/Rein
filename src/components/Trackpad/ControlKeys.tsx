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
		<div className="bg-base-200 p-1 grid grid-cols-4 gap-1 shrink-0 overflow-hidden">
			<button
				type="button"
				className={`btn btn-sm min-w-0 ${scrollMode ? "btn-primary" : "btn-outline"}`}
				onPointerDown={(e) => handleInteraction(e, onToggleScroll)}
			>
				{scrollMode ? "Scroll" : "Cursor"}
			</button>
			<button
				type="button"
				className="btn btn-sm min-w-0 btn-outline"
				onPointerDown={(e) => handleInteraction(e, onLeftClick)}
			>
				L-Click
			</button>
			<button
				type="button"
				className="btn btn-sm min-w-0 btn-outline"
				onPointerDown={(e) => handleInteraction(e, onRightClick)}
			>
				R-Click
			</button>
			<button
				type="button"
				className={`btn btn-sm min-w-0 ${showKeyboard ? "btn-secondary" : "btn-accent"}`}
				onPointerDown={(e) => handleInteraction(e, onToggleKeyboard)}
			>
				Keyboard
			</button>
		</div>
	);
};
