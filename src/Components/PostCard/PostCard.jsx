import { faThumbsUp as faThumbUpRegular } from "@fortawesome/free-regular-svg-icons";
import {
    faComment,
    faHeart,
    faShare,
    faThumbsUp,
    } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import CommentCard from "../CommentCard/CommentCard";
    import { Link } from "react-router";
    import { useRef, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../assets/Context/Auth.context/Auth.context";
import DropDown from "../DropDown/DropDown";
import { UserContext } from "../../assets/Context/User.context/User.context";



    export default function  PostCard({ postInfo, commentsLimit = 3, onDeletePost, onUpdatePost }) {
        async function  handleDelete() {
            onDeletePost(postInfo.id);
        }

        const [newComment, setNewComment] = useState("");
        const [comments , setComments] = useState(postInfo.comments || [])
        const {token}= useContext(AuthContext);
        const commentInputRef = useRef(null);
        const {user} = useContext(UserContext);

        const [isEditingPost, setIsEditingPost] = useState(false);
        const [editedBody, setEditedBody] = useState(postInfo.body);
        const [editedImage, setEditedImage] = useState(null);
        const [previewImage, setPreviewImage] = useState(postInfo.image);


        async function addComment(e) {
        try {
            e.preventDefault();
            const options = {
                url: 'https://linked-posts.routemisr.com/comments',
                method: 'POST',
                headers: {token},
                data: {
                    content: newComment,
                    post: postInfo.id
                }

            }
            const {data} = await axios.request(options);
            // console.log(data);
            if(data.message == 'success'){
                setComments(data.comments);
                setNewComment("");
                
            }
        } catch (error) {
            console.log(error);
        }
            
        }
        async function deleteComment(commentId) {
            try {
                const options = {
                    url:`https://linked-posts.routemisr.com/comments/${commentId}`,
                    method: 'DELETE',
                    headers: {token}
                }
                const {data} = await axios.request(options);
                // console.log(data);
                if(data.message == 'success'){
                    setComments((oldComments) => oldComments.filter((comment) => comment._id !== commentId ));
                }
                
            } catch (error) {
                console.log(error);
                
            }
        }
        async function editComment(commentId , content){
            try {
                const options = {
                    url: `https://linked-posts.routemisr.com/comments/${commentId}`,
                    method: 'PUT',
                    headers: {token},
                    data: {
                        content: content
                    }
                }
                const {data} = await axios.request(options);
                if(data.message == 'success'){
                    setComments((oldComments)=>oldComments.map((comment)=>
                        comment._id === commentId ? {...comment , content}: comment))
                }
                
            } catch (error) {
                console.log(error);
            }
        }

        function timeAgo(dateString) {
        const date = new Date(dateString);
        const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

        const intervals = [
            { label: "year", seconds: 31536000 },
            { label: "month", seconds: 2592000 },
            { label: "day", seconds: 86400 },
            { label: "hour", seconds: 3600 },
            { label: "minute", seconds: 60 },
        ];

        for (let i = 0; i < intervals.length; i++) {
            const count = Math.floor(seconds / intervals[i].seconds);

            if (count >= 1) {
            return `${count} ${intervals[i].label}${count > 1 ? "s" : ""} ago`;
            }
        }

        return "Just now";
        }


        async function handleUpdatePost() {
    await onUpdatePost(postInfo.id, {
        body: editedBody,
        image: editedImage,
    });

    setIsEditingPost(false);
}



    return (
        <>
        <div className="post-card space-y-5 bg-white p-7 rounded-2xl shadow-xl">
            <header className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
                <img
                src={postInfo.user.photo}
                alt="user"
                className="size-12 rounded-full"
                />
                <div className="">
                <h3 className="font-semibold">{postInfo.user.name}</h3>
                <time className="block text-sm text-gray-600 -m-1 cursor-pointer">
                    <Link to={`/post/${postInfo.id}`}>
                    {timeAgo(postInfo.createdAt)}
                    </Link>
                </time>
                </div>
            </div>
                {user?._id === postInfo.user?._id && <DropDown   onEdit={() => setIsEditingPost(true)} onDelete={handleDelete}  option1={"Edit Post"} option2={"Delete Post"} />}
            </header>

            <figure className="post-info">
            {isEditingPost ? (
            <div className="border border-gray-300 rounded-xl p-4 bg-gray-50 space-y-3 relative">
                
                <textarea
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                className="w-full  bg-gray-200/90 border-none rounded-xl p-3 focus:outline-none "
                
                />

                {previewImage && (
                <div className="relative">
                <img
                src={previewImage}
                alt="image"
                className="w-full max-h-96 object-cover rounded-lg"
                />

                <button
                type="button"
                onClick={() => {
                    setPreviewImage(null);
                    setEditedImage(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white size-6 rounded-full flex items-center justify-center hover:bg-red-600 transition duration-200 cursor-pointer"
                >
                ✕
                </button>
            </div>
            )}


                <input
                type="file"
                id="post-image"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setEditedImage(file);
                    setPreviewImage(URL.createObjectURL(file));
                }}
                className="hidden text-sm "
                />

                <label
            htmlFor="post-image"
            className="inline-block cursor-pointer px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
            >
            Choose image
            </label>


                <div className="flex justify-end gap-2">
                <button
                    onClick={() => setIsEditingPost(false)}
                    className="cursor-pointer px-4 py-1 rounded-lg border border-gray-300 hover:bg-gray-300 transition-colors duration-200"
                >
                    Cancel
                </button>
                <button
                    onClick={handleUpdatePost}
                    className="cursor-pointer px-4 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-20"
                >
                    Save
                </button>
                </div>
            </div>
            ) : (
            <>
                <p>{postInfo.body}</p>
                {postInfo.image && (
                <img src={postInfo.image} className="w-full rounded-lg" />
                )}
            </>
            )}
            </figure>

            <div className="reactions flex justify-between items-center text-gray-600">
            <div className="flex items-center gap-2">
                <div className="icons space-x-1 *:cursor-pointer *:hover:scale-110 *:transition-transform *:duration-200 flex items-center *:size-6 *:flex *:justify-center *:items-center *:rounded-full">
                <div className="icon bg-blue-500 text-white text-sm">
                    <FontAwesomeIcon icon={faThumbsUp} />
                </div>
                <div className="icon  bg-red-500 text-white text-sm">
                    <FontAwesomeIcon icon={faHeart} />
                </div>
                </div>
                <span>0 likes</span>
            </div>
            <span>{comments.length} comments</span>
            </div>

            <div className="action-btns -mx-7 flex items-center *:grow text-lg text-gray-700 *:cursor-pointer border-y border-gray-400/30 py-3">
            <button className="hover:text-blue-500 transition-colors duration-200 hover:scale-105 ">
                <FontAwesomeIcon icon={faThumbUpRegular} />
                <span>Like</span>
            </button>
            <button
                onClick={() => {
                    commentInputRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    });
                    commentInputRef.current?.focus();
                }}
                className="hover:text-green-700 transition-colors duration-200 hover:scale-105 ">
                <FontAwesomeIcon icon={faComment} />
                <span>Comment</span>
            </button>
            <button className="hover:text-red-600 transition-colors duration-200 hover:scale-105 ">
                <FontAwesomeIcon icon={faShare} />
                <span>Share</span>
            </button>
            </div>

            {/* ADD COMMENT */}
            <div className="flex items-start gap-1 pt-4">
            <img
                src={postInfo.user.photo}
                alt="user"
                className="size-10 rounded-full mt-1"
            />
            <form className="w-full" onSubmit={addComment}>
            <div className="grow relative">
                <input
                type="text"
                ref={commentInputRef}
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full bg-gray-100 rounded-full px-5 pr-15 py-3 outline-none focus:bg-gray-200 transition"
                />

                {newComment && (
                <button
                    type="submit"
                    className=" cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 font-semibold hover:scale-105 transition"
                >
                    Post
                </button>
                )}
            </div>
            </form>
            </div>


            <div className="comments ">
            {comments.length > 0 ? (
                <>
                <div className="all-comments space-y-3">
                    {comments.slice(0, commentsLimit).map((comment) => (
                    <CommentCard onEdit={editComment} onDelete={deleteComment} postInfo={postInfo} key={comment._id} commentInfo={comment} />
                    ))}
                </div>
                {comments.length > commentsLimit && (
                    <Link
                    to={`/post/${postInfo.id}`}
                    className=" text-gray-600 cursor-pointer border-b-2 border-transparent hover:border-gray-500 transition-colors duration-200  mt-7"
                >
                    Show all comments ({comments.length - commentsLimit})
                </Link>
                )}
                </>
            ) : (
                <div>
                <p className="text-center py-2 text-gray-700">
                    No comments yet. Be the first to comment!
                </p>
                </div>
            )}
            </div>
        </div>
        </>
    );
}
