import React, { useEffect, useRef, useState} from 'react';
import {NowPlayingContext} from '../context.js'
import { 
    PlayIcon,
    SearchIcon, 
    DotsVerticalIcon,
    MusicNoteIcon,
    ViewListIcon,
} from '@heroicons/react/solid'

class ListItem extends React.Component {
    render() {
      return(
        <tr>
          <td style={{width: '50%'}}>{this.props.title}</td>
          <td style={{textOverflow: 'ellipsis'}}>{this.props.artist}</td>
          <td><DotsVerticalIcon /></td>
        </tr>
      )
    }
}

function ViewerBox( props ) {
    return(
        <div id="browser" className="rounded fit-width" style={{padding: '.5rem 2rem'}}>
            {props.children}
        </div>
    )
}

class Browser extends React.Component {
render() {
    const rows = [];
    this.props.items.forEach( (item) => {
    rows.push(
        <ListItem key={item.file} title={item.title} artist={item.artist} />
    );
    });

    return(
        <>
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
        </>
    )
}
}

function Visualizer( props ) {

    return(
        <>
        <div className="rounded fit-width flex vertical" style={{padding: '.5rem 2rem'}}>
        <header style={{textOverflow: 'clip'}} className="soft-side-padding">
            <h1 className="font-display">{props.track.title}</h1>
            <h2 className="font-subdisplay italic">{props.track.artist}</h2>
        </header>
        {/* <canvas ref={visualRef} width="200" height="200"></canvas> */}
        </div>
        </>
    )
}

class PlayerViewer extends React.Component {
    render() {
        return(
            <div className="flex horizontal space-between fit-height soft-padding small-gap">
                <div className="flex vertical small-gap">
                    <img 
                        src={this.props.currentList[this.props.index].cover} 
                        alt="Album cover" 
                        className="rounded"
                        onClick={() => NowPlayingContext.value = !NowPlayingContext.value}
                        style={{
                            width: '40vmin',
                            height: 'auto',
                            cursor: 'pointer'
                        }} />
                    <div style={{textOverflow: 'clip'}} className="soft-side-padding">
                        <h1 className="font-display">{this.props.currentList[this.props.index].title}</h1>
                        <h2 className="font-subdisplay italic">{this.props.currentList[this.props.index].artist}</h2>
                    </div>
                </div>
                <ViewerBox>
                    <Browser items={this.props.currentList} />
                </ViewerBox>
            </div>
        )
    }
}
PlayerViewer.contextType = NowPlayingContext

export default PlayerViewer