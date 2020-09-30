import axios from "../axios";

class LinkService {

    // call server api to generate shortlink from given url
    generateShortLink(data) {
        return axios.post("/generate", data);
    }

    // call server api get stats for all shortlinks generated using our application
    getStats() {
        return axios.get("/stats");
    }

}

export default new LinkService();