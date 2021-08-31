# Dev Notes

Notes to reference to aid the design & development of the app

## Data structures

Overview of data models that'll probably be used (sub objects may be separate model)
- may use APIs for data, if not local files

Track:
```
{
	"title",
	"artist": {
		"name",
		"avatar"
	},
	"artists",
	"album",
	"file",
	"cover": {
		"img",
		"dominant_colour",
	},
	"metadata": {
		"size",
		"duration",
		"mimetype",
		"bitrate",
		"trackNo",
		"year",
		etc.
	}
}
```

Playlist:
```
{
	"id",
	"name",
	"cover", // ?
	"list": [
		{ id } // ( filename or idNo ? )
	]
}
```

## UI/UX design

- The home screen of the app should be the Now Playing view (not the library views as per usual)
- Cover art visible (prominently) at all times, as its dominant colour is used for UI accent
	- might be replaced with artist avatar when viewing artist
- Playback seekbar is a waveform when it can be successfully loaded
- Playback visualization (always visible?)

## UI structure

High level component hierarchy/composition (based on mockups)

<img src="Now playing.png" width="70%" alt="Wide mockup of now playing screen" />
<img src="Now playing - slim.png" width="17.5%" alt="Thin mockup of now playing screen" />

> Mockups of *Now Playing* view when widescreen & when thin/snapped to the side

- App
	- titlebar/app header
		- title (& brand)
		- window-controls (desktop)
	- main-view
		- cover art area
			- cover art | artist avatar (when viewing artist)
			- [track details]
				> visible outside of Now Playing view
		- library || visualizer
			- nav
			- results/lists
	- controls
		- seek/progress bar
			- waveform | seek bar
		- playback controls
			- play/pause
			- next/prev
			- volume
			- now playing list
			- full screen (?)

## Web technologies

- wavesurfer.js
- wave.js
- web audio API