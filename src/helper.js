
/* U t i l i t i e s */
export const formatTime = seconds => {
    let time = (seconds/60).toFixed(0).padStart(2, '0') + ':' + (seconds%60).toFixed(0).padStart(2, '0')
    // more than an hour?
    if (seconds >= 3600) time = (seconds/3600).toFixed(0).padStart(2, '0') + ':' + time
    console.log(seconds, time)
    return time
}

export const playbackPercent = ( seconds, duration ) => {
    let percent = seconds/duration * 100

    return percent
}

// export default musicControls