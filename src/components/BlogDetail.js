import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import {getAllData} from '../myTools/FetchData';
import {removeHTMLTags} from '../myTools/Mixed'
import {capitalizeFirstLetter} from '../myTools/Mixed'

const BlogDetail = () => {
    const [blog, setBlog] = useState({});
    const {id} = useParams(); // Get the id from the link in the App.js file 
    
    // get the details of the blog 
    useEffect(() => {
        const env = process.env.REACT_APP_API_URL ;
        const rest_of_link = `/api/blog/${id}` ; // Rest of link we will be added after the link in .env
        getAllData(env, rest_of_link, setBlog)
    },[id]); 
    
    // To not show html tags of the content of summerNote field in the page of blog details  
    removeHTMLTags(blog.content); 

    return (
        <div className="container mt-3">
            <h1 className="display-2">{blog.title}</h1>
            <h2 className="text-muted mt-3">Category: {capitalizeFirstLetter(blog.category)}</h2>
            <h4>{blog.date}</h4>
            <div className="mt-5 mb-5" dangerouslySetInnerHTML={removeHTMLTags(blog.content)}/>
            <hr/>
            <p className="lead mb-5"><Link to = '/' className="font-weight-blog">Back to blogs</Link></p>
        </div>
    );
};

export default BlogDetail;
