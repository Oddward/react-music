// import logo from './logo.svg';
import './App.css';
import React, { useState} from 'react';
// import ReactHowler from 'react-howler'

import {NowPlayingContext} from './context.js'
import PlayerControls from './components/playerControls'
import PlayerViewer from './components/playerViewer'

/* Constants */ 
const trackList = [
  {
    "title": "Sentinel", 
    "artist": "Kai Engel", 
    "album": "Satin", 
    "file": "/Kai_Engel_-_04_-_Sentinel.mp3",
    "duration": 183,
    "cover": "/a4124344313_10.jpg",
    "main_colour": "orange",
    "metadata": {"size":3876, "mimetype":"MP3", "bitrate":'320', "trackNo":"1", "year":"2021"}
  },
  {
    "title": "I Recall", 
    "artist": "Blue Dot Sessions", 
    "album": "", 
    "file": "/Blue_Dot_Sessions_-_I_Recall.mp3",
    "duration": 301,
    "cover": "/bluedotsessions-irecall.jpg",
    "main_colour": "orange",
    "metadata": {"size":3876, "mimetype":"MP3", "bitrate":'192', "trackNo":"1", "year":"2021"}
    }
]

function App() {

  // const audioRef = useRef();
  const tracks = [...trackList]

  const [isFocusedNowPlaying, toggleFocusNowPlaying] = useState( false )
  const value= {isFocusedNowPlaying, toggleFocusNowPlaying}

  const [currentList, setCurrentList] = useState( tracks )
  const [index, changeIndex] = useState( 0 )
  const [isPlaying, toggleIsPlaying] = useState( false )

  return (
    <NowPlayingContext.Provider value={ value }>
    <div className="App flex vertical space-between">
      <header className="flex horizontal space-between">
        <p className="font-display soft-padding" style={{margin: '0'}}
        onClick={() => toggleFocusNowPlaying(!isFocusedNowPlaying)}>
          Hyacin<span className="font-subdisplay italic">
            {value.isFocusedNowPlaying ? ' — Enjoy Listening' : ' — Build your nest'}
            </span>
        </p>
      </header>
      {/* <audio ref={audioRef} src={currentTrack.file}></audio> */}
      <PlayerViewer 
        index={index}
        changeIndex={() => changeIndex}
        currentList={currentList}
        setCurrentList={() => setCurrentList} />
      <PlayerControls 
        bitrate={currentList[index].metadata.bitrate} 
        duration={currentList[index].duration} 
        file={currentList[index].file}
        index={index}
        lastIndex={currentList.length - 1}
        changeIndex={(i) => changeIndex(i)}
        // audioRef={audioRef}
        isPlaying={isPlaying}
        toggleIsPlaying={(t) => toggleIsPlaying( t )}
        />
    </div>
    </NowPlayingContext.Provider>
  );
}

export default App;
