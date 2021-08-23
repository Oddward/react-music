import logo from './logo.svg';
import './App.css';
import React, { useEffect, useRef} from 'react';
import WaveSurfer from 'wavesurfer.js';
// import { UseWaveSurfer } from './hooks/useWaveSurfer'
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

class TrackView extends React.Component {
  render() {
    return(
      <div className="flex vertical small-gap">
        <img src={this.props.image} alt="Album cover art" className="rounded"
          style={{
            width: '50vmin',
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

function WaveForm() {
  const waveformRef = useRef(null)
  let track = getCurrentTrack()

  useEffect( () => {
    waveformRef.current = WaveSurfer.create({
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

    waveformRef.current.load( track.file )
    waveformRef.current.on( 'ready', () => {
      waveformRef.current.setVolume(.5)
      waveformRef.current.play()
    })
  }, [track])

  return(
    <>
      <div ref={waveformRef} className="fit-width"></div>
    </>
  )
}

class Controls extends React.Component {
  render() {
    // const waveform = WaveForm(this.props.file)
    return(
      <div>
        <div className="flex horizontal space-between small-gap soft-padding" style={{alignItems: 'center'}}>
          <span>{this.props.bitrate}</span>
          {/* <input type="range" className="fit-width" min="0" max="100" /> */}
          {/* <audio ref={waveformRef} src={this.props.file}></audio> */}
          <WaveForm />
          <span>{this.props.duration}</span>
        </div>
        <div className="flex horizontal justify-center small-gap soft-padding">
          <button className="control-butt round" id="prev-butt"><ChevronLeftIcon /></button>
          <button className="control-butt round" id="play-butt" style={{transform: 'scale(1.2)'}}><PlayIcon /></button>
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
const getCurrentTrack = () => trackList[trackIndex];

function App() {
  // currentList = trackList
  return (
    <div className="App flex vertical space-between">
      <header className="flex horizontal space-between">
        <p className="font-display soft-padding" style={{margin: '0'}}>hyacin<span className="font-subdisplay italic"> - Enjoy Listening</span></p>
      </header>
      <div className="flex horizontal space-between fit-height soft-padding small-gap">
        <TrackView
          image={trackList[trackIndex].cover.image}
          title={trackList[trackIndex].title}
          artist={trackList[trackIndex].artist} />
        <Browser items={currentList} />
      </div>
      <Controls bitrate="320kp/s" duration="4:30" file="trackList[trackIndex].file" />
    </div>
  );
}

export default App;
