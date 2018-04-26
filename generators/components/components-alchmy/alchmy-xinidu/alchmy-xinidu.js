import { PolymerElement } from "@polymer/polymer/polymer-element"
import * as template_string from "./alchmy-xinidu.html"

export class AlchmyXinidu extends PolymerElement {
    static get observers(){}
    constructor(){
        super()
        this.name="AlchmyXinidu"
    }
    static get template() {
        return template_string
    }
    static get properties() {
        return {
            name: String
        }
    }
}

customElements.define("alchmy-xinidu", AlchmyXinidu)
