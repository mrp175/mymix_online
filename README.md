# My Mix Online

A DAW, but not in the conventioal sense. It can probably be best described as a mix designer more than anything else. 

![project image](https://res.cloudinary.com/mrp175/image/upload/v1643814754/github/Animation4_ximdeq.gif)

## Aim

The aim of the project are to create an app with a digital audio workstation like interface, that allows users to upload their own music files, import them into the editor, and mix them together however they see fit.

## Current features

* Display audio files as waveforms - Implemented using waveform-data.js and HTML canvas
    *  Draw entire waveform - Due to canvas having a theoretical maximum width, for high zoom levels, the waveforms is drawn across multiple canvases that seemlessly stiched together.
* Waveform gain control - This changes the hight of the waveform, and will reflect the volume of the audio file. 
* Zoom functionality
    * Display bar lines and bar counts to match zoom level - Implemented with HTML canvas
    * Match waveform to zoom level - Implemented by pre loading the waveform at various zoom levels and transitioning between them using css transform scale property. This is to improve performance. Redrawing an entire waveform to canvas with hundreds of thousnads of data points in real time is impractical. 
    * Keep scroll position when zooming
* Waveform positioning with click and drag 
    * Basic snapping implementation that snaps the waveform to the nearest bar. 
* Extract metadata from audio files (artist, title, album etc) - Implemented using musicmetadata package.
* Detect song BPM - Implemented using the web-audio-beat-detector package.

## What features still need to be added

* File browser to manage audio files.
* Drag and drop support to drag audio files onto the sequencer.
* Set project tempo.
* Set indivial waveform tempo.
* Allow for more snapping configurations when dragging waveforms.
* Allow waveforms to be dragged between tracks.
* Implement automation ui.
* Add and delete tracks.
* Add loop markers.
* Save and restore sessions
* Implement audio - prototyped with the Web Audio API previously and confirmed working as expected. 
    * Play track and at correct time based on waveform position on sequencer and playhead position.
    * Stop playback.
    * Change track tempo when changed in ui.
    * Implement effects and audio changes based on automation data (hight pass filter, volume).
    * Loop audio between loop markers. 
    * Export mix to MP3 and Wav.

## Tech Stack

* React
* Typescript
* Redux
* Web Audio Api

## Run locally

These instructions will help you setup a local development instance of the app if you want to run it locally.

### Get the repo

```
git clone https://github.com/mrp175/mymix_online.git
```

### Navigate to the folder

```
cd mymix_online
```

### Install the dependencies

```
npm install
```

### Start the app in development mode

```
npm start
```
Then go to http://localhost:3000 to view it in the browser.
