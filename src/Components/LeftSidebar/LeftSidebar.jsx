import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faUser,
    faBookmark,
    faBell,
    faGear,
    faChartLine,

} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../assets/Context/User.context/User.context";

export default function LeftSidebar() {
    const {user} = useContext(UserContext)
    return (
        <div className="space-y-6 sticky top-24">

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

                {/* Cover */}
                <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-500"></div>

                <div className="p-5 -mt-10 text-center">
                    <img
                        src={user?.photo}
                        className="size-20 rounded-full mx-auto border-4 border-white"
                        alt="user"
                    />

                    <div className="flex justify-center items-center gap-2 mt-2">
                        <h3 className="font-semibold text-lg">
                            {user?.name}
                        </h3>
                    </div>

                    <p className="text-sm text-gray-600">
                        Frontend Developer • React
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 mt-5 border-t pt-4 text-sm">
                        <div>
                            <span className="block font-semibold text-gray-800">120</span>
                            Posts
                        </div>
                        <div>
                            <span className="block font-semibold text-gray-800">1.8k</span>
                            Followers
                        </div>
                        <div>
                            <span className="block font-semibold text-gray-800">320</span>
                            Following
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="bg-white rounded-2xl shadow-lg p-4">
                <h4 className="text-xs uppercase tracking-wide text-gray-500 mb-3">
                    Navigation
                </h4>

                <SidebarItem icon={faHouse} label="Home" active />
                <SidebarItem icon={faUser} label="Profile" />
                <SidebarItem icon={faBookmark} label="Saved Posts" badge="7" />
                <SidebarItem icon={faBell} label="Notifications" badge="3" />
                <SidebarItem icon={faChartLine} label="Analytics" />
                <SidebarItem icon={faGear} label="Settings" />
            </div>
        </div>
    );
}

function SidebarItem({ icon, label, badge, active }) {
    return (
        <button
            className={`flex items-center justify-between w-full px-3 py-2 rounded-xl
            transition mb-1
            ${active
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"}`}
        >
            <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={icon} />
                <span className="font-medium">{label}</span>
            </div>

            {badge && (
                <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                    {badge}
                </span>
            )}
        </button>
    );
}
