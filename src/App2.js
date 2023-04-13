import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import * as mp from '@mediapipe/hands';


const App2 = () => {
  
        const webcamRef = useRef(null);
        const [handGesture, setHandGesture] = useState(null);
    
      const hands = new mp.Hands({
        maxNumHands: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
      const captureVideoFrame = async () => {
        const video = webcamRef.current.video;
        const imageCapture = new ImageCapture(video);
        const blob = await imageCapture.grabFrame();
        const imageBitmap = await createImageBitmap(blob);
        const canvas = document.createElement('canvas');
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imageBitmap, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const results = await hands.process(imageData);
        if (results.multiHandLandmarks && results.multiHandedness) {
          const landmarks = results.multiHandLandmarks[0];
          const handedness = results.multiHandedness[0];
          const gesture = hands.recognize(landmarks, handedness);
          setHandGesture(gesture.label);
        }
      };
      
      return (
        <div>
          <Webcam
            ref={webcamRef}
            style={{ width: '100%', height: 'auto' }}
            onUserMedia={() => setInterval(captureVideoFrame, 100)}
          />
          <h2>Hand gesture: {handGesture}</h2>
        </div>
      );
      
}

export default App2