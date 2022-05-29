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
            rute: "/",
            tekst: "Hjem"
        },
        {
            rute: "/varer.html",
            tekst: "Varer"
        },
        {
            rute: "/varer.html",
            tekst: "Profil"
        }
    ]) {
        super()
        this.shadow = this.attachShadow({ mode: 'open' });
        this.ruter = ruter
    }

    nummere() {
        let yeh = ""

        this.ruter.forEach((rute) => {
            yeh += `
                <a href="${rute.rute}">${rute.tekst}</a>
            `
        })

        return yeh
    }

    connectedCallback() {
        this.shadow.innerHTML = `
            <style>
                .topp {
                    background-color: white;
                    display: flex;
                    justify-content: space-around;
                    padding: 16px;
                    position:fixed;
                    width: 100%;
                    box-sizing: border-box;
                    bottom:0;
                    z-index: 999;
                }
            </style>
            <div class="topp">${this.nummere()}</div>
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
        //var rgb = getAverageRGB(this.shadowRoot.querySelector("img"))
       // this.rgb = rgb
      //  this.shadowRoot.querySelector("img").onload = () => {
           // this.shadowRoot.querySelector("#topp").style.backgroundColor = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';

       // }
    }
}

customElements.define("vare-komponent", VareKomponent)