import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faFaceDizzy,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center
        bg-gradient-to-br from-indigo-100 via-blue-100 to-slate-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
        px-4 overflow-hidden">

            {/* Floating gradient blobs */}
            <div className="absolute -top-32 -left-32 size-96 bg-indigo-300/30 dark:bg-indigo-700/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-32 -right-32 size-96 bg-blue-300/30 dark:bg-blue-700/30 rounded-full blur-3xl animate-pulse" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative max-w-md w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl
                rounded-3xl shadow-2xl dark:shadow-gray-700 p-8 text-center"
            >

                {/* Floating Icon */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="mx-auto size-24 rounded-full
                    bg-gradient-to-br from-indigo-500 to-blue-500 dark:from-indigo-600 dark:to-blue-600
                    flex items-center justify-center mb-6 shadow-lg"
                >
                    <FontAwesomeIcon
                        icon={faFaceDizzy}
                        className="text-white text-4xl"
                    />
                </motion.div>

                {/* 404 */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-7xl font-extrabold
                    bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400
                    bg-clip-text text-transparent"
                >
                    404
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl font-semibold text-slate-800 dark:text-slate-200 mt-2"
                >
                    Oops! Page not found
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-slate-500 dark:text-slate-400 mt-3 mb-7"
                >
                    Looks like you took a wrong turn.
                    Don’t worry, it happens to the best of us.
                </motion.p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/")}
                        className="flex items-center justify-center gap-2
                        px-6 py-2 rounded-xl
                        bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-600 dark:to-blue-600
                        text-white font-medium shadow-md
                        hover:shadow-xl transition cursor-pointer"
                    >
                        <FontAwesomeIcon icon={faHouse} />
                        Go Home
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 rounded-xl
                        border border-slate-300 dark:border-gray-600 text-slate-600 dark:text-gray-300
                        hover:bg-slate-100 dark:hover:bg-gray-700 transition cursor-pointer"
                    >
                        Go Back
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}

