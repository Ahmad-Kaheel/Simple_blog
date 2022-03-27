import React, { useState, useEffect, } from "react";
import { Link, useParams } from "react-router-dom";
import {capitalizeFirstLetter} from '../myTools/Mixed';
import axios from "axios";

const Category = () => {
    const [blog, setBlogs] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('');
    const {category} = useParams(); 

    useEffect(() => {
        setCurrentCategory(capitalizeFirstLetter(category));
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        };
        const fetchData = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/blog/category`, {category}, config);
                setBlogs(res.data);
            } catch (err) {
                
            }
        };
        fetchData();
    },[category]);
    
    const getCategoryBlogs = () => {
            let list = [];
            let result = [];                      
    
            blog.map((blogPost) => {
                return list.push(
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static">
                            <strong className="d-inline-block mb-2 text-primary">{capitalizeFirstLetter(blogPost.category)}</strong>
                            <h3 className="mb-0">{blogPost.title}</h3>
                            <div className="mb-1 text-muted">{blogPost.date}</div>
                            <p className="card-text mb-auto">{blogPost.excerpt}</p>
                            <Link to={blogPost.slug} className="stretched-link">Continue reading</Link>
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
    return(
    <div className="container mt-3">
        <h3 className="display-4"> {currentCategory} Category </h3>
        <div className="nav-scroller py-1 mb-2 " >
            <nav className="nav nav-tabs justify-content-center">
                <li class="nav-item">
                    <Link className="nav-link active" to='/category/technology'>Technology</Link> 
                </li>
                <li class="nav-item" >
                    <Link className="nav-link active" to='/category/business'>Business</Link>
                </li>
            </nav>
        </div>
        {getCategoryBlogs()}
        </div> 
    );
};

export default Category;
