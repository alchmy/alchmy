import { Element as PolymerElement } from "@polymer/polymer/polymer-element"
import * as template_string from "./component_assets/article-detail.html"

export class ArticleDetail extends PolymerElement {
	static get observers(){}
	static get template() {
            return template_string
	}
	static get properties() {
	    return {
	        name: String
	    }
	}
}

customElements.define("article-detail", ArticleDetail)
