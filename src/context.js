import React from 'react'

export const NowPlayingContext = React.createContext( {
    isFocusedNowPlaying: false,
    toggleFocusNowPlayng: () => {}
} )
