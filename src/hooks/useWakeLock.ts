import { useEffect } from 'react';
import NoSleep from 'nosleep.js';

export function useWakeLock() {
    useEffect(() => {
        const noSleep = new NoSleep();
        const enable = () => noSleep.enable().catch(() => { });

        enable();
        document.addEventListener('pointerdown', enable, { once: true });

        const onVisChange = () => {
            if (document.visibilityState === 'visible') enable();
        };
        document.addEventListener('visibilitychange', onVisChange);

        return () => {
            document.removeEventListener('visibilitychange', onVisChange);
            noSleep.disable();
        };
    }, []);
}
