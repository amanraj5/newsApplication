import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    // document.title = `${capitalizeFirstletter(props.category)}-News`

    const capitalizeFirstletter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&sortBy=popularity&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        props.setProgress(50)
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(()=>{
        updateNews();
        // eslint-disable-next-line
    },[])
    
    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&sortBy=popularity&apiKey=7439cda4fd1b4d2eaa87c10b7ec2136c&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        
    };

    return (
        <>
            <h1 className={`text-center text-${props.mode === 'light' ? 'dark' : 'light'}`}>News-Feed from {capitalizeFirstletter(props.category)}</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 50) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

        </>
    )
}
News.defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'sports',
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News
