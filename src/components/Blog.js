import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import {getFirsthData, getAllData} from '../myTools/FetchData'
import {capitalizeFirstLetter} from '../myTools/Mixed'

const Blog = () => {

    const [blogs, setBlogs] = useState([]);
    const [featuredBlog, setFeaturedBlog] = useState([]);
    
    // Get the first blog of the table of blogs (last blog) to show it on the top of the Home page 
    useEffect(() => { 
        const env = process.env.REACT_APP_API_URL ;
        const rest_of_link = '/api/blog/featured' ; // Rest of link we will add after the link in .env
        getFirsthData(env, rest_of_link, setFeaturedBlog);
    },[] );

    // Get all the blogs to show them in the Home page
    useEffect(() => {
        const env = process.env.REACT_APP_API_URL ;
        const rest_of_link = `/api/blog/`;
        getAllData(env, rest_of_link, setBlogs);
    }, []);
    
    // Get all blogs 
    const getBlogs = () => {
        let list = [];
        let result = [];                      

        blogs.map(blogPost => {
            return list.push(
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">{capitalizeFirstLetter(blogPost.category)}</strong>
                        <h3 className="mb-0">{blogPost.title}</h3>
                        <div className="mb-1 text-muted">{blogPost.month} {blogPost.day}</div>
                        <p className="card-text mb-auto">{blogPost.excerpt}</p>
                        <Link to={`/blog/${blogPost.slug}`} className="stretched-link">Continue reading</Link>
                    </div>
                    <div className="col-auto d-none d-lg-block"></div>
                    <img src={blogPost.thumbnail} width="200" height="250" alt="Thumbnail"></img>
                </div>
            );
        });
        
        for (let i = 0 ; i < list.length ; i += 2)
        result.push(
            <div key={i} className='row mb-2'>
                <div className="col-md-6">
                    {list[i]}
                </div>
                <div className="col-md-6">
                    {list[i+1] ? list[i+1] : null}
                </div>
            </div>
        )
        return result;
    };

    return (
    
        <div className="container mt-3">
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav nav-tabs justify-content-center ">
                    <Link className="nav-link active " to='/category/technology'>Technology</Link> 
                    <Link className="nav-link active " to='/category/business'>Business</Link>
                </nav>
            </div>
            <div className="p-4 p-md-5 mb-4 text-white rounded bg-dark">
                <div className="col-md-6 px-0">
                    <h1 className="display-4 font-italic">{featuredBlog.title}</h1>
                    <p className="lead my-3">{featuredBlog.excerpt}</p>
                    <p className="lead mb-0">
                        <Link to = {`/blog/${featuredBlog.slug}`} className="text-white fw-bold">
                        Continue reading... 
                        </Link></p>
                </div>
            </div>
            {getBlogs()}
        </div>
    );
};
export default Blog;
