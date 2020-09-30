import React, { Component } from "react";
import LinkService from "../services/link.service";

export default class Stats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
    }

    componentDidMount() {
        // get all shortlink stats by calling server api
        LinkService.getStats().then((res) => {
            this.setState({
                links: res.data
            });
        }).catch((err) => {
            console.log("An error occured while getting stats.");
        });
    }

    render() {
        // render link stats in ui
        return (
            <div>
                <h2>Analytics</h2>
                <br></br>
                {this.state.links.map(link => (<div>
                    <h5><b>{link.fullLink}</b></h5>
                    <h5><a href={link.shortLink}>{link.shortLink}</a></h5>
                    <br></br>
                    <span>Total hits: {link.hits}</span><br></br>
                    <span>Top languages: {link.languages}</span>
                    <hr></hr>
                    <br></br>
                </div>))}
            </div>);
    }

}