import { useContext, useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faEnvelope,
  faCalendar,
  faVenusMars,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../../assets/Context/User.context/User.context";
import PostCard from "../../Components/PostCard/PostCard";
import { AuthContext } from "../../assets/Context/Auth.context/Auth.context";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import PostCardSkeleton from "../../Components/Skeleton/PostCardSkeleton";
import PostUpload from "../../Components/PostUpload/PostUpload";



function PasswordInput({ placeholder, value, onChange }) {
    const [show, setShow] = useState(false);

  return (
    <div className="relative mb-3">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-slate-100 rounded-xl px-4 py-2 pr-10
        outline-none focus:bg-slate-200 transition text-sm dark:bg-gray-800 dark:focus:bg-gray-700
        dark:placeholder:text-gray-400 dark:text-gray-100"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2
        text-slate-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition"
      >
        <FontAwesomeIcon className="cursor-pointer" icon={show ? faEye : faEyeSlash} />
      </button>
    </div>
  );
}
export default function Profile() {
  const { user , getUserData } = useContext(UserContext);
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const {logout} = useContext(AuthContext)
  const [myPosts, setMyPosts] = useState(null);

  async function deletePost(postId) {
  try {
    const options = {
      url: `https://linked-posts.routemisr.com/posts/${postId}`,
      method: "DELETE",
      headers: { token },
    };
    const { data } = await axios.request(options);

    if (data.message === "success") {
      setMyPosts((old) => old.filter((p) => p.id !== postId));
      toast.success("Post deleted");
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to delete post");
  }
}
async function updatePost(postId, updatedData) {
  try {
    const formData = new FormData();
    formData.append("body", updatedData.body);

    if (updatedData.image) {
      formData.append("image", updatedData.image);
    }

    const options = {
      url: `https://linked-posts.routemisr.com/posts/${postId}`,
      method: "PUT",
      headers: { token },
      data: formData,
    };

    const { data } = await axios.request(options);

    if (data.message === "success") {
      setMyPosts((oldPosts) =>
        oldPosts.map((post) =>
          post.id === postId
            ? { ...post,  
            body: data.post.body,  
            image: data.post.image ?? post.image,
            updatedAt: data.post.updatedAt,
            user: post.user,  }
            : post
        )
      );
      toast.success("Post updated");
    }
  } catch (error) {
    console.log(error);
    toast.error("Failed to update post");
  }
}
  


function AboutRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-white/60 dark:bg-gray-800/60 rounded-xl px-4 py-3 mb-3 shadow-sm">
      <FontAwesomeIcon icon={icon} className="text-blue-500" />
      <div className="text-sm">
        <p className="text-slate-500 dark:text-gray-400">{label}</p>
        <p className="font-medium text-slate-700 dark:text-gray-200">{value}</p>
      </div>
    </div>
  );
}



  async function uploadProfilePicture(img){
    try {
      const formData = new FormData();
      formData.append("photo", img);

      const options = {
        url: "https://linked-posts.routemisr.com/users/upload-photo",
        method: "PUT",
        headers: { token },
        data: formData,
      };

      const {data} = await axios.request(options);

        if(data.message === "success"){
        toast.success("Profile picture updated successfully")
        getUserData();
        }

    } catch (error) {
      toast.error("Failed to upload profile picture")
      console.log(error)
    }
  }

  async function changePassword() {
    if(!currentPassword || !newPassword || !confirmNewPassword){
      toast.error("Please fill all password fields");
      return;
    }
    if(newPassword !== confirmNewPassword){
      toast.error("New passwords do not match");
      return;
    }
    if (!passwordRegex.test(newPassword)) {
    toast.error(
      "Password must be at least 8 characters including Uppercase letter, Lowercase letter, Number & Special character"
    );
    return;
    
    }
    try {
      const options = {
        url: "https://linked-posts.routemisr.com/users/change-password",
        method: "patch",
        headers: { token },
        data: {
          password: currentPassword,
          newPassword: newPassword,
        },
      };

      const { data } = await axios.request(options);

      if (data.message === "success") {
        toast.success("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        logout()
        setTimeout(() => {
          navigate("/login");
        }, 2000)
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to change password")
      
    }

  }

  async function getMyPosts() {
    try {
      const options = {
        url: `https://linked-posts.routemisr.com/users/${user._id}/posts?limit=50`,
        method: "GET",
        headers: { token },
      }
      const {data} = await axios.request(options)
      if(data.message === 'success'){
        // console.log(data);
        setMyPosts(data.posts.reverse())
      }
    } catch (error) {
      console.log(error);
      setMyPosts([]);
    }
  }
  useEffect(()=>{
    if(user?._id){
      getMyPosts()
    }
  }, [user])

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 py-10 ">
    {/* Back Button */}
    <button
      onClick={() => navigate("/")}
      className="mb-4 ms-3 lg:fixed lg:top-10 lg:left-10 z-50 size-15 rounded-full
      bg-white dark:bg-gray-700  shadow-lg flex items-center justify-center
      hover:bg-indigo-50 dark:hover:bg-gray-600 transition cursor-pointer"
    >
      <FontAwesomeIcon icon={faArrowLeft} className="text-indigo-600 text-xl dark:text-indigo-400" />
    </button>

    <section className="max-w-2xl mx-auto px-4 space-y-10 ">

      {/* ===== PROFILE HERO ===== */}
      <div className="relative rounded-3xl bg-white  dark:bg-gray-900 shadow-xl overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-blue-500" />

        {/* Profile Content */}
        <div className="px-6 pb-6 -mt-14 flex flex-col sm:flex-row gap-6 items-center sm:items-end">
          <div className="relative group shrink-0">
            <img
              src={user?.photo}
              alt="profile"
              className="size-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <label
              htmlFor="profile-upload"
              className="absolute inset-0 rounded-full bg-black/40 opacity-0
              group-hover:opacity-100 transition flex items-center justify-center cursor-pointer"
            >
              <FontAwesomeIcon icon={faCamera} className="text-white text-xl" />
            </label>
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                if (file.size > 4 * 1024 * 1024) {
                  toast.error("Max file size is 4MB");
                  return;
                }
                uploadProfilePicture(file);
              }}
            />
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-xl font-semibold text-slate-800  dark:text-gray-100  flex items-center gap-2 justify-center sm:justify-start">
              <FontAwesomeIcon icon={faUser} className="text-indigo-500" />
              {user?.name}
            </h1>
            <p className="text-slate-500 dark:text-gray-400 text-sm flex items-center gap-2 justify-center sm:justify-start mt-1">
              <FontAwesomeIcon icon={faEnvelope} className="text-indigo-400" />
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* ===== INFO GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* About */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">
          <h3 className="text-indigo-600 dark:text-indigo-400 font-medium mb-5">
            Personal Information
          </h3>

          <AboutRow
            icon={faCalendar}
            label="Date of birth"
            value={user?.dateOfBirth}
          />
          <AboutRow
            icon={faVenusMars}
            label="Gender"
            value={user?.gender}
          />
        </div>

        {/* Security */}
        <div className="bg-white  dark:bg-gray-900 rounded-2xl shadow-md p-6">
          <h3 className="text-indigo-600 dark:text-indigo-400 font-medium mb-5">
            Account Security
          </h3>

          <PasswordInput
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <PasswordInput
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PasswordInput
            placeholder="Confirm new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />

          <button
            onClick={changePassword}
            className="w-full mt-4 py-2 rounded-xl bg-indigo-500 text-white
            text-sm font-medium hover:bg-indigo-600 transition cursor-pointer"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* ===== CREATE POST ===== */}
      <div className="space-y-6">
        <PostUpload getMyPosts={getMyPosts} />
      </div>

      {/* ===== POSTS FEED ===== */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-indigo-700 dark:text-indigo-400">
          Your Posts
        </h2>

        {myPosts ? (
          myPosts.length > 0 ? (
            myPosts.map((post) => (
              <PostCard
                key={post.id}
                postInfo={post}
                onDeletePost={deletePost}
                onUpdatePost={updatePost}
              />
            ))
          ) : (
            <p className="text-center text-slate-500 dark:text-gray-400">
              You haven’t posted anything yet.
            </p>
          )
        ) : (
          <PostCardSkeleton />
        )}
      </div>

    </section>
  </div>
);

}

