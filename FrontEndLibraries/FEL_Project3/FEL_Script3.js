import React from "react";
import ReactDOM from "react-dom/client";
const soundBanks = {
    heaterKit: [
      {
        key: "Q",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
        name: "Heater 1"
      },
      {
        key: "W",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
        name: "Heater 2"
      },
      {
        key: "E",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
        name: "Heater 3"
      },
      {
        key: "A",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
        name: "Heater 4"
      },
      {
        key: "S",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
        name: "Clap"
      },
      {
        key: "D",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
        name: "Open-HH"
      },
      {
        key: "Z",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
        name: "Kick-n-Hat"
      },
      {
        key: "X",
        url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
        name: "Kick"
      },
      {
        key: "C",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
        name: "Closed-HH"
      }
    ]
  };
  
  class DrumPad extends React.Component {
    componentDidMount() {
      document.addEventListener("keydown", this.handleKeyPress);
    }
  
    componentWillUnmount() {
      document.removeEventListener("keyup", this.handleKeyPress);
    }
  
    handleKeyPress = (event) => {
      if (event.key.toUpperCase() === this.props.sound.key) {
        this.playSound();
      }
    };
  
    playSound = () => {
      const { sound, setDisplay } = this.props;
      const audio = document.getElementById(sound.key);
      if (audio) {
        audio.currentTime = 0;
        audio.play();
        setDisplay(sound.name);
      }
    };
  
    render() {
      const { sound } = this.props;
      return (
        <button className="drum-pad" id={sound.name} onClick={this.playSound}>
          {sound.key}
          <audio className="clip" id={sound.key} src={sound.url} />
        </button>
      );
    }
  }
  
  class PadBank extends React.Component {
    render() {
      return (
        <div className="pad-bank">
          {soundBanks.heaterKit.map((sound) => (
            <DrumPad
              key={sound.key}
              sound={sound}
              setDisplay={this.props.setDisplay}
            />
          ))}
        </div>
      );
    }
  }
  
  class DrumApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        display: ""
      };
      this.setDisplay = this.setDisplay.bind(this);
    }
  
    setDisplay = (display) => {
      this.setState({ display });
    };
  
    render() {
      return (
        <div id="drum-machine">
          <PadBank setDisplay={this.setDisplay} />
          <div id="display">{this.state.display}</div>
        </div>
      );
    }
  }
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<DrumApp />);