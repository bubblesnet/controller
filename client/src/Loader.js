import React from 'react';

class Loader  extends React.Component {

    render() {
        console.log("render loader")
        return (
            <div className="loader center">
                <i className="fa fa-cog fa-spin"/>
            </div>
        );
    }
}

export default Loader;