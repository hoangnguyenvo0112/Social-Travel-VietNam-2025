import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPost } from '../../redux/actions/postAction'
import LoadIcon from '../../images/loading.gif'
import PostCard from '../../components/PostCard'
import Loading from '@/components/Loading'


const Post = () => {
    const { id } = useParams()
    const [post, setPost] = useState([])

    const { auth, detailPost } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPost({detailPost, id, auth}))

        if(detailPost.length > 0){
            const newArr = detailPost.filter(post => post._id === id)
            setPost(newArr)
        };
    },[detailPost, dispatch, id, auth])

    console.log("DATA:", post)

    return (
        <div className="posts">
            {
                post.length === 0 && <Loading/>
            }

            {
                post.map((item,index) => (
                    <PostCard key={index} post={item} />
                ))
            }
        </div>
    )
}

export default Post
