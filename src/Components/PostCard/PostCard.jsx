import { faThumbsUp as faThumbUpRegular } from "@fortawesome/free-regular-svg-icons";
import {
    faComment,
    faEllipsisVertical,
    faHeart,
    faShare,
    faThumbsUp,
    } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import CommentCard from "../CommentCard/CommentCard";
    import { Link } from "react-router";

    export default function PostCard({ postInfo, commentsLimit = 3 }) {
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
                    {new Date(postInfo.createdAt).toLocaleString()}
                    </Link>
                </time>
                </div>
            </div>
            <button>
                <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="cursor-pointer"
                />
            </button>
            </header>

            <figure className="post-info">
            <figcaption className="mb-4 text-gray-700">
                {postInfo.body}
            </figcaption>
            {postInfo.image && (
                <div className="-mx-7">
                <img
                    src={postInfo.image}
                    alt="post"
                    className="w-full h-120 object-cover object-center"
                />
                </div>
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
            <span>{postInfo.comments.length} comments</span>
            </div>

            <div className="action-btns -mx-7 flex items-center *:grow text-lg text-gray-700 *:cursor-pointer border-y border-gray-400/30 py-3">
            <button className="hover:text-blue-500 transition-colors duration-200 hover:scale-105 ">
                <FontAwesomeIcon icon={faThumbUpRegular} />
                <span>Like</span>
            </button>
            <button className="hover:text-green-700 transition-colors duration-200 hover:scale-105 ">
                <FontAwesomeIcon icon={faComment} />
                <span>Comment</span>
            </button>
            <button className="hover:text-red-600 transition-colors duration-200 hover:scale-105 ">
                <FontAwesomeIcon icon={faShare} />
                <span>Share</span>
            </button>
            </div>

            <div className="comments ">
            {postInfo.comments.length > 0 ? (
                <>
                <div className="all-comments space-y-3">
                    {postInfo.comments.slice(0, commentsLimit).map((comment) => (
                    <CommentCard key={comment._id} commentInfo={comment} />
                    ))}
                </div>
                {postInfo.comments.length > commentsLimit && (
                    <Link
                    to={`/post/${postInfo.id}`}
                    className=" text-gray-600 cursor-pointer border-b-2 border-transparent hover:border-gray-500 transition-colors duration-200  mt-7"
                >
                    Show all comments ({postInfo.comments.length - commentsLimit})
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
