import { useContext } from "react";
import usePost from "../../assets/Hooks/usePost";
import Feed from "../../Components/Feed/Feed";
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar";
import Navbar from "../../Components/Navbar/Navbar";
import PostUpload from "../../Components/PostUpload/PostUpload";
import RightSidebar from "../../Components/RightSidebar/RightSidebar";
import { AuthContext } from "../../assets/Context/Auth.context/Auth.context";
import axios from "axios";

export default function Home() {
    const { posts, setPosts, getAllPosts} = usePost();
    const {token} = useContext(AuthContext);

    async function deletePost(postId) {
        try {
            const options = {
                url: `https://linked-posts.routemisr.com/posts/${postId}`,
                method: 'DELETE',
                headers: {token}
            }
            const {data} = await axios.request(options)
            if(data.message === 'success'){
                setPosts((oldPosts) => oldPosts.filter((post) => post.id !== postId ));
            }
        } catch (error) {
            console.log(error)
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
            setPosts((oldPosts) =>
    oldPosts.map((post) => {
        if (post.id !== postId) return post;

        return {
            ...post,               
            body: data.post.body,
            image: data.post.image,
            updatedAt: data.post.updatedAt,
        };
        })
        )
            }
    } catch (error) {
        console.log(error);
    }
}



    return ( <>

        <Navbar/>

        <div className="pt-16">
        <section className="container mx-auto px-4 mt-6">
            <div className="grid grid-cols-12 gap-6">
                
                {/* Left Sidebar */}
                <aside className="hidden lg:block col-span-3">
                    <LeftSidebar/>
                </aside>

                {/* Main Feed */}
                <main className="col-span-12 lg:col-span-6 ">
                    <PostUpload getAllPosts={getAllPosts} />
                    <Feed allPosts={posts} 
                        onDeletePost={deletePost}
                        onUpdatePost={updatePost}/>
                </main>

                {/* Right Sidebar */}
                <aside className="hidden lg:block col-span-3">
                    <RightSidebar/>
                </aside>

            </div>
        </section>
        </div>
        </>
    );
}

