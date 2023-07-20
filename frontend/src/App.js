import React,{Component} from 'react';

import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imagelinkform';
import Rank from './components/Rank/rank';
import FaceRecognition from './components/FaceRecognition/facerecognition';

import './App.css';
import ParticlesBg from 'particles-bg'

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: "",

    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    console.log('click')

  }


  render(){
    return (
      <div className="App">
        <ParticlesBg type="fountain" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.input} />
      </div>
    )
  }

}



export default App;
