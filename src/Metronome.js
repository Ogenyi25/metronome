import React from 'react'
import click1 from './assets/audio/click1.wav'
import click2 from './assets/audio/click2.wav'
import './Metronome.css'

class Metronome extends React.Component {

    constructor() {
        super()
        this.state = {
            playing: false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 4
        }
        // bind and create audio files
        this.click1 = new Audio(click1)
        this.click2 = new Audio(click2)
    }

    startStop = () => {
        if (this.state.playing) {
          // Stop the timer
          clearInterval(this.timer);
          this.setState({
            playing: false
          });
        } else {
          // Start a timer with the current BPM
          this.timer = setInterval(
            this.playClick,
            (60 / this.state.bpm) * 1000
          );
          this.setState(
            {
              count: 0,
              playing: true
              // Play a click "immediately" (after setState finishes)
            },
            this.playClick
          );
        }
      };

      playClick = () => {
        const { count, beatsPerMeasure } = this.state;
      
        // The first beat will have a different sound than the others
        if (count % beatsPerMeasure === 0) {
          this.click2.play();
        } else {
          this.click1.play();
        }
      
        // Keep track of which beat we're on
        this.setState(state => ({
          count: (state.count + 1) % state.beatsPerMeasure
        }));
      };

    handleSliderChange = (event) => {
        const newBpmValue = event.target.value
        this.setState({
            bpm: newBpmValue
        })

    }
    handleButtonClick = () => {
        this.click1.play()
    }

    render() {
        const { bpm, playing } = this.state
        return (
            <div className="metronome">
                <div className="bpm-slider">
                    <div>{bpm} BPM</div>
                    <input type="range" min="60" max="240" value={bpm} onChange={this.handleSliderChange} />
                </div>
                <button onClick={this.handleButtonClick}>{playing ? 'Stop' : 'Start'}</button>
            </div>

        );
    }
}

export default Metronome;