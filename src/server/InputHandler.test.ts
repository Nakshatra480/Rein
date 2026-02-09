import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { InputHandler, InputMessage } from './InputHandler';
import { keyboard, Key } from '@nut-tree-fork/nut-js';

vi.mock('@nut-tree-fork/nut-js', () => {
    return {
        keyboard: {
            pressKey: vi.fn(),
            releaseKey: vi.fn(),
            type: vi.fn(),
        },
        mouse: {
            config: {
                mouseSpeed: 0
            },
            getPosition: vi.fn(),
            setPosition: vi.fn(),
            pressButton: vi.fn(),
            releaseButton: vi.fn(),
            scrollDown: vi.fn(),
            scrollRight: vi.fn(),
        },
        Key: {
            LeftControl: 100,
            Right: 101,
            Left: 102,
            Up: 103,
            Down: 104,
            LeftSuper: 105,
            Tab: 106,
            D: 107,
            LeftAlt: 108,
        },
        Button: {
            LEFT: 0,
            RIGHT: 1,
            MIDDLE: 2
        },
        Point: class {
            constructor(public x: number, public y: number) {}
        }
    };
});

vi.mock('../config', () => ({
    CONFIG: {
        MOUSE_INVERT: false
    }
}));

vi.mock('./KeyMap', () => ({
    KEY_MAP: {}
}));

describe('InputHandler Swipe Gestures', () => {
    let handler: InputHandler;
    const originalPlatform = process.platform;

    beforeEach(() => {
        vi.clearAllMocks();
        handler = new InputHandler();
    });

    afterEach(() => {
        Object.defineProperty(process, 'platform', {
            value: originalPlatform
        });
    });

    it('should handle swipe left (Desktop Right) on macOS', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'darwin'
        });

        const msg: InputMessage = { type: 'swipe', direction: 'left' };
        await handler.handleMessage(msg);

        expect(keyboard.pressKey).toHaveBeenCalledWith(Key.LeftControl, Key.Right);
        expect(keyboard.releaseKey).toHaveBeenCalledWith(Key.LeftControl, Key.Right);
    });

    it('should handle swipe right (Desktop Left) on macOS', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'darwin'
        });

        const msg: InputMessage = { type: 'swipe', direction: 'right' };
        await handler.handleMessage(msg);

        expect(keyboard.pressKey).toHaveBeenCalledWith(Key.LeftControl, Key.Left);
        expect(keyboard.releaseKey).toHaveBeenCalledWith(Key.LeftControl, Key.Left);
    });

    it('should handle swipe up (Mission Control) on macOS', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'darwin'
        });

        const msg: InputMessage = { type: 'swipe', direction: 'up' };
        await handler.handleMessage(msg);

        expect(keyboard.pressKey).toHaveBeenCalledWith(Key.LeftControl, Key.Up);
        expect(keyboard.releaseKey).toHaveBeenCalledWith(Key.LeftControl, Key.Up);
    });

    it('should handle swipe down (App Exposé) on macOS', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'darwin'
        });

        const msg: InputMessage = { type: 'swipe', direction: 'down' };
        await handler.handleMessage(msg);

        expect(keyboard.pressKey).toHaveBeenCalledWith(Key.LeftControl, Key.Down);
        expect(keyboard.releaseKey).toHaveBeenCalledWith(Key.LeftControl, Key.Down);
    });
    
    // Windows tests
    it('should handle swipe left (Desktop Right) on Windows', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'win32'
        });

        const msg: InputMessage = { type: 'swipe', direction: 'left' };
        await handler.handleMessage(msg);

        expect(keyboard.pressKey).toHaveBeenCalledWith(Key.LeftControl, Key.LeftSuper, Key.Right);
        expect(keyboard.releaseKey).toHaveBeenCalledWith(Key.LeftControl, Key.LeftSuper, Key.Right);
    });

     it('should handle swipe right (Desktop Left) on Windows', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'win32'
        });

        const msg: InputMessage = { type: 'swipe', direction: 'right' };
        await handler.handleMessage(msg);

        expect(keyboard.pressKey).toHaveBeenCalledWith(Key.LeftControl, Key.LeftSuper, Key.Left);
        expect(keyboard.releaseKey).toHaveBeenCalledWith(Key.LeftControl, Key.LeftSuper, Key.Left);
    });

    it('should handle swipe up (Task View) on Windows', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'win32'
        });

        const msg: InputMessage = { type: 'swipe', direction: 'up' };
        await handler.handleMessage(msg);

        expect(keyboard.pressKey).toHaveBeenCalledWith(Key.LeftSuper, Key.Tab);
        expect(keyboard.releaseKey).toHaveBeenCalledWith(Key.LeftSuper, Key.Tab);
    });

    it('should handle swipe down (Show Desktop) on Windows', async () => {
        Object.defineProperty(process, 'platform', {
            value: 'win32'
        });

        const msg: InputMessage = { type: 'swipe', direction: 'down' };
        await handler.handleMessage(msg);

        expect(keyboard.pressKey).toHaveBeenCalledWith(Key.LeftSuper, Key.D);
        expect(keyboard.releaseKey).toHaveBeenCalledWith(Key.LeftSuper, Key.D);
    });

});
