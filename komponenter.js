class NavigasjonKomponent extends HTMLElement {

    get tilbakeRute() {
        return this.getAttribute("tilbake")
    }

    constructor(ruter = [
        {
            rute: "index.html",
            tekst: "Hjem",
            ikon: "home"
        },
        {
            rute: "varer.html",
            tekst: "Varer",
            ikon: "store"
        },
        {
            rute: "varer.html",
            tekst: "Profil",
            ikon: "person"
        }
    ]) {
        super()
        this.shadow = this.attachShadow({ mode: 'open' });
        this.ruter = ruter
    }

    nummere() {
        let yeh = ""

        this.ruter.forEach(rute => {
            yeh += `
                <a href="${rute.rute}">
                    <span class="material-icons">${rute.ikon}</span>
                    ${rute.tekst}
                </a>
                
            `
        })

        return yeh
    }

    linker() {
        let yeh = ""

        this.ruter.forEach(rute => {
            yeh += `
                <li><a href="${rute.rute}">${rute.tekst}</a></li>
            `
        })

        return yeh
    }

    connectedCallback() {
        this.shadow.innerHTML = `
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <style>
                .topp {
                    background-color: rgba(255, 255, 255, 0.75);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    display: flex;
                    justify-content: space-around;
                    padding: 8px;
                    position:fixed;
                    width: 100%;
                    box-sizing: border-box;
                    bottom:0;
                    z-index: 999;
                }

                a {
                    font-family: sans-serif;
                    color: black;
                    display:flex;
                    gap: 0px;
                    flex-direction: column;
                    align-items: center;
                    text-decoration: none;
                }

                header {
                    width: 100%;
                    box-sizing: border-box;
                    padding: 16px;
                    background-color: lightgreen;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;              
                }

                ul {
                    list-style-type: none;
                    margin: 0;
                    padding: 0;
                    display: none;
                }

                li {
                    font-size: 1.25rem;
                    float: left;
                    border-radius: 512px;
                    padding: 16px;
                }

                li:hover {
                    background-color: red;
                 
                }

                .venstre {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    flex-direction:row
                }

                @media only screen and (min-width:1025px) {
                    .mobil {
                        display: none;
                    }
        
                    .pc {
                        display: block;
                    }
                }
            </style>
            <header>
                <div class="venstre">
                    ${this.tilbakeRute ?
                `<a class="material-icons" href="${this.tilbakeRute}">arrow_back</a>` : ``
            }
                    
                    <slot name="tittel">
                        <h1>Le Magasin</h1>
                    </slot>
                </div>
                <ul class="pc">
                    ${this.linker()}
                </ul>
            </header>

            <div class="topp mobil">${this.nummere()}</div>
        `
    }
}

customElements.define('navigasjon-komponent', NavigasjonKomponent);

class VareKomponent extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadow.innerHTML = `
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <style>
                #topp {
                    background-color: var(--farge-overflate);
                    color: var(--farge-tekst-overflate);
                    border-radius: 36px;
                    display: flex;
                    height: 100%;
                    flex-direction: column;
                }

                img {
                    width:100%;
                    aspect-ratio: 1;
                    object-fit: contain;
                    box-sizing: border-box;
                    padding:24px;
                    padding-bottom: 8px;
                }
                h2, h3, p {
                    margin: 0px;
                    font-family: sans-serif;               
                }
                .info {
                    height: 100%;
                    padding: 24px;
                    padding-top: 0px;
                    padding-bottom: 0px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                #aa {
                    margin: 16px;
                    margin-top: 8px;
                    align-self: flex-end;
                }

                button {
                    color: var(--farge-tekst-knapp);
                    background-color: var(--farge-knapp);
                    height: 48px;
                    padding: 16px;
                    border-radius: 100px;
                    border: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    cursor: pointer;
                }
                
            </style>
            <div id="topp">
                <img draggable="false" src="bilder/varer/${this.vare.bilde}.webp" alt="${this.vare.navn}">
                <div class="info">
                    <h3>${this.vare.navn}</h3>
                    <p>${this.vare.beskrivelse}</p>
                </div>
                <div id="aa">
                    <button>
                        ${this.vare.pris.toLocaleString("nb-NO", { style: "currency", currency: "NOK" })}
                        <span class="material-icons md-24">add_shopping_cart</span>
                    </button>
                </div>
            </div>
            `

        this.shadowRoot.querySelectorAll("button").forEach(knapp => {
            knapp.addEventListener("click", ev => {
                this.dispatchEvent(new CustomEvent("lagtTilIVogn", { bubbles: true, cancelable: false, composed: true }))
            })
        })
    }
}

customElements.define("vare-komponent", VareKomponent)

class KategoriListe extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadow.innerHTML = `
            <style>
                li {
                    list-style-type: none;
                }
            </style>
            <ul>
                <slot></slot>
            </ul>
        `
    }
}

customElements.define("kategori-liste", KategoriListe)

class FAB extends HTMLElement {
    get mengde() {
        return this.getAttribute("mengde")
    }

    set mengde(ny) {
        this.setAttribute("mengde", ny)
    }

    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() { return ["mengde"] }

    attributeChangedCallback(n, ov, ny) {
        if (ov != ny) {
            this.tegn()
        }
    }

    connectedCallback() {
        this.tegn()

    }

    tegn() {
        this.shadow.innerHTML = `
        <style>
            a {
                background-color: var(--farge-knapp);
                color: var(--farge-tekst-knapp);
                padding: 24px;
                border-radius: 24px;
                border: none;
                display: inline-flex;
                align-items: center;
                gap: 4px;
                cursor: pointer;
                position: fixed;
                right: 16px;
                bottom: 72px;
                z-index: 9999;
                box-shadow: 0px 3px 8px rgba(0,0,0,0.65);
                text-decoration: none;
                font-family: sans-serif;
            }

            .badge {
                font-size: 18px;
                background-color: red;
                border-radius: 50%;
                color: white;
                width: 32px;
                aspect-ratio: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                right: -8px;
                top: -8px;
            }
        </style>
        <a href="handlevogn.html">
            <slot></slot>
            <span class="badge">${this.mengde}</span>
        </a>
    `
    }
}

customElements.define("fab-komponent", FAB)

class MengdeKomponent extends HTMLElement {
    get verdi() {
        return this.getAttribute("verdi") || 0
    }
    
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
    }

    decrement() {
        console.log("ll")
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    display: inline-flex;
                    gap: 4px;
                }

                button {
                    user-select: none;
                    font-size: 24px;
                    border-radius: 128px;
                    width:36px;
                    height:36px;
                    border: none;
                    color: var(--farge-tekst-knapp);
                    background: var(--farge-knapp);
                    cursor: pointer;
                }

                button:hover {
                    box-shadow: 0px 3px 8px rgba(0,0,0,0.5);
                }

                input {
                    width: 2em;
                }
            </style>
            <div>
                <button id="senk">-</button>
                <input type="number" min="1" max="999" value="${this.verdi}"/>
                <button id="øk">+</button>
            </div>
        `
        const input = this.shadowRoot.querySelector("input")
        this.shadowRoot.getElementById("senk").addEventListener("click", e => {
            input.stepDown()
            this.dispatchEvent(new CustomEvent("senka", { bubbles: true, cancelable: false, composed: true }))
        })

        this.shadowRoot.getElementById("øk").addEventListener("click", e => {
            input.stepUp()
            this.dispatchEvent(new CustomEvent("økt", { bubbles: true, cancelable: false, composed: true }))
        })
    }
}

customElements.define("mengde-komponent", MengdeKomponent)