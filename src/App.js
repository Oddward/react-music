// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useRef, useState} from 'react';
import WaveSurfer from 'wavesurfer.js';
// import { UseWaveSurfer } from './hooks/useWaveSurfer'
import Wave from '@foobar404/wave';
import { 
  PlayIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  SearchIcon, 
  DotsVerticalIcon,
  MusicNoteIcon,
  ViewListIcon,
  VolumeUpIcon
} from '@heroicons/react/solid'

class ListItem extends React.Component {
  render() {
    return(
      <tr>
        <td>{this.props.title}</td>
        <td style={{textOverflow: 'ellipsis'}}>{this.props.artist}</td>
        <td><DotsVerticalIcon /></td>
      </tr>
    )
  }
}

class Browser extends React.Component {
  render() {
    const rows = [];
    this.props.items.forEach( (item) => {
      rows.push(
        <ListItem key title={item.title} artist={item.artist} />
      );
    });

    return(
      <div id="browser" className="rounded fit-width" style={{padding: '.5rem 2rem'}}>
        <nav className="flex horizontal">
          <button className="nav-butt soft-side-padding"><SearchIcon className="icon" /></button>
          <button className="nav-butt soft-side-padding"><MusicNoteIcon className="icon" /></button>
          <button className="nav-butt soft-side-padding"></button>
          <button className="nav-butt soft-side-padding"><ViewListIcon className="icon" /></button>
        </nav>
        <table>
          <thead style={{borderBottom: '2px solid white'}}>
            <tr>
              <th className="fit-width">Track</th>
              <th style={{width: '5rem'}}>Artist</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    )
  }
}

function Visualizer( props ) {
  // let [visual] = useState( new Wave() )
  // let visualRef = useRef(null)
  // let audioRef = useRef(null)
  let track = getCurrentTrack()

  // useEffect( () => {
    // navigator.mediaDevices.getUserMedia({
    //   audio: true
    // })
    // .then(function () {
    //     [visual].fromElement(this.props.audio, visualRef.current, {
    //     type: "shine",
    //     colors: ["red", "white", "blue"]
    //   });
    // })
    // .catch(function (err) {
    //   console.log(err.message)
    // });
  // }, [])

  return(
    <>
    <div className="rounded fit-width flex vertical" style={{padding: '.5rem 2rem'}}>
      <header style={{textOverflow: 'clip'}} className="soft-side-padding">
          <h1 className="font-display">{track.title}</h1>
          <h2 className="font-subdisplay italic">{track.artist}</h2>
      </header>
      {/* <canvas ref={visualRef} width="200" height="200"></canvas> */}
    </div>
    </>
  )
}

class TrackView extends React.Component {
  render() {
    return(
      <div className="flex vertical small-gap">
        <img src={this.props.image} alt="Album cover art" className="rounded"
          style={{
            width: '40vmin',
            height: 'auto'
          }} />
        <div style={{textOverflow: 'clip'}} className="soft-side-padding">
          <h1 className="font-display">{this.props.title}</h1>
          <h2 className="font-subdisplay italic">{this.props.artist}</h2>
        </div>
      </div>
    )
  }
}

class Controls extends React.Component {
  constructor( props ) {
    super( props )
    this.waveformRef = React.createRef()
    this.visualRef = React.createRef()
    this.audioRef = React.createRef()
    this.options = { type: 'wave', colors: ['red','white'] }
    this.state = {
      isPlaying: false,
      visual: new Wave(),
      src: currentList[trackIndex].file
    }
    this.track = this.props.file
    // this.loadWaveform = this.loadWaveform.bind(this)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.playPause = this.playPause.bind(this)
    this.loadTrack = this.loadTrack.bind(this)
  }

  componentDidMount() {
    this.waveformRef.current = WaveSurfer.create({
      container: this.waveformRef.current,
      waveColor: '#aaa',
      progressColor: '#444',
      height: 60,
      cursorWidth: 0,
      barWidth: 2,
      barGap: 2,
      responsive: true,
      hideScrollbar: true
    });
    // this.audioRef.current.crossOrigin = "anonymous"
    // this.audioRef.current.src = currentList[trackIndex].file
    this.audioRef.current.volume = .5
    this.loadTrack( this.audioRef.current.src )
    this.state.visual.fromElement( this.audioRef.current.id, this.visualRef.current.id, this.options )
  }

