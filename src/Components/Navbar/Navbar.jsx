import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBell,
    faEnvelope,
    faUser,
    faRightFromBracket,
    } from "@fortawesome/free-solid-svg-icons";
    import { faSitrox } from "@fortawesome/free-brands-svg-icons";
import { AuthContext } from "../../assets/Context/Auth.context/Auth.context";
import { useNavigate } from "react-router";
import { UserContext } from "../../assets/Context/User.context/User.context";

    export default function Navbar() {
    const [open, setOpen] = useState(false);
    const {logout} = useContext(AuthContext)
    const navigate = useNavigate ();  
    const {user} = useContext(UserContext)  


    return (
        <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 h-16" >
        <div className="container mx-auto px-4">
            <div className="h-16 flex items-center justify-between">

            {/* Logo */}
            <div className="flex items-center  text-blue-600">
                <FontAwesomeIcon icon={faSitrox} className="text-3xl" />
                <span className="text-2xl font-bold text-gray-800">
                ocialSphere
                </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">

                {/* Notifications */}
                <IconButton icon={faBell} badge />

                {/* Messages */}
                <IconButton icon={faEnvelope} badge />

                {/* Profile */}
                <div className="relative">
                <img
                    src={user?.photo}
                    alt="profile"
                    onClick={() => setOpen(!open)}
                    className="size-10 rounded-full cursor-pointer border-2 border-gray-200
                    hover:border-blue-500 transition"
                />

                {/* Dropdown */}
                {open && (
                    <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-lg overflow-hidden z-50">
                    <button onClick={() => navigate("/profile")} 
                    className="cursor-pointer flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-600 hover:bg-gray-100">
                        <FontAwesomeIcon icon={faUser} />
                        Profile
                    </button>

                    <button onClick={()=>
                        {
                            logout()
                            navigate ("/login");
                        }
                    } className="cursor-pointer flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-gray-100">
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        Logout
                    </button>
                    </div>
                )}
                </div>

            </div>
            </div>
        </div>
        </nav>
    );
    }

    function IconButton({ icon, badge }) {
    return (
        <button
        className="relative size-10 rounded-full bg-gray-100 text-gray-600
        hover:bg-blue-50 hover:text-blue-600 transition flex items-center justify-center"
        >
        <FontAwesomeIcon icon={icon} />

        {badge && (
            <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full"></span>
        )}
        </button>
    );
}

