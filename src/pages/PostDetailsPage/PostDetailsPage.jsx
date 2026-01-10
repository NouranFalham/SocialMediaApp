import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { AuthContext } from "../../assets/Context/Auth.context/Auth.context"
import PostCard from "../../Components/PostCard/PostCard"
import PostCardSkeleton from "../../Components/Skeleton/PostCardSkeleton"

export default function PostDetailsPage() {

    const {id} = useParams()
    const {token} = useContext(AuthContext)
    const [postDetails , setPostDetails] = useState(null)

    async function getPostDetails(){
        try {
            const options = {
                url: `https://linked-posts.routemisr.com/posts/${id}`,
                method: 'GET',
                headers: {token}
            }
            const {data} = await axios.request(options)
            console.log(data)
            if(data.message == 'success'){
                setPostDetails(data.post)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {getPostDetails()}, [])

    return (
        <>
        <section className="py-10">
            <div className="container mx-auto max-w-3xl">
                {postDetails? <PostCard postInfo={postDetails} commentsLimit={10}/>: <PostCardSkeleton/>}
            </div>
        </section>
        
        </>
    )
}