  // componentDidUpdate() {
  //   this.state.visual.destroyMediaElementSource()
  // }

  loadTrack( track ) {
    this.waveformRef.current.load( track )
    // this.state.visual.fromElement
  }

  componentWillUnmount() {
    this.waveformRef.current.destroy()
    // this.state.visual. 
  }

  play() { this.audioRef.current.play() }

  pause() { this.audioRef.current.pause() }

  playPause() {
    this.state.isPlaying ? this.pause() : this.play()
    this.setState({ isPlaying: !this.state.isPlaying })
  }

  render() {
    return(
      <div style={{position:'relative'}}>
        <audio id="player" ref={this.audioRef} src={this.state.src} crossOrigin="anonymous" />
        <canvas 
          id="visualization"
          width="1000"
          height="100"
          style={{position:'absolute', bottom: '200px', left:'calc(40vmin + 2rem)', width:'calc(100vmax - (40vmin + 3rem))'}}
          ref={this.visualRef} >

        </canvas>
        <div className="flex horizontal space-between small-gap soft-padding" style={{alignItems: 'center'}}>
          <span>{this.props.bitrate}</span>
          <div id="waveform" ref={this.waveformRef} className="fit-width" />
          <span>{this.props.duration}</span>
        </div>
        <div className="flex horizontal justify-center small-gap soft-padding">
          <button className="control-butt round" id="prev-butt"><ChevronLeftIcon /></button>
          <button className="control-butt round" id="play-butt" style={{transform: 'scale(1.2)'}}
            onClick={() => this.playPause()}><PlayIcon /></button>
          <button className="control-butt round" id="next-butt"><ChevronRightIcon /></button>
          <button className="control-butt round" id="volume-butt"><VolumeUpIcon /></button>
        </div>
      </div>
    )
  }
}

const trackList = [
  {
  "title": "Sentinel", "artist":"Kai Engel", "album":"Satin", "file":"/Kai_Engel_-_04_-_Sentinel.mp3",
  "cover":{"image":"/a4124344313_10.jpg","main_colour":"orange"},
  "metadata": {"size":3876, "mimetype":"MP3", "bitrate":320, "trackNo":"1", "year":"2021"}
  },
  {
    "title": "I Recall", "artist":"Blue Dot Sessions", "album":"", "file":"/Kai_Engel_-_04_-_Sentinel.mp3",
    "cover":{"image":"/a4124344313_10.jpg","main_colour":"orange"},
    "metadata": {"size":3876, "mimetype":"MP3", "bitrate":320, "trackNo":"1", "year":"2021"}
    }
]
const trackIndex = 0
const currentList = trackList
const getCurrentTrack = () => currentList[trackIndex];
// const audioCtx = React.createContext(new AudioContext())

function App() {
  // currentList = trackList
  const [isNowPlayingView, toggleNowPlayingView] = useState(false)
  // const audioRef = useRef(<audio src={currentList[trackIndex].file} autoPlay>Browser not supported</audio>)
  // const audioEl = <audio src={currentList[trackIndex].file} autoPlay>Browser not supported</audio>
  // const [audioCtx] = useState(new AudioContext())
  // const audioSample = audioCtx.createMediaElementSource( audioEl )
  const audioRef = useRef();
  
  let view
  let titlebarPhrase = ""
  if ( isNowPlayingView ) {
    view = <Visualizer audio={audioRef.current} />
    titlebarPhrase = " — Enjoy Listening"
  } else {
    view = <Browser items={currentList} />
    titlebarPhrase = " — Build your nest"
  }

  return (
    <div className="App flex vertical space-between">
      <header className="flex horizontal space-between">
        <p className="font-display soft-padding" style={{margin: '0'}}
        onClick={() => toggleNowPlayingView(!isNowPlayingView)}>
          hyacin<span className="font-subdisplay italic">{titlebarPhrase}</span>
        </p>
      </header>
      <div className="flex horizontal space-between fit-height soft-padding small-gap">
        <TrackView
          image={trackList[trackIndex].cover.image}
          title={trackList[trackIndex].title}
          artist={trackList[trackIndex].artist} />
        {view}
        <audio ref={audioRef} src={currentList[trackIndex].file}></audio>
      </div>
      <Controls bitrate="320kb/s" duration="4:30" file="trackList[trackIndex].file" />
    </div>
  );
}

export default App;
