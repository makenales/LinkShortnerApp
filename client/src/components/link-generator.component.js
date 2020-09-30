import React, { Component } from "react";
import LinkService from "../services/link.service";

export default class LinkGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            isUrlChanged: false
        };
    }
    onChangeUrl(e) {
        this.setState({
            url: e.target.value,
            isUrlChanged: true
        });
    }
    generateShortLink() {
        // only generate url when its value is changed
        if (this.state.isUrlChanged && this.state.url.trim() !== "") {
            let data = { link: this.state.url };
            this.setState({
                isUrlChanged: false
            });
            LinkService.generateShortLink(data).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log("An error occured while syncing with database. Please check values in dbConfig.json file.");
            });
        }
    }
    render() {
        return (
            <div>
                <h3>Welcome to LinkShortner App!</h3>
                <div className="form-group">
                    <label htmlFor="title">Please enter your URL here</label>
                    <div className="form-row">
                        <div className="col-10">
                            <input
                                type="url"
                                className="form-control"
                                id="url"
                                onChange={(e) => this.onChangeUrl(e)}
                                name="url"
                            />
                        </div>
                        <div className="col-2">
                            <input
                                type="button"
                                onClick={() => this.generateShortLink()}
                                className="btn btn-success"
                                value="Submit"
                            />
                        </div>
                    </div>
                </div>
            </div>);
    }
}