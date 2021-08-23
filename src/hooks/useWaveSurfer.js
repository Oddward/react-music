import WaveSurfer from 'wavesurfer.js';
import { useEffect, useRef } from 'react'

export function UseWaveSurfer (url) {
    const waveformRef = useRef(null)

    useEffect( () => {
        if (waveformRef.current) {
            const waveform = WaveSurfer.create({
                container: waveformRef.current,
                waveColor: '#aaa',
                progressColor: '#444',
                height: 60,
                cursorWidth: 0,
                barWidth: 2,
                barGap: 2,
                responsive: true,
                hideScrollbar: true
            });

            waveform.load(url)
            waveform.on( 'ready', () => {
                waveform.setVolume(.5)
                waveform.play()
            })
        }
    }, [url])

    return(
        <>
            <div ref={waveformRef} className="fit-width"></div>
        </>
    )
}

export default UseWaveSurfer;