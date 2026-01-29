import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { AuthContext } from "../../assets/Context/Auth.context/Auth.context"
import PostCard from "../../Components/PostCard/PostCard"
import PostCardSkeleton from "../../Components/Skeleton/PostCardSkeleton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";


export default function PostDetailsPage() {

    const {id} = useParams()
    const {token} = useContext(AuthContext)
    const [postDetails , setPostDetails] = useState(null)
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();


    async function getPostComments(){
        try {
            const options ={
                url: `https://linked-posts.routemisr.com/posts/${id}/comments`,
                method: "GET",
                headers: { token },
            }
            const { data } = await axios.request(options);

            if (data.message === "success") {
                // console.log(data);
                
            setComments(data.comments);
            }
        } catch (error) {
            
        }
    }

    async function getPostDetails(){
        try {
            const options = {
                url: `https://linked-posts.routemisr.com/posts/${id}`,
                method: 'GET',
                headers: {token}
            }
            const {data} = await axios.request(options)
            // console.log(data)
            if(data.message == 'success'){
                setPostDetails(data.post)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=> {getPostDetails() , getPostComments()}, [])

    return (
        <>
        <section className="py-10 ">
            <button
                onClick={() => navigate("/")}
                className="absolute left-10 cursor-pointer size-17 flex items-center justify-center rounded-full bg-white shadow hover:bg-gray-100 transition"
            >
                <FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
            </button>

        <div className="container mx-auto max-w-3xl">

            {postDetails ? (
            <PostCard
                postInfo={{ ...postDetails, comments }}
                commentsLimit={comments.length}
            />
            ) : (
            <PostCardSkeleton />
            )}
        </div>
        </section>

        </>
    )
}
