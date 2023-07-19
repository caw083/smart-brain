import React,{Component} from 'react';

import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imagelinkform';
import Rank from './components/Rank/rank';

import './App.css';
import ParticlesBg from 'particles-bg'

class App extends Component {
  render(){
    return (
      <div className="App">
        <ParticlesBg type="fountain" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
      </div>
    )
  }

}



export default App;
