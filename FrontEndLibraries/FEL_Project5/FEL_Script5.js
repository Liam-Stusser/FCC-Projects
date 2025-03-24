import React from "react";
import ReactDOM from "react-dom/client";

class ClockApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        breakLength: 5,
        sessionLength: 25,
        timeLeft: "25:00",
        timerLabel: "Session",
        isRunning: false
      };
      this.breakInc = this.breakInc.bind(this);
      this.breakDec = this.breakDec.bind(this);
      this.sessionInc = this.sessionInc.bind(this);
      this.sessionDec = this.sessionDec.bind(this);
      this.reset = this.reset.bind(this);
      this.toggleTimer = this.toggleTimer.bind(this);
      this.runTimer = this.runTimer.bind(this);
    }
  
    breakInc = () => {
      if (!this.state.isRunning && this.state.breakLength < 60) {
        this.setState((prevState) => ({
          breakLength: prevState.breakLength + 1
        }));
      }
    };
  
    breakDec = () => {
      if (!this.state.isRunning && this.state.breakLength > 1) {
        this.setState((prevState) => ({
          breakLength: prevState.breakLength - 1
        }));
      }
    };
  
    sessionInc = () => {
      if (!this.state.isRunning && this.state.sessionLength < 60) {
        this.setState((prevState) => {
          const newSessionLength = prevState.sessionLength + 1;
          return {
            sessionLength: newSessionLength,
            timeLeft:
              prevState.timerLabel === "Session"
                ? this.convertSecondsToTime(newSessionLength * 60)
                : prevState.timeLeft
          };
        });
      }
    };
  
    sessionDec = () => {
      if (!this.state.isRunning && this.state.sessionLength > 1) {
        this.setState((prevState) => {
          const newSessionLength = prevState.sessionLength - 1;
          return {
            sessionLength: newSessionLength,
            timeLeft:
              prevState.timerLabel === "Session"
                ? this.convertSecondsToTime(newSessionLength * 60)
                : prevState.timeLeft
          };
        });
      }
    };
  
    toggleTimer = () => {
      if (this.state.isRunning) {
        clearInterval(this.intervalId);
        this.setState({ isRunning: false });
      } else {
        this.setState({ isRunning: true }, () => {
          this.intervalId = setInterval(this.runTimer, 1000);
        });
      }
    };
  
    runTimer = () => {
      let currentSeconds = this.convertTimeToSeconds(this.state.timeLeft);
  
      if (currentSeconds > 0) {
        currentSeconds -= 1;
        this.setState({
          timeLeft: this.convertSecondsToTime(currentSeconds)
        });
      } else {
        document.getElementById("beep").play();
  
        if (this.state.timerLabel === "Session") {
          this.setState({
            timerLabel: "Break",
            timeLeft: this.convertSecondsToTime(this.state.breakLength * 60)
          });
        } else {
          this.setState({
            timerLabel: "Session",
            timeLeft: this.convertSecondsToTime(this.state.sessionLength * 60)
          });
        }
      }
    };
  
    convertTimeToSeconds = (time) => {
      const [minutes, seconds] = time.split(":").map(Number);
      return minutes * 60 + seconds;
    };
  
    convertSecondsToTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds
      ).padStart(2, "0")}`;
    };
  
    reset = () => {
      clearInterval(this.intervalId);
      const beepSound = document.getElementById("beep");
      beepSound.pause();
      beepSound.currentTime = 0;
      this.setState({
        breakLength: 5,
        sessionLength: 25,
        timeLeft: "25:00",
        timerLabel: "Session",
        isRunning: false
      });
    };
  
    render() {
      return (
        <div className="clock-container">
          <h1>25 + 5 Clock</h1>
  
          <div className="control-group">
            <div className="control-section">
              <div id="break-label">Break Length</div>
              <div>
                <button id="break-decrement" onClick={this.breakDec}>
                  -
                </button>
                <span id="break-length">{this.state.breakLength}</span>
                <button id="break-increment" onClick={this.breakInc}>
                  +
                </button>
              </div>
            </div>
  
            <div className="control-section">
              <div id="session-label">Session Length</div>
              <div>
                <button id="session-decrement" onClick={this.sessionDec}>
                  -
                </button>
                <span id="session-length">{this.state.sessionLength}</span>
                <button id="session-increment" onClick={this.sessionInc}>
                  +
                </button>
              </div>
            </div>
          </div>
  
          <h2 id="timer-label">{this.state.timerLabel}</h2>
          <div id="time-left">{this.state.timeLeft}</div>
  
          <div className="action-buttons">
            <button id="start_stop" onClick={this.toggleTimer}>
              Start / Stop
            </button>
            <button id="reset" onClick={this.reset}>
              Reset
            </button>
          </div>
  
          <audio
            id="beep"
            src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
            preload="auto"
          ></audio>
        </div>
      );
    }
  }
  
  ReactDOM.render(<ClockApp />, document.getElementById("root"));