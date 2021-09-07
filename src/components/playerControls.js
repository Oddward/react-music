import React, { useCallback, useEffect, useRef, useState} from 'react';
import WaveSurfer from 'wavesurfer.js';
import Wave from '@foobar404/wave';
import ControlButton from './leaf-components/controlButton'
import { 
  PlayIcon,
  PauseIcon,
  ChevronLeftIcon, 
  ChevronRightIcon, 
  VolumeUpIcon,
  VolumeOffIcon
} from '@heroicons/react/solid'

const Visual = React.forwardRef(
    function Visual( props ) {
      const [visual] = useState( new Wave() )
      const canvasRef = useRef() 
  
      useEffect( () => {
        // const visual = new Wave() 
        visual.fromElement( props.audio.current.id, canvasRef.current.id, props.options )
      })
  
      return(
        <canvas 
          id="visualization"
          width="1000"
          height="200"
          style={{position:'absolute', bottom: '200px', left:'calc(40vmin + 2rem)', width:'calc(100vmax - (40vmin + 3rem))'}}
          ref={canvasRef} >
        </canvas>
      )
    }
)
  
function PlayerControls( props ) {
  // static contextType = nowPlayingContext

  // const audioRef = React.createRef()
  const waveformRef = React.createRef()
  const getWaveform = useCallback( ref => {
    if (!waveformRef.current && ref) {
      waveformRef.current = WaveSurfer.create({
        container: ref,
        waveColor: '#bbb',
        progressColor: '#444',
        height: 60,
        cursorWidth: 0,
        barWidth: 2,
        barGap: 4,
        responsive: true,
        hideScrollbar: true,
        normalize: false,
        backend: 'MediaElementWebAudio'
        // other options
      });
    }
    return waveformRef.current;
  }, []);
  // visualRef = React.createRef()
  // Nice visual types: wave, shockwave, flower
  // options = { type: 'wave', colors: ['red','white'] }
  const [volume, setVolume] = useState( .5 )
  const [loop, setLoop] = useState( 'off' )
  const [mute, setMute] = useState( false )

  useEffect(() => {
    getWaveform().on("finish", handleEnd);
    return () => getWaveform().destroy();
  }, [getWaveform]);

  useEffect(() => {
    getWaveform().load(props.file);
  }, [getWaveform, props.file]);

  // const loadTrack = () => {
    
  //   // state.visual.fromElement
  // }

  const play = () => { 
    getWaveform().play()
    props.toggleIsPlaying( true )
  }

  const pause = () => { 
    getWaveform().pause()
    props.toggleIsPlaying( false )
  }

  const playPause = () => {
    if ( getWaveform().isPlaying() ) {
      pause()
    } else {
      play()
    }
  }

  const toggleMute = () => {
    if (mute) {
      getWaveform().setMute( false )
      setMute( false )
    } else {
      getWaveform().setMute( true )
      setMute( true )
    }
  }

  const scrollChangeVolume =  e => {
    if ( e === 'up' ) {
      setVolume( volume + 5 )
    } else if ( e === 'down') {
      setVolume( volume - 5 )
    }
  }

  const skipNext = () => {
    if (props.index < props.lastIndex) {
      pause()
      props.changeIndex( props.index + 1 )
      // loadTrack()
      // play()
    }
  }

  const skipPrev = () => {
    if (props.index > 0) {
      pause()
      props.changeIndex( props.index - 1 )
      // loadTrack()
      // play()
    } else {
      getWaveform().stop()
    }
  }

  const handleEnd = () => {
    if (loop === 'single') {
      getWaveform().seekTo( 0 )
      // waveform.play()
    } else {
      skipNext()
    }
  }

  return(
    <div style={{position:'relative'}}>
      {/* <audio id="player" ref={waveformRef} src={state.src} crossOrigin="anonymous" /> */}
      {/* <canvas 
        id="visualization"
        width="1000"
        height="100"
        style={{position:'absolute', bottom: '200px', left:'calc(40vmin + 2rem)', width:'calc(100vmax - (40vmin + 3rem))'}}
        ref={visualRef} >
      </canvas> */}
      {/* <Visual audio={props.waveformRef.getAudio()} options={options} /> */}
      <div className="flex horizontal space-between small-gap soft-padding" style={{alignItems: 'center'}}>
        <span>{props.bitrate}kb/s</span>
        <div id="waveform" ref={getWaveform} className="fit-width" />
        <span>{props.duration}</span>
      </div>
      <div className="flex horizontal justify-center small-gap soft-side-padding" style={{paddingBottom: '.5rem'}}>
        <ControlButton 
          id="prev-butt" 
          onClick={() => skipPrev()}>
            <ChevronLeftIcon />
        </ControlButton>
        <ControlButton 
          id="play-butt"
          style={{transform: 'scale(1.2)'}}
          onClick={() => playPause()}
          >
            {props.isPlaying ? <PauseIcon /> : <PlayIcon />}
        </ControlButton>
        <ControlButton 
          id="next-butt" 
          onClick={() => skipNext()}
          >
            <ChevronRightIcon />
        </ControlButton>
        <ControlButton 
          id="volume-butt" 
          onClick={() => toggleMute()}
          onScrollUp={() => scrollChangeVolume('up')}
          onScrollDown={() => scrollChangeVolume('down')}
          >
            {mute ? <VolumeOffIcon style={{transform:'scale(.8)'}} /> : <VolumeUpIcon style={{transform:'scale(.8)'}} /> }
        </ControlButton>
        {/* { props.index } */}
      </div>
    </div>
  )
}

export default PlayerControls