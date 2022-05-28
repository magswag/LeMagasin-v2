class VareKomponent extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadow.innerHTML = `
            <style>
                #topp {
                    background-color: white;
                    border-radius: 24px;
                    display: flex;
                    flex-direction: column;
                }

                img {
                    width:100%;
                    aspect-ratio: 1;
                    object-fit: contain;
                    box-sizing: border-box;
                    padding:24px;
                }
                h2, h3, p {
                    margin: 0px;
                }
                .info {
                    padding: 16px;
                    padding-top: 0px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
            </style>
            <div id="topp">
                <img src="bilder/varer/${this.vare.bilde}.webp" alt="${this.vare.navn}">
                <div class="info">
                <h2>${this.vare.navn}</h2>
                    <p>${this.vare.beskrivelse}</p>
                    <button>${this.vare.pris.toString().replace(".", ",")} kr</button>
                </div>
            </div>
            `
    }
}

customElements.define("vare-komponent", VareKomponent)