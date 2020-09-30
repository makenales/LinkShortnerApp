import React, { Component } from "react";
import LinkService from "../services/link.service";

export default class LinkGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            shortUrl: "",
            isUrlChanged: false
        };
    }

    onChangeUrl(e) {
        this.setState({
            url: e.target.value.trim(),
            isUrlChanged: true
        });
    }

    generateShortLink() {
        // only generate url when its value is changed
        if (this.state.isUrlChanged && this.isUrl(this.state.url)) {
            let data = { link: this.state.url };
            this.setState({
                isUrlChanged: false
            });
            LinkService.generateShortLink(data).then((res) => {
                this.setState({
                    shortUrl: res.data.link
                });
            }).catch((err) => {
                console.log("An error occured.");
            });
        }
    }

    isUrl(s) {
        var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regexp.test(s);
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
                { this.state.shortUrl !== "" && <h4>Here's your shortUrl</h4> }
                { this.state.shortUrl !== "" && <a href={this.state.shortUrl}><span>{this.state.shortUrl}</span></a>}
            </div>);
    }

}