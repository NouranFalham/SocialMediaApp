import usePost from "../../assets/Hooks/usePost";
import Feed from "../../Components/Feed/Feed";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import PostUpload from "../../Components/PostUpload/PostUpload";
import RightSidebar from "../../Components/RightSidebar/RightSidebar";

export default function Home() {
    const { posts, getAllPosts } = usePost();

    return (
        <section className="container mx-auto px-4">
            <div className="grid grid-cols-12 gap-6">
                
                {/* Left Sidebar */}
                <aside className="hidden lg:block col-span-3">
                    <LeftSidebar/>
                </aside>

                {/* Main Feed */}
                <main className="col-span-12 lg:col-span-6">
                    <PostUpload getAllPosts={getAllPosts} />
                    <Feed posts={posts} />
                </main>

                {/* Right Sidebar */}
                <aside className="hidden lg:block col-span-3">
                    <RightSidebar/>
                </aside>

            </div>
        </section>
    );
}

