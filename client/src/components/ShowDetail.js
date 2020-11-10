import React from 'react';

const ShowDetail = (props) => {
    const { name, company, blog, location, bio } = props.details;
    return (
        <div className="center">
            <div className="loaded">Details Loaded</div>
            <div>
                <strong>Name: </strong>
                {name}
            </div>

            <div>
                <strong>Company: </strong>
                {company}
            </div>
            <div>
                <strong>Blog: </strong>
                {blog}
            </div>

            <div>
                <strong>Location: </strong>
                {location}
            </div>
            <div>
                <strong>Bio: </strong>
                {bio}
            </div>
        </div>
    );
};

export default ShowDetail;