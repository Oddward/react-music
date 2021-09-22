import React, { useCallback, useEffect, useRef, useState, useContext} from 'react';
import WaveSurfer from 'wavesurfer.js';
import Wave from '@foobar404/wave';
import ControlButton from './leaf-components/controlButton'
import { formatTime } from '../helper'
import {NowPlayingContext} from '../context.js'
import { 
  PlayIcon,
  PauseIcon,
  ChevronLeftIcon, 
  ChevronRightIcon, 
  VolumeUpIcon,
  VolumeOffIcon
} from '@heroicons/react/solid'

const Visual = React.forwardRef(
    function Visual( props, ref ) {
      const [visual] = useState( new Wave() )
      const canvasRef = useRef() 

      const { isFocusedNowPlaying } = useContext( NowPlayingContext )
  
      useEffect( () => {
        visual.fromElement( props.audioRef.current.id, canvasRef.current.id, props.options )
      })
  
      return(
        <canvas 
          id="visualization"
          width="1000"
          height="250"
          style={{
            position:'absolute',
            bottom: '163px',
            left: isFocusedNowPlaying ? 'calc(64vmin + 2rem)':'calc(40vmin + 2rem)',
            width: isFocusedNowPlaying ? 'calc(100vmax - (64vmin + 3rem))':'calc(100vmax - (40vmin + 3rem))',
            height: '200px'
          }}
          className="animated"
          ref={canvasRef} >
        </canvas>
      )
    }
)
  
function PlayerControls( props ) {
  
  const audioElRef = React.createRef()
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
        backend: 'MediaElement',
        removeMediaElementOnDestroy: false,
        closeAudioContext: true,
        // other options
      });
    }
    return waveformRef.current;
  }, []);

  const getAudio = useCallback( ref => {
    // if (!audioElRef.current && ref) {}
    return audioElRef.current
  })
  /*
   * Nice visualizer types: wave | shockwave | flower
   */
  const options = { type: 'wave', colors: ['grey','white'] }
  const [volume, setVolume] = useState( .5 )
  const [loop, setLoop] = useState( 'off' )
  const [mute, setMute] = useState( false )
  // const [currentTime, setCurrentTime] = useState( 0 )

  // Just counting # of renders
  const ref = useRef(0);
  useEffect(() => {
    ref.current += 1;
  });

  const toggleMute = () => {
    if (mute) {
      setMute( false )
      getWaveform().setMute( false )
    } else {
      setMute( true )
      getWaveform().setMute( true )
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
      props.changeIndex( props.index + 1 )
    }
  }

  const skipPrev = () => {
    if (props.index > 0) {
      getAudio().pause()
      props.changeIndex( props.index - 1 )
    } else {
      // getWaveform().stop()
      getAudio().pause()

    }
  }

  // Initialize audio & waveform for playback controls with each track change
  useEffect(() => {
    getAudio().src = props.file
    getAudio().addEventListener( 'canplay', () => {
      getWaveform().load( getAudio() );
    }, { once: true })

    getWaveform().once( 'ready', () => {
      if ( props.isPlaying ) getAudio().play()
    } )

    console.log( audioElRef.current, audioElRef.current.currentTime, audioElRef.current.duration, audioElRef.current.src )

    getAudio().addEventListener( 'ended', () => {
      skipNext()
    }, { once: true })

    // const audio = getAudio()

    return () => {
      getWaveform().empty()
      // audio.pause()
    }
  }, [props.file]);

  useEffect(() => {
    if ( props.isPlaying ) {
      getAudio().play()
    } else {
      getAudio().pause()
    }
  }, [props.isPlaying, props.file, getWaveform, getAudio])


  return(
    <div style={{position:'relative'}}>
      {/* <canvas 
        id="visualization"
        width="1000"
        height="100"
        style={{position:'absolute', bottom: '200px', left:'calc(40vmin + 2rem)', width:'calc(100vmax - (40vmin + 3rem))'}}
        ref={visualRef} >
      </canvas> */}
      <audio id="audio" ref={audioElRef} src="" crossOrigin="anonymous"/>
      <Visual audioRef={audioElRef} options={options} />
      <div className="flex horizontal space-between small-gap soft-padding" style={{alignItems: 'center'}}>
        <span>{props.bitrate}kb/s</span>
        <div id="waveform" ref={getWaveform} className="fit-width" />
        <span>{formatTime(props.duration)} { ref.current }</span>
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
          onClick={() => props.toggleIsPlaying( !props.isPlaying )}
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