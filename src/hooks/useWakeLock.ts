import { useEffect, useRef } from "react";

// Base64-encoded minimal silent MP4 video for the screen-sleep fallback.
// Playing an invisible looped video prevents the OS from dimming the screen
// on browsers that don't support the Screen Wake Lock API.
const SILENT_MP4 =
    "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAB" +
    "ttZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1MiByMjg1NCBlOTU1" +
    "NjUyIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNyAtIGh0" +
    "dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVm" +
    "PTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9" +
    "MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0x" +
    "IHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEg" +
    "Y2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGlj" +
    "ZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBh" +
    "dD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9" +
    "MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5" +
    "aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19s" +
    "b29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49" +
    "MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAbWWIhAAh" +
    "/9PWYQU0AQAFAAC3NhfihAAAAwJULgtkaABNwACNiB0FAEAACLbffnk0AAADIIB0IACa4BBA" +
    "AJNECMhAQAAAAwADCYBBgAIEAAAA6YBEhAAAA+hkVAAAAA==";

export function useWakeLock() {
    const sentinelRef = useRef<any>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;

        const requestWakeLock = async () => {
            try {
                if ("wakeLock" in navigator) {
                    const result = await (navigator as any).wakeLock.request("screen");
                    if (mountedRef.current) {
                        sentinelRef.current = result;
                    } else {
                        await result.release();
                    }
                    return true;
                }
            } catch {
                // Wake Lock API failed or not available
            }
            return false;
        };

        const startVideoFallback = () => {
            if (videoRef.current) return;
            const video = document.createElement("video");
            video.setAttribute("playsinline", "");
            video.setAttribute("loop", "");
            video.setAttribute("muted", "");
            video.muted = true;
            video.src = SILENT_MP4;
            video.style.cssText = "position:fixed;opacity:0;width:1px;height:1px;pointer-events:none";
            document.body.appendChild(video);
            video.play().catch(() => { });
            videoRef.current = video;
        };

        const activate = async () => {
            const locked = await requestWakeLock();
            if (!locked && mountedRef.current) {
                startVideoFallback();
            }
        };

        activate();

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") activate();
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            mountedRef.current = false;
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            sentinelRef.current?.release();
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.remove();
                videoRef.current = null;
            }
        };
    }, []);
}
