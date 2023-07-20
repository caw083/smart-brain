import React from "react";
import "./faceRecognition.css"

const FaceRecognition = ({imageUrl, box}) => {
    return  (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
                {
                box.map((face) => {
                    return (
                        <div className='bounding-box' style={{top: face.topRow, right: face.rightCol, bottom: face.bottomRow, left: face.leftCol}} id={box.id}></div>
                    )
                })}
            </div>
        </div>
    )
}

export default FaceRecognition;
