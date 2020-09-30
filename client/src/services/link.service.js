import axios from "../axios";

class LinkService {
    generateShortLink(data) {
        return axios.post("/generate", data);
    }

    get(id) {
        return axios.get(`/tutorials/${id}`);
    }

    create(data) {
        return axios.post("/tutorials", data);
    }

}

export default new LinkService();