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
    const { user } = useContext(UserContext);

    return (
        <div className="space-y-6 sticky top-24">

            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-700 overflow-hidden">

                {/* Cover */}
                <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-500"></div>

                <div className="p-5 -mt-10 text-center">
                    <img
                        src={user?.photo}
                        className="size-20 rounded-full mx-auto border-4 border-white dark:border-gray-800"
                        alt="user"
                    />

                    <div className="flex justify-center items-center gap-2 mt-2">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                            {user?.name}
                        </h3>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Frontend Developer • React
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 mt-5 border-t border-gray-200 dark:border-gray-700 pt-4 text-sm">
                        <div className="dark:text-gray-200">
                            <span className="block font-semibold text-gray-800 dark:text-gray-200">120</span>
                            Posts
                        </div>
                        <div className="dark:text-gray-200">
                            <span className="block font-semibold text-gray-800 dark:text-gray-200">1.8k</span>
                            Followers
                        </div>
                        <div className="dark:text-gray-200">
                            <span className="block font-semibold text-gray-800 dark:text-gray-200">320</span>
                            Following
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700 p-4">
                <h4 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
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
                ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
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

