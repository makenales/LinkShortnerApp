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
        LinkService.getStats().then((res) => {
            this.setState({
                links: res.data
            });
        }).catch((err) => {
            console.log("An error occured.");
        });
    }

    render() {
        return (
            <div>
                <h2>Analytics</h2>
                <br></br>
                {this.state.links.map(link => (<div>
                    <h5><b>{link.fullLink}</b></h5>
                    <h5>{link.shortLink}</h5>
                    <br></br>
                    <span>Total hits: {link.hits}</span><br></br>
                    <span>Top countries: America</span>
                    <hr></hr>
                    <br></br>
                </div>))}
            </div>);
    }

}