class _NyatetHeader extends HTMLElement {

    static get observedAttributes() {
        return ['logoUrl', 'altImg'];
    }


    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode: 'open'});
        this._style = document.createElement('style');
    }

    connectedCallback() {
        this.render();
    }

    set logoUrl(value) {
        const hasChange = this.logoUrl !== value;
        if(hasChange) {
            this.removeAttribute('logoUrl');
        }

        this.setAttribute('logoUrl', value);
    }

    get logoUrl() {
        const value = this.getAttribute('logoUrl');
        return value;
    }

    set altImg(value) {
        const hasChange = this.altImg !== value;
        if(hasChange) {
            this.removeAttribute('altImg');
        }

        this.setAttribute('altImg', value);
    }

    get altImg() {
        const value = this.getAttribute('altImg');
        return value;
    }

    updateStyle() {
        this._style.textContent = `

        header {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--dark-secondary);
            width: 100%;
            height: 100px;
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
            <header>
                <img src="${this.logoUrl}" alt="${this.altImg}">
            </header>
        `;
    }
}

customElements.define('nyatet-header', _NyatetHeader);
