# User's Guide

- [Link to Web-App](https://crochold.github.io/dashtoon-assignment/)
- Closing/ Reloading the page will result in data loss.
- Switch between the 2 tabs as needed, 'Image Generator' & 'My Comic'.
- 'Image Generator' tab won't accept new requests until the last one is completed.
- Keep : Adds the image to the gallery, Discard: Discards it, Report: Reports if the image is dissatisfactory.
- Use the gallery (slideshow) to browse through (slide/ use dots) the images. Add the current image to the end of the comic using 'Add this Image' button.
- Remove the last added image from the 'My Comic' tab if needed.
- Download the comic strip as .png, using 'Download Comic' in 'My Comic' tab.

# Developer's Guide

- run `npm start` to start the server locally.
- gallery, my-comic, add-image are the 3 components.
- gallery always stays mounted. my-comic & add-image can get unmounted, their state is inherited from the parent.

