import React from 'react';

export default class Home extends React.Component {
    render() {
        return (
            <div className="content" style={{ textAlign: "center" }}>
                <h1>React Test Application</h1>
                <a href="./cart">Cart</a>
            </div>
        );
    }
}
