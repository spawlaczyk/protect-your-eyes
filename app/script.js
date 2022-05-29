import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    status: 'off',
    time: 0,
    timer: null,
  };

  formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - (minutes * 60));
    
    if(minutes < 10){
      minutes = '0' + minutes.toString();
    };
    if(seconds < 10){
      seconds = '0' + seconds.toString();
    }

    return minutes + ':' + seconds;
  };

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  step = () => {
    const { time, status } = this.state;
    this.setState({
      time: time - 1,
    });

    if(time === 0 && status === 'work'){
      this.setState({
        status: 'rest',
        time: 20,
      });
      this.playBell();
    } else if (time === 0 && status === 'rest') {
      this.setState({
        status: 'work',
        time: 1200,
      });
      this.playBell();
    }
  };

  startTimer = () => {
    this.setState({
      status: 'work', 
      time: 1200,
      timer: setInterval(this.step, 1000)
    });
  };

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({
      status: 'off',
    });
  };

  closeApp = () => {
    window.close();
  };
 
  render() {
    const { time } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {this.state.status === 'off' && (
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
        )}
        {this.state.status === 'work' && (
        <img src="./images/work.png" />
        )}
        {this.state.status === 'rest' && (
        <img src="./images/rest.png" />
        )}
        {this.state.status !== 'off' && (
        <div className="timer">
          {this.formatTime(time)}
        </div>
        )}
        {this.state.status === 'off' && (
        <button className="btn" onClick={() => this.startTimer()}>Start</button>
        )}
        {this.state.status !== 'off' && (
        <button className="btn" onClick={() => this.stopTimer()}>Stop</button>
        )}
        <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
