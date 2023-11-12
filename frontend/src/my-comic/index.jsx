import React, {useRef} from 'react';
import html2canvas from 'html2canvas';

export default function Gallery({selected, setSelected}) {
    const containerRef = useRef(null);
    let wasClicked;

    function handleSubmit(e) {
        e.preventDefault();
        if (wasClicked === 'remove') {
            setSelected(selected.slice(0, -1));
        }
        else {
            (async () => {
             html2canvas(containerRef.current)
             .then((canvas) => {
             const imgData = canvas.toDataURL('image/png');
             const downloadLink = document.createElement('a');
              downloadLink.href = imgData;
              downloadLink.download = 'MyComic.png';
              document.body.appendChild(downloadLink);
              downloadLink.click();
                document.body.removeChild(downloadLink);
                })
                .catch((error) => {
                   console.error('Error capturing component:', error);
               });

            })();
        }
    }
    return (
        <>
        <div ref={containerRef} style={{display: 'flex', flexWrap: 'wrap', marginLeft: '1%'}}>
            {
                selected.map((slide, index) => (
                    <img src={slide.src} alt="Broken" 
                    style={{
                        display: 'block',
                        maxWidth: '300px',
                       maxHeight: '200px',
                     height: 'auto',
                      marginRight: '10px',
                     margin: '1%'
                     }}
                    />
                ))
            }
        </div>
            {
                selected.length > 0 ? 
                <form onSubmit={handleSubmit}>
                    <input type="submit" onClick={() => {wasClicked = 'remove'}} value = "Remove Last Image" style={{marginRight : '1%'}}/>
                    <input type="submit" onClick={() => {wasClicked = 'download'}} value = "Download comic" />
                </form>
                : "Empty Comic"
             }
        </>
    );

}