class _NyatetFooter extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._style = document.createElement('style');
    }

    connectedCallback() {
        this.render();
    }

    updateStyle() {
        this._style.textContent = `
        footer {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--dark-secondary);
            width: 100%;
            height: 75px;
            color: white;
            font-size: 12px;
            font-weight: bold;
        }

        `;
    }

    emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    render() {
        this.emptyContent();
        this.updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
            <footer>
                <p>&copy; 2024 Nyatet - Created By Kayveex</p>
            </footer>
        `;

    }
}

customElements.define('nyatet-footer', _NyatetFooter);