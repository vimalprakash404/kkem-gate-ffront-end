import React, { Component } from "react";
import Img from  "../../assets/header.png" ;

class NavBar extends Component {

    render() {
        return (
            <div>
                <nav className="navbar  bg-white" >
                    <div className="container-fluid">
                        <div className="container">
                            <div className="navbar-brand" >
                                <img src={Img} alt="Bootstrap" width={this.props.width} height={this.props.height} />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar;