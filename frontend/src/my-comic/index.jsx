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
              downloadLink.download = 'component.png';
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
        <div ref={containerRef} style={{display: 'flex', flexWrap: 'wrap', marginLeft: '1%', marginRight: '%'}}>
            {
                selected.map((slide, index) => (
                    <img src={slide.src} alt="Broken" 
                    style={{
                        display: 'block',
                        maxWidth: '300px',
                       maxHeight: '200px',
                     height: 'auto',
                      marginLeft: '1%',
                      marginRight: '1%',
                     margin: '1%'
                     }}
                    />
                ))
            }
        </div>
            {
                selected.length > 0 ? 
                <form onSubmit={handleSubmit}>
                    <input type="submit" onClick={() => {wasClicked = 'remove'}} value = "Remove Last Image" />
                    <input type="submit" onClick={() => {wasClicked = 'download'}} value = "Download pdf" />
                </form>
                : "Empty Comic"
             }
        </>
    );

}