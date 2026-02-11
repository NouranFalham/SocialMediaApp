import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserPlus,
    faUserXmark,
    faFire,
    faHeart,
    faComment,
} from "@fortawesome/free-solid-svg-icons";

export default function RightSidebar() {
    return (
        <div className="space-y-6 sticky top-24">

            {/* Connection Requests */}
            <Card title="Connection Requests">
                {friendRequests.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center justify-between mb-4 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={user.avatar}
                                className="size-11 rounded-full"
                                alt={user.name}
                            />
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                                    {user.name}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {user.mutual} mutual friends
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                className="size-9 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
                                title="Accept"
                            >
                                <FontAwesomeIcon icon={faUserPlus} />
                            </button>

                            <button
                                className="size-9 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition"
                                title="Ignore"
                            >
                                <FontAwesomeIcon icon={faUserXmark} />
                            </button>
                        </div>
                    </div>
                ))}

                <button className="text-sm text-blue-500 hover:underline">
                    See all requests
                </button>
            </Card>

            {/* Active & Away Friends */}
            <Card title="Connections">
                <div className="space-y-3">
                    {connections.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            <div className="relative">
                                <img
                                    src={user.avatar}
                                    className="size-10 rounded-full"
                                    alt={user.name}
                                />
                                <span
                                    className={`absolute bottom-0 right-0 size-3 border-2 border-white dark:border-gray-800 rounded-full
                                    ${user.status === "online" && "bg-green-500"}
                                    ${user.status === "away" && "bg-yellow-400"}
                                    ${user.status === "offline" && "bg-gray-400"}`}
                                ></span>
                            </div>

                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                                    {user.name}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {user.status === "online" && "Online"}
                                    {user.status === "away" && "Away"}
                                    {user.status === "offline" && "Offline"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Hot Right Now */}
            <Card title="Hot Right Now">
                {popularPosts.map((post) => (
                    <div
                        key={post.id}
                        className="flex items-start gap-3 mb-4 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        <div className="size-10 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                            <FontAwesomeIcon icon={faFire} className="text-orange-500 dark:text-orange-400" />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 line-clamp-2">
                                {post.text}
                            </p>
                            <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                <span>❤️ {post.likes} likes</span>
                                <span>💬 {post.comments} comments</span>
                            </div>
                        </div>
                    </div>
                ))}
            </Card>

            {/* From Your Network */}
            <Card title="From Your Network">
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                    <li>❤️ Lina Hassan liked your post</li>
                    <li>💬 You replied to Ahmed Samy</li>
                    <li>👤 You connected with Nour Adel</li>
                </ul>
            </Card>
        </div>
    );
}

/* ---------- Mock Data ---------- */

const friendRequests = [
    {
        id: 1,
        name: "Ahmed Salah",
        mutual: 2,
        avatar: "https://i.pravatar.cc/100?img=11",
    },
    {
        id: 2,
        name: "Omar Youssef",
        mutual: 5,
        avatar: "https://i.pravatar.cc/100?img=12",
    },
];

const connections = [
    {
        id: 1,
        name: "Sara Mahmoud",
        status: "online",
        avatar: "https://i.pravatar.cc/100?img=20",
    },
    {
        id: 2,
        name: "Yara Amin",
        status: "away",
        avatar: "https://i.pravatar.cc/100?img=21",
    },
    {
        id: 3,
        name: "Nour Adel",
        status: "offline",
        avatar: "https://i.pravatar.cc/100?img=22",
    },
];

const popularPosts = [
    {
        id: 1,
        text: "A simple React trick that improved my app performance",
        likes: 312,
        comments: 48,
    },
    {
        id: 2,
        text: "Why Tailwind CSS is a game changer for frontend developers",
        likes: 221,
        comments: 33,
    },
];

/* ---------- Shared ---------- */

function Card({ title, children }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700 p-5">
            <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-200">{title}</h3>
            {children}
        </div>
    );
}
