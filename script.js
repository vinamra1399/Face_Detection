let video = document.getElementById("video");
let model;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const setup = () => {
  navigator.mediaDevices
    .getUserMedia({
      video: { width: 1000, height: 800 },
      audio: false,
    })
    .then((stream) => {
      video.srcObject = stream;
    });
};

const detectFaces = async () => {
  const predictions = await model.estimateFaces(video, false);

  ctx.drawImage(video, 0, 0, 1000, 800);

  predictions.forEach((pred) => {
    ctx.beginPath();
    ctx.lineWidth = "4";
    ctx.strokeStyle = "blue";
    ctx.rect(
        pred.topLeft[0], 
        pred.topLeft[1],
        pred.bottomRight[0]-pred.topLeft[0],
        pred.bottomRight[1]-pred.topLeft[1]
  );
  ctx.stroke();

  ctx.fillStyle ='red';
  pred.landmarks.forEach((landmark)=>{
      ctx.fillRect(landmark[0],landmark[1],5,5)
  });
});
};

setup();
video.addEventListener("loadeddata", async () => {
  model = await blazeface.load();
  setInterval(detectFaces, 100);
});
