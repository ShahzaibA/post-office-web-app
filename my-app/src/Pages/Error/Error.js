import React, { Component } from 'react';

class Error extends Component {
    render() {
        return (
            <div>
                    <Page style = {{maxWidth="30%"}}>
                        <h1>ERROR 404</h1>
                    <p>We could not find the page you were looking for. Please use the navbar to navigate the website.</p>

                </Page>
                
            </div>
        );
    }
}
export default Error;