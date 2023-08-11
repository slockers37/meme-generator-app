import React from "react";
import { fabric } from "fabric";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = React.useState([]);

  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function handleDownload() {
    const canvas = new fabric.StaticCanvas();
    const imgElement = document.getElementById("meme");
    const imgInstance = new fabric.Image(imgElement, { left: 0, top: 0 });
    const text = new fabric.Text(meme.topText, { left: 10, top: 10 });

    canvas.add(imgInstance);
    canvas.add(text);

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "meme.png";
    link.click();
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img id="meme" src={meme.randomImage} className="meme--image" />
        {/* <img src={meme.randomImage} className="meme--image" /> */}
        <h2 className="meme--text top">{meme.topText}</h2>
        {/* <h2 className="meme--text bottom">{meme.bottomText}</h2> */}
        <button onClick={handleDownload} className="form--button">
          Download Meme
        </button>
      </div>
    </main>
  );
}
