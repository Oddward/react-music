import logo from './logo.svg';
import './App.css';
import React from 'react';
import WaveSurfer from 'wavesurfer.js';
import { MusicNoteIcon, PlayIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react'

class ListItem extends React.Component {
  render() {
    return(
      <tr>
        <td style="width: 30%;">{this.props.title}</td>
        <td>{this.props.artist}</td>
        <td><span class="icon-butt"></span></td>
      </tr>
    )
  }
}

class Browser extends React.Component {
  render() {
    const rows = [];
    this.props.items.forEach( (item) => {
      rows.push(
        <ListItem title={item.title} artist={item.artist} />
      );
    });

    return(
      <div id="browser" className="rounded fit-width medium-padding">
        <nav>
          <button>Search</button>
          <button>Tracks</button>
          <button>Artists</button>
          <button>Playlists</button>
        </nav>
        <table>
          <tbody>{rows}</tbody>
        </table>
      </div>
    )
  }
}

class TrackView extends React.Component {
  render() {
    return(
      <div className="flex vertical small-gap soft-padding">
        <img src={this.props.image} alt="Album cover art" className="rounded" />
        <div>
          <h1 className="font-display">{this.props.title}</h1>
          <h2 className="font-subdisplay italic">{this.props.artist}</h2>
        </div>
      </div>
    )
  }
}

class Waveform extends React.Component {
  contructor( props ) {
    const waveform = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#aaa',
      progressColor: '#444',
      height: 70,
      cursorWidth: 0,
      barWidth: 2,
      barGap: 2,
      barRadius: 1,
      responsive: true,
      hideScrollbar: true
    });
    this.waveform.load(this.props.file);
  }

  render() {
    return(
      <div id="waveform" className="fit-width"></div>
    )
  }
}

class Controls extends React.Component {
  render() {
    return(
      <div>
        <div className="flex horizontal space-between small-gap soft-padding">
          <span>{this.props.bitrate}</span>
          {/*<input type="range" className="fit-width" min="0" max="100" />*/}
          {/*<Waveform file={trackList[trackIndex].file} />*/}
          <span>{this.props.duration}</span>
        </div>
        <div className="flex horizontal justify-center small-gap soft-padding">
          <button className="control-butt round"><ChevronLeftIcon /></button>
          <button className="control-butt round"><PlayIcon /></button>
          <button className="control-butt round"><ChevronRightIcon /></button>
        </div>
      </div>
    )
  }
}

const trackList = [
  {
  "title": "Ripple", "artist":"Ma'h Nipule", "album":"The 5th Album", "file":"https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/44cK132R38Z8nHRbgkVcmZIpLVmFuptvXM9C32ro.mp3",
  "cover":{"image":"https://www.freemusicarchive.org/image?file=image%2Fu9BtWUI6O4NQwWCFXbvBaOHvXy2zdnZEZdfNG9sn.jpeg&width=290&height=290&type=image","main_colour":"orange"},
  "metadata": {"size":"3876", "mimetype":"MP3", "bitrate":"320", "trackNo":"1", "year":"2021"}
  }
]
const trackIndex = 0
const currentList = trackList

function App() {
  // currentList = trackList
  return (
    <div className="App flex-vertical-between">
      <header className="flex-horizontal-between">
        <p>hyacin<span> - Enjoy Listening</span></p>
      </header>
      <div className="flex-horizontal-between fit-height soft-padding">
        <TrackView
          image={trackList[trackIndex].cover.image}
          title={trackList[trackIndex].title}
          artist={trackList[trackIndex].artist} />
        <Browser items={currentList} />
      </div>
      <Controls bitrate="320kp/s" duration="4:30" />
    </div>
  );
}

export default App;
