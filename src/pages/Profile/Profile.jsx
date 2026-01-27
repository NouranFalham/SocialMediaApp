import { useContext, useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faEnvelope,
  faCalendar,
  faVenusMars,
  faLock,
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
        outline-none focus:bg-slate-200 transition text-sm"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2
        text-slate-500 hover:text-indigo-600 transition"
      >
        <FontAwesomeIcon className="cursor-pointer" icon={show ? faEye : faEyeSlash} />
      </button>
    </div>
  );
}
export default function Profile() {
  const { user , setUser, getUserData } = useContext(UserContext);
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const {logout} = useContext(AuthContext)
  const [myPosts, setMyPosts] = useState(null);
  


function AboutRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-white/60 rounded-xl px-4 py-3 mb-3 shadow-sm">
      <FontAwesomeIcon icon={icon} className="text-blue-500" />
      <div className="text-sm">
        <p className="text-slate-500">{label}</p>
        <p className="font-medium text-slate-700">{value}</p>
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
        url: `https://linked-posts.routemisr.com/users/${user._id}/posts?limit=10`,
        method: "GET",
        headers: { token },
      }
      const {data} = await axios.request(options)
      if(data.message === 'success'){
        // console.log(data);
        setMyPosts(data.posts)
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
    <div className="py-10 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      <section className="container mx-auto px-4 max-w-4xl space-y-8">
                  <button
            onClick={() => navigate("/")}
            className="cursor-pointer absolute left-6 top-6 size-14 rounded-full
            bg-white shadow-md flex items-center justify-center
            hover:bg-blue-50 transition fixed"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-blue-600 text-xl" />
          </button>

        {/* ===== PROFILE HEADER ===== */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row gap-6 items-center border border-blue-100 ">


          {/* Avatar */}
          <div className="relative group shrink-0">
            <img
              src={user?.photo}
              alt="profile"
              className="size-24 rounded-full object-cover border-2 border-blue-200"
            />

              <label
                htmlFor="profile-upload"
                className="absolute inset-0 rounded-full bg-blue-600/40 opacity-0
                group-hover:opacity-100 transition flex items-center justify-center
                cursor-pointer"
                >
                  <FontAwesomeIcon icon={faCamera} className="text-white text-lg" />
              </label>

  {/* File input, now visible to label click */}
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

          {/* Basic Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-lg font-semibold text-slate-800 flex items-center gap-2 justify-center sm:justify-start">
              <FontAwesomeIcon icon={faUser} className="text-blue-500" />
              {user?.name}
            </h1>

            <p className="text-slate-500 text-sm flex items-center justify-center sm:justify-start gap-2 mt-1">
              <FontAwesomeIcon icon={faEnvelope} className="text-blue-500" />
              {user?.email}
            </p>
          </div>
        </div>

        {/* ===== ABOUT + SECURITY ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* About */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 shadow-sm">
            <h3 className="font-medium text-blue-700 mb-4">
              About
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
          <div className="rounded-2xl p-5 bg-white/80 backdrop-blur border border-indigo-100 shadow-sm">
            <h3 className="font-medium text-indigo-700 mb-4">
              Security
            </h3>

            <PasswordInput placeholder="Current password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            <PasswordInput placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <PasswordInput placeholder="Confirm new password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />

            <button
              onClick={changePassword}
              className="w-full mt-4 py-2 rounded-xl bg-indigo-500 text-white
              text-sm font-medium hover:bg-indigo-600 transition cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </div>

        {/* ===== POSTS ===== */}
        <div className="space-y-6">
          <h2 className="text-lg font-medium text-indigo-700">
            My Posts
          </h2>

          
          {
            myPosts? 
            myPosts.length > 0 ? (myPosts.map((post)=> <PostCard  key={post.id}
        postInfo={post}/>)):(<p className="text-gray-500 text-center">
      You haven’t posted anything yet.
    </p>)
            :
            <PostCardSkeleton/>
          }
        </div>

      </section>
    </div>
          );
}



