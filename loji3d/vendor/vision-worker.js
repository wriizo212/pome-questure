// CPU inference stays off the UI thread. Only landmarks return to the page.
self.exports={};
let vision,hand,face;
self.onmessage=async ({data:m})=>{
 try{
  if(m.type==='init'){
   importScripts('vision-runtime.52b84244bb64.js');
   vision=await exports.FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm');
   hand=await exports.HandLandmarker.createFromOptions(vision,{canvas:new OffscreenCanvas(1,1),baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',delegate:'CPU'},runningMode:'VIDEO',numHands:2});
   self.postMessage({id:m.id,ready:true});return;
  }
  if(m.type==='frame'){
   const at=performance.now();
   try{
    if(m.face&&!face)face=await exports.FaceLandmarker.createFromOptions(vision,{canvas:new OffscreenCanvas(1,1),baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',delegate:'CPU'},runningMode:'VIDEO',numFaces:1});
    const result=(m.face?face:hand).detectForVideo(m.image,m.time);
    self.postMessage({id:m.id,result,ms:performance.now()-at});
   }finally{m.image.close();}
  }
 }catch(e){self.postMessage({id:m.id,error:String(e.message||e)});}
};
