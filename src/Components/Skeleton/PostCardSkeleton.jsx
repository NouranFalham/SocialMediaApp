export default function PostCardSkeleton() {
    return (
        <div className="post-card space-y-5 bg-white p-7 rounded-2xl shadow-xl animate-pulse">

        {/* Header */}
        <header className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
            <div className="size-12 rounded-full bg-gray-300" />
            <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-300 rounded" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
            </div>
            <div className="size-5 bg-gray-300 rounded" />
        </header>

        {/* Post content */}
        <figure className="post-info space-y-4">
            <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 rounded" />
            <div className="h-4 w-5/6 bg-gray-300 rounded" />
            </div>

            <div className="-mx-7">
            <div className="w-full h-72 bg-gray-300" />
            </div>
        </figure>

        {/* Reactions */}
        <div className="reactions flex justify-between items-center">
            <div className="flex items-center gap-2">
            <div className="flex gap-1">
                <div className="size-6 bg-gray-300 rounded-full" />
                <div className="size-6 bg-gray-300 rounded-full" />
            </div>
            <div className="h-4 w-16 bg-gray-300 rounded" />
            </div>
            <div className="h-4 w-20 bg-gray-300 rounded" />
        </div>

        {/* Action buttons */}
        <div className="action-btns -mx-7 flex border-y border-gray-400/30 py-4">
            <div className="flex-1 flex justify-center">
            <div className="h-5 w-20 bg-gray-300 rounded" />
            </div>
            <div className="flex-1 flex justify-center">
            <div className="h-5 w-24 bg-gray-300 rounded" />
            </div>
            <div className="flex-1 flex justify-center">
            <div className="h-5 w-20 bg-gray-300 rounded" />
            </div>
        </div>

        <div className="comments">
            <div className="flex gap-3 items-start">
            <div className="size-9 bg-gray-300 rounded-full" />
            <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-gray-300 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
            </div>
            </div>
        </div>

        </div>
    );
}

