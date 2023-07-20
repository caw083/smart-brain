import React,{Component} from 'react';

import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imagelinkform';
import Rank from './components/Rank/rank';
import FaceRecognition from './components/FaceRecognition/facerecognition';
import SignIn from './components/SignIn/signIn';
import Register from './components/Register/Register';

import './App.css';
import ParticlesBg from 'particles-bg'

const returnClarifaiJSONRequest = (imageUrl) => {
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = '928db2d6395e48cc9cd35ffebfd536dc';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'hidbg0n4d5tb';       
  const APP_ID = 'Smart-Brain123';
  // Change these to whatever model and image URL you want to use
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": IMAGE_URL
                      }
                  }
              }
          ]
      });
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

  return requestOptions;
}


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: [],
      route: 'signIn',



    }
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    let peopleFace = [];

    let id = 0;

    data.map((region) => {
       let facePerson = {
        leftCol: region.region_info.bounding_box.left_col * width,
        topRow: region.region_info.bounding_box.top_row * height,
        rightCol: width - (region.region_info.bounding_box.right_col * width),
        bottomRow: height - (region.region_info.bounding_box.bottom_row * height),
        id : id
       };
      peopleFace.push(facePerson);
      id++;
    })
    return peopleFace;
  }


  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    const MODEL_ID = 'face-detection';
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiJSONRequest(this.state.input))
         .then(response => response.json())
         .then(result => {this.displayFaceBox(this.calculateFaceLocation(result.outputs[0].data.regions))})
         .catch(error => {console.log('error', error); alert("Error format is not correct or Download failed")});
  }
  onRouteChange = (route) => {
    this.setState({route:route})
  }
  
  render(){
    return (
      <div className="App">
        
        <ParticlesBg type="fountain" bg={true} />
         {this.state.route === 'signIn' ? <SignIn onRouteChange={this.onRouteChange} /> : 
         (this.state.route === 'register' ? <Register onRouteChange={this.onRouteChange} /> : 
          <div>
              <Navigation onRouteChange={this.onRouteChange} />
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>)
          }
      </div>
    )
  }

}



export default App;
