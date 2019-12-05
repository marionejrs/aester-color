import React, { useRef, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Vibrant from 'node-vibrant';
import PaletteDisplay from './components/PaletteDisplay';
import { Palette } from 'node-vibrant/lib/color';
import html2canvas from 'html2canvas';

const App: React.FC = () => {
  let imageRef = useRef<HTMLImageElement>(null);
  let productImageRef = useRef<HTMLDivElement>(null);
  let [allowDownload, setAllowDownload] = useState<boolean>(false);
  let [ aspectRatio, setAspectRatio ] = useState<number>(1);
  let [ currentPalette, setCurrentPalette ] = useState<Palette>(null);

  let onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;
    console.log(files && files[0]);
    if (files && files.length > 0) {
      let fr = new FileReader();
      fr.onload = function() {
        if (imageRef && imageRef.current) {
          let data = fr.result as string;
          let currentImg = imageRef.current;
          currentImg.src = data;
          currentImg.onload = (e : Event) => {
            console.log("TEST")
            setAspectRatio(currentImg.naturalWidth / currentImg.naturalHeight);
            Vibrant.from(data).getPalette((err, palette) => {
              console.log(palette);
              setCurrentPalette(palette);
              setAllowDownload(true);
            });
          };          
        }
      }
      fr.readAsDataURL(files[0]);
    }
    else {
      setAllowDownload(false);
    }
  }
  
  let doDownload = () => {
    html2canvas(productImageRef.current).then((canvas : HTMLCanvasElement) => {
      let image = canvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");
      let link = document.createElement('a');
      link.download = "adsadasdasd.jpg";
      link.href = image;
      link.click();
    })
  }
  
  return (
    <div className="App">
      <div className='product-image' ref={productImageRef}>
        {/* <img ref={imageRef} style={{ height : '300px', width : `${300 * aspectRatio}px` }}></img> */}
        <img ref={imageRef} style={{ height : `${400 / aspectRatio}px`, width : `400px` }}></img>
        <PaletteDisplay palette={currentPalette}></PaletteDisplay>
      </div>
      <input type="file" accept="image/*" onChange={onChange}></input>
      <h6>Aspect Ratio: {aspectRatio}</h6>
      {allowDownload && <button onClick={doDownload}>Download</button> }
    </div>
  );
}

export default App;
