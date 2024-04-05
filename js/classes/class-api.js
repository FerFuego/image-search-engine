import {api_url, api_key} from '../vars.js';

class api_pixabay {

    constructor() {
        this.api_url = api_url;
        this.api_key = api_key;
        this.url = `${this.api_url}?key=${this.api_key}&q=`;
    }

    getData(term, page = 1) {
        return fetch(`${this.url}${term}&page=${page}&image_type=photo&pretty=true&per_page=100`)
            .then(response => response.json())
            .then(result => result)
            .catch(error => console.log(error))
    }
}

export default api_pixabay;   