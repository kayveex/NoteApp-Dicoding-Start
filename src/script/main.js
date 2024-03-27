// Import All Components
import './components/index.js';
import {
    getAllNotes,
    addNote,
    deleteNote
} from './data/local/notes-data.js';

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
    addNoteBtn.addEventListener('click', () => {
        popup();
    });

    // Close Form Popup
    const closeBtn = document.getElementById('closeBtn');
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closePopup();
        errorTitle.style.display = 'none';
        errorBody.style.display = 'none';

        titleInput.value = '';
        bodyInput.value = '';
    });

    // Form Section - Popup Form
    const titleInput = document.getElementById('titleInput');
    const bodyInput = document.getElementById('bodyInput');
    const errorTitle = document.getElementById('error_title');
    const errorBody = document.getElementById('error_body');

    popupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (titleInput.value.trim() === '' && bodyInput.value.trim() === '') {
            errorTitle.textContent = 'Dimohon untuk tidak mengosongkan semua!';
            errorTitle.style.display = 'block';
            return;
        }

        if (titleInput.value.trim() === '') {
            errorTitle.textContent = 'Dimohon untuk tidak mengosongkan judul!';
            errorTitle.style.display = 'block';
            return;
        }

        if (titleInput.value.length < 3) {
            errorTitle.textContent = 'Judul minimal 3 karakter!';
            errorTitle.style.display = 'block';
            return;
        }

        if (bodyInput.value.trim() === '') {
            errorBody.textContent = 'Dimohon untuk tidak mengosongkan isi note!';
            errorBody.style.display = 'block';
            return;
        }

        if (titleInput && bodyInput) {
            const newNote = {
                id: `notes-${Math.random().toString(36).substr(2, 9)}`,
                title: titleInput.value,
                body: bodyInput.value.replace(/\n/g, "<br>"),
                createdAt: new Date().toISOString(),
                archived: false,
            };
            addNote(newNote); //Menambah data baru
            closePopup(); //Menutup Popup Form

            // Render Ulang List Note
            const nyatetList = document.querySelector('nyatet-list');
            nyatetList.render();

            // Reset Form
            titleInput.value = '';
            bodyInput.value = '';
        }

    });

    // Menjalankan form Searching
    const searchForm = document.getElementById('search_bar');
    const searchTitle = document.getElementById('searchNoteTitle');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchValue = searchTitle.value.toLowerCase().trim();
        const nyatetList = document.querySelector('nyatet-list');

        nyatetList.emptyContent();
        nyatetList.updateStyle();

        if (searchValue) {
            getAllNotes().forEach(note => {
                const noteTitleLower = note.title.toLowerCase();
                if (noteTitleLower.includes(searchValue)) {
                    nyatetList.renderNotes(note);
                }
            });    
        }else  {
            nyatetList.render();
        }

    });
}

export default home;