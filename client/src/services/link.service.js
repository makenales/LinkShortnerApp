import axios from "../axios";

class LinkService {
    generateShortLink(data) {
        return axios.post("/generate", data);
    }

    getStats() {
        return axios.get("/stats");
    }

}

export default new LinkService();