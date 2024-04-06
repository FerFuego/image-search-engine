import {api_url, api_key} from '../vars.js';

class api_pixabay {

    constructor() {
        this.api_url = api_url;
        this.api_key = api_key;
        this.url = `${this.api_url}?key=${this.api_key}&q=`;
    }

    async getData(term, page = 1) {
        try {
            const response = await fetch(`${this.url}${term}&page=${page}&image_type=photo&pretty=true&per_page=100`);
            const result   = await response.json();
            return result;
        } catch (error) {
           return error;
        }
    }

}

export default api_pixabay;   