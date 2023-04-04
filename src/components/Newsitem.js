import React from 'react'
import noimage from './no-image.png'

const Newsitem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date } = props;
    return (
        <div className='my-3'>
            <div className="card">
                <img src={imageUrl === null ? noimage : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-body-secondary">By {author === null ? 'Unknown' : author} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default Newsitem
