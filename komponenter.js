function getAverageRGB(imgEl) {

    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = { r: 0, g: 0, b: 0 },
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch (e) {
        /* security error, img on diff domain */alert('x');
        return defaultRGB;
    }

    length = data.data.length;

    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);

    return rgb;

}


class NavigasjonKomponent extends HTMLElement {
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
                    <span class="material-icons md-24">${rute.ikon}</span>
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

                h1 {
                    margin: 0px;
                    font-family: serif;
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
                <h1>Le Magasin</h1>
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
                    background-color: rgb(225, 235, 225);
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
                    color: white;
                    background-color: rgb(0, 128, 0);
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
        //var rgb = getAverageRGB(this.shadowRoot.querySelector("img"))
        // this.rgb = rgb
        //  this.shadowRoot.querySelector("img").onload = () => {
        // this.shadowRoot.querySelector("#topp").style.backgroundColor = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';

        // }
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
                background-color: rgb(0, 128, 0);
                color: white;
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