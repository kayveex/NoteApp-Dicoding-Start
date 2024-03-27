import Utils from "../Utils.js";
import {
    getAllNotes,
    deleteNote
} from '../data/local/notes-data.js';

class _NyatetList extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    _column = 3;

    static get observedAttributes() {
        return ['column'];
    }

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });

        this.render();
    }

    set _column(value) {
        const newValue = Number(value);
        if (!Utils.isValidInteger(newValue)) {
            throw new Error('column must be a number');
        }

        this._column = value;
    }

    get column() {
        return this._column;
    }

    emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    render() {
        this.emptyContent();
        this.updateStyle();

        const container = document.createElement('div');
        container.className = 'wrap_list';

        getAllNotes().forEach(note => {
            container.innerHTML += `
                <article class="note_item" data-note-id="${note.id}">
                    <h2>${note.title}</h2>
                    <hr>
                    <p>${note.body.replace(/\n/g, "<br>")}</p>
                    <button class="deleteNoteBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M9.93103 2.64828H13.2414V3.97241H11.9172V12.5793C11.9172 12.945 11.6208 13.2414 11.2552 13.2414H1.98621C1.62056 13.2414 1.32414 12.945 1.32414 12.5793V3.97241H0V2.64828H3.31034V0.662069C3.31034 0.296422 3.60677 0 3.97241 0H9.26897C9.63463 0 9.93103 0.296422 9.93103 0.662069V2.64828ZM10.5931 3.97241H2.64828V11.9172H10.5931V3.97241ZM4.63448 1.32414V2.64828H8.6069V1.32414H4.63448Z" fill="white"/>
                        </svg>
                    </button>
                </article>
            `;
        });

        container.querySelectorAll('.deleteNoteBtn').forEach(button => {
            button.addEventListener('click', () => {
                const noteId = button.closest('.note_item').dataset.noteId;
                window.alert('Apakah Anda yakin ingin menghapus note ini?');
                deleteNote(noteId);
                this.render();
            });
        });

        this._shadowRoot.appendChild(container);
    }

    // Untuk render hasil searching
    renderNotes(note) {
        const container = document.createElement('div');
        container.className = 'wrap_list';

        container.innerHTML += `
        <article class="note_item" data-note-id="${note.id}">
            <h2>${note.title}</h2>
            <hr>
            <p>${note.body.replace(/\n/g, "<br>")}</p>
            <button class="deleteNoteBtn">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9.93103 2.64828H13.2414V3.97241H11.9172V12.5793C11.9172 12.945 11.6208 13.2414 11.2552 13.2414H1.98621C1.62056 13.2414 1.32414 12.945 1.32414 12.5793V3.97241H0V2.64828H3.31034V0.662069C3.31034 0.296422 3.60677 0 3.97241 0H9.26897C9.63463 0 9.93103 0.296422 9.93103 0.662069V2.64828ZM10.5931 3.97241H2.64828V11.9172H10.5931V3.97241ZM4.63448 1.32414V2.64828H8.6069V1.32414H4.63448Z" fill="white"/>
                </svg>
            </button>
        </article>
        `;
        this._shadowRoot.appendChild(container);
    }

    updateStyle() {
        const styleElement = document.createElement('style');

        styleElement.textContent = `

                .wrap_list {
                    display: grid;
                    grid-template-columns: repeat(${this._column}, minmax(300px, 1fr));
                    grid-template-rows: repeat(auto-fit, 300px);
                    gap: 50px 78px;
                    justify-content: center;
                    align-items: center;
                    margin-top: 50px;
                    margin-bottom: 100px;
                }

                @media screen and (min-width: 480px) and (max-width: 1024px) {
                    .wrap_list {
                        grid-template-columns: repeat(1, minmax(300px, 1fr));
                    }
                }

                .note_item {
                    width: 300px;
                    height: 300px;
                    background-color: var(--purple-main);
                    border-radius: 5px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                
                
                .note_item > hr {
                    border: 1px solid var(--neutral-white);
                    width: 78%;
                    margin-top: 0;
                    margin-bottom: 0;
                
                }
                
                .note_item > h2 {
                    color: var(--neutral-white);
                    font-size: 14px;
                    text-align: center;
                    padding-left: 2rem;
                    padding-right: 2rem;
                    padding-top: 1rem;
                }
                
                .note_item > p {
                    color: var(--neutral-white);
                    font-size: 12px;
                    text-align:justify;
                    padding-left: 2rem;
                    padding-right: 2rem;
                    height: 140px;
                }
                
                
                .deleteNoteBtn {
                    width: 45px;
                    height: 39px;
                    background-color: var(--danger);
                    border-radius: 15px;
                    border: none;
                    cursor: pointer;
                    justify-content: center;
                }
                
                .deleteNoteBtn:hover {
                    transform: scale(1.1);
                }
        `;
        this._shadowRoot.appendChild(styleElement);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'column':
                this._column = newValue;
                break;
        }
        this.render();
    }

}

// // Menjalankan form Searching
// const searchForm = document.getElementById('search_bar');
// const searchTitle = document.getElementById('searchNoteTitle');
// const searchBtn = document.getElementById('searchNoteBtn');

// searchForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const searchValue = searchTitle.value;
//     const nyatetList = document.querySelector('nyatet-list');

//     nyatetList.emptyContent();
//     nyatetList.updateStyle();

//     getAllNotes().forEach(note => {
//         if (note.title.toLowerCase().includes(searchValue)) {
//             nyatetList.renderNotes(note);
//         }
//     })
// });


customElements.define('nyatet-list', _NyatetList);