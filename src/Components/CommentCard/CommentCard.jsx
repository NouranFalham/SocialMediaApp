import { useContext, useState } from 'react';
import userImage from '../../assets/images/user.png'
import DropDown from '../DropDown/DropDown';
import { UserContext } from '../../assets/Context/User.context/User.context';

export default function CommentCard({commentInfo , postInfo, onDelete, onEdit}) {

    const commentCreatorPhoto = commentInfo.commentCreator.photo.includes('undefined')? userImage: commentInfo.commentCreator.photo
    const {user} = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(commentInfo.content);
    // console.log(commentInfo);
    
    return (
        <>
        <div className="Comment-info flex gap-2">
            <img
            src={commentCreatorPhoto}
            alt="user"
            className="rounded-full size-12 mt-1.5"
        />
        <div className="comment-body grow ">
            <div className="comment bg-gray-100/80 p-4 rounded-lg flex items-center justify-between">
            <div className="">
                <h4 className="font-semibold">{commentInfo.commentCreator.name}</h4>
                {isEditing? (
                    <div className="flex gap-2">
                        <input
                        autoFocus
                        value={value}
                        onChange={(e) => setValue(e.target.value)} 
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 outline-none focus:border-blue-400"/>
                        <button
                        onClick={() => {
                            onEdit(commentInfo._id, value); 
                            setIsEditing(false);             
                        }}
                        className=" text-blue-500 font-bold px-3 py-1 rounded-lg cursor-pointer"
                        >
                        Save
                        </button>
                    </div>)
                : 
                <p className="text-gray-600">{commentInfo.content}</p>}
            </div>

            {commentInfo.commentCreator._id === user._id && user._id === postInfo.user._id &&<DropDown onEdit={() => { setIsEditing(true); }} onDelete={()=> onDelete(commentInfo._id)} option1={"Edit Comment"} option2={"Delete Comment"} className="size-7 text-gray-400 hover:bg-gray-200 -mt-7" />}

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
