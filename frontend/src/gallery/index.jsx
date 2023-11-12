import React, { useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


export default function Gallery({slides, selected, setSelected}) {
  const [current, setCurrent] = useState(0);

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => {
      setCurrent(index);
    },
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(selected);
    setSelected([...selected, slides[current]]);
  }

return (
  <div style={{
    backgroundColor: '#ffffcc',
    padding: '10px',
  }}>
    {
      slides.length > 0 ?
      <Slider {...settings}>
      {
        slides.map((slide, index) => (
          <div key = {index}>
            <img src = {slide.src} alt = "Broken" 
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'block', // Ensures the image is treated as a block element
                    marginLeft: 'auto',
                    marginRight: 'auto', // Centers the image within its container
                  }}
                  />
            <p>{slide.description}</p>
          </div>
        ))
      }
      </Slider>
      : <h4>No Images {":("}</h4>
    }
    <br />
    {
      slides.length > 0 ?
      <form onSubmit={handleSubmit}>
        <input type="submit" value = "Add This Image"/>
      </form>
      : null
    }
  </div>
);

}