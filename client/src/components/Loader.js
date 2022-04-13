import React from 'react';

// copyright and license inspection - no issues 4/13/22


class Loader  extends React.Component {

    render() {
 //       console.log("render loader")
        return (
            <div className="loader center">
                <i className="fa fa-cog fa-spin"/>
            </div>
        );
    }
}

export default Loader;