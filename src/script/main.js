
// Import All Components
import './components/index.js';

const home = () => {

    const popupForm = document.getElementById('popupContainer')
    const blurBody = document.getElementById('blur_bg');
    // Function to Toggle Form Popup
    const popup = () => {
        popupForm.style.visibility = 'visible';
        blurBody.style.filter = 'blur(2px)';
    };

    // Function to Close Form Popup
    const closePopup = () => {
        popupForm.style.visibility = 'hidden';
        blurBody.style.filter = 'none';
    }


    // Toggle Form Popup
    const addNoteBtn = document.getElementById('addNoteBtn');
    addNoteBtn.addEventListener('click',() => {
        popup();
    });

    // Close Form Popup
    const closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener('click',() => {
        closePopup();
    });



}

export default home;




