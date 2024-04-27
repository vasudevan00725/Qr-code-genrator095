import React, { useState } from 'react'
import "./App.css"


export default function QrCode() {
    const [img,setImg]=useState("");
    const [loading,setLoading]=useState(false);
    const [qrData,setQrData]=useState("vasu");
    const [qrsize,setQrSize]=useState("150");
   
 async function genrateQr(){
    setLoading(true);
try {
    const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}*${qrsize}&data=${encodeURIComponent(qrData)}`;
    setImg(url)
} catch (error) {
    console.error("error in genrating qr code",error)
}finally{
    setLoading(false);
}
    }
    function downloadQr() {
        fetch(img)
        .then((response)=>response.blob())
        .then((blob)=>{
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download ="qrcode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        }).catch((error)=>console.error(error));
        
    }
  return (
    <div className='app-container'>
          <div> 
            <h3>QR Code Genrator Application</h3>
            {loading && <p>Please Wait....</p>}
          { img && <img className='qrcodeimg' src={img} alt='qr code'/>}
      
            <label  className='input-lable' htmlFor="dataInput"> Data for QR code:</label>
            <input type="text" value={qrData} id='dataInput' placeholder='Enter a data for QR code' onChange={(e)=>setQrData(e.target.value)}/>
            <label className='input-lable' htmlFor="dataInput">Image Size ..(eg,..150:)</label>
            <input type="text" value={qrsize}id='dataInput' placeholder='Enter a Image Size QR code' onChange={(e)=>setQrSize(e.target.value)} />
            <button className='button' disabled={loading} onClick={genrateQr}>Generate QR Code</button>
            <button className='button'onClick={downloadQr}>Download QR Code</button>
            <h3>Designed by Vasu</h3>
        </div>
    </div>
  )
}
