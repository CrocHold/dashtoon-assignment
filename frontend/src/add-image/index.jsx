import React from 'react';


export default function AddImage({setSlides, slides, apiBusy, setApiBusy, pending, setPending, imageURL, setImageURL, description, setDescription}) {
    let wasClicked;
  
    async function query(data) {
        const response = await fetch(
            "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
            {
                headers: { 
                    "Accept": "image/png",
                    "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
                    "Content-Type": "application/json" 
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.blob();
        return result;
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(slides);
        const formData = new FormData(e.currentTarget);
        const fieldValues = Object.fromEntries(formData.entries());
        if (wasClicked === "new") {
            setApiBusy(true);
            query({"inputs": description}).then((response) => {
                console.log(response);
                setImageURL(URL.createObjectURL(response));
                setDescription(fieldValues.description);
                console.log(imageURL);
                setApiBusy(false);
                setPending(true);
            });
        }
        else if (wasClicked === "keep") {
            setPending(false);
            console.log(imageURL);
            console.log(description);
            setSlides([...slides, {
                "src": imageURL,
                "description": description,
            }]);
        }
        else {
            setPending(false);
            URL.revokeObjectURL(imageURL);
            if (wasClicked === "report") {
                // Send report to team
            }
        }
    }

  return (
    <div  style={{
            backgroundColor: '#ffeb99',
            padding: '10px',
        }}
    >
        {
        apiBusy ? "Getting Image..." :
             <form onSubmit = {handleSubmit}>
                {
                !pending ? 
                <div>
                    <input type="text" name = "description" placeholder='Describe Image' style={{marginBottom: '5px'}}/>
                    <br />
                    <input type="submit" name = "action1" onClick={() => {wasClicked = "new"}} value = "Get Image"/>
                </div> : 
                <div>
                    {/* handelling empty images ? */}
                    <img src = {imageURL} alt="Broken" 
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                display: 'block', // Ensures the image is treated as a block element
                                marginLeft: 'auto',
                                marginRight: 'auto', // Centers the image within its container
                              }}
                    />
                    <br />
                    <input type="submit" name = "action2" onClick={() => {wasClicked = "keep"}} value = "Keep"/>
                    <input type="submit" name = "action3" onClick={() => {wasClicked = "discard"}} value = "Discard"/>
                    <input type="submit" name = "action4" onClick={() => {wasClicked = "report"}} value = "Report" />
                </div>
                }
             </form>
         }
    </div>
  );
}
