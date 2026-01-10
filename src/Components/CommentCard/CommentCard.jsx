import user from '../../assets/images/user.png'

export default function CommentCard({commentInfo}) {

    const commentCreatorPhoto = commentInfo.commentCreator.photo.includes('undefined')? user: commentInfo.commentCreator.photo

    return (
        <>
        <div className="Comment-info flex gap-2">
            <img
            src={commentCreatorPhoto}
            alt="user"
            className="rounded-full size-12 mt-1.5"
        />
        <div className="comment-body grow">
            <div className="comment bg-gray-100/80 p-4 rounded-lg ">
            <h4 className="font-semibold">{commentInfo.commentCreator.name}</h4>
            <p className="text-gray-600">{commentInfo.content}</p>
            </div>
            <div className="comment-btns flex items-center gap-2 text-gray-500 mt-1 ml-1">
            <span>{new Date(commentInfo.createdAt).toLocaleString()}</span>
            <button className="cursor-pointer"> Like </button>
            <button className="cursor-pointer">Reply</button>
            </div>
        </div>
        </div>
        </>
    );
}
