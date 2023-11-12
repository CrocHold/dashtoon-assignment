import React, {useState} from 'react';
import './App.css';
import Gallery from './gallery';
import MyComic from './my-comic';
import AddImage from './add-image';

function App() {
  const [add, setAdd] = useState(false);
  const [slides, setSlides] = useState([]);
  const [selected, setSelected] = useState([]);

  const [apiBusy, setApiBusy] = useState(false);
  const [pending, setPending] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="App">
      <h2>Make My Comic</h2>
      <Gallery slides = {slides} setSelected = {setSelected} selected={selected}/>
      <br />
      <div>
      <button onClick={() => setAdd(true)}> Image Generator </button>
      <button onClick={() => setAdd(false)}> My Comic </button>
      </div>
      <div style = {{marginTop: '10px', marginBottom: '10px'}}>
      {add ? <AddImage
       setSlides={setSlides} 
       slides={slides} 
       apiBusy={apiBusy}
       setApiBusy={setApiBusy}
       pending={pending}
       setPending={setPending}
       imageURL={imageURL}
       setImageURL={setImageURL}
       description={description}
       setDescription={setDescription}
       
       /> : <MyComic selected = {selected} setSelected = {setSelected}/>}
       </div>
    </div>
  );
}

export default App;
