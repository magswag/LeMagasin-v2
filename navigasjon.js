
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
                }
            </style>
            <div class="topp">${this.nummere()}</div>
        `
    }
}

customElements.define('navigasjon-komponent', NavigasjonKomponent);