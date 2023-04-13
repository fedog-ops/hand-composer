
import './App.css';

import AudioZone from './AudioZone';
import {Hands} from '@mediapipe/hands'
import * as hands from '@mediapipe/hands'
import * as cam from "@mediapipe/camera_utils"
import { drawConnectors, drawLandmarks} from '@mediapipe/drawing_utils'
import Webcam from "react-webcam";
import {useRef, useEffect, useState } from "react";
import Gesture from './Gesture';

function App() {
    const [storage, setStorage] = useState([])
    const [handGesture, setHandGesture] = useState(null);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let camera=null;

const onResults = (results) => {


  canvasRef.current.width = webcamRef.current.video.videoWidth;
  canvasRef.current.height = webcamRef.current.video.videoHeight;
 
  const canvasElement = canvasRef.current;
  const canvasCtx = canvasElement.getContext("2d");
  canvasCtx.save();

  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );

//drawing the hands

if (results.multiHandLandmarks  && results.multiHandedness){

  // const landmarks = results.multiHandLandmarks[0];
  // const handedness = results.multiHandedness[0];
  // //const gesture = hands.recognize(landmarks, handedness);
  // console.log(hands)
  
  for (const landmarks of results.multiHandLandmarks) {
    setStorage(landmarks)
    drawConnectors(canvasCtx, landmarks, hands.HAND_CONNECTIONS,
                   {color: '#00FF00', lineWidth: 5});
    drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
  }
}


}

useEffect(() => {

  const hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }});
  hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });
hands.onResults(onResults)



if (
  webcamRef.current.video !== "undefined" &&
  webcamRef.current.video !== null
) {
  camera = new cam.Camera(webcamRef.current.video, {
    onFrame: async () => {
      await hands.send({ image: webcamRef.current.video });
    },
    width: 640,
    height: 480,
  });
  camera.start();
}



}, []);

  return (
    <div className="App">

      <Gesture coords={storage}/>
      
     <AudioZone/>
     <h2>Hand gesture: </h2>
     <div >
     <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginRight: "auto",
          marginLeft: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
           <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginRight: "auto",
          marginLeft: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
     
    </div>

    </div>
  );
}

export default App;
