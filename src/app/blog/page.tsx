import { getPosts } from "@/actions/getPosts";
import PostListInfinite from "@/components/PostListInfinite"
import { POSTS_PER_PAGE } from "@/constant/env"

export default async function InfiniteBlogPost(){
    const initialPosts = await getPosts(0, POSTS_PER_PAGE);

    return (
        <>
            <div className="max-w-3xl mx-auto p-5 mt-8">
                <h1>Loading Posts on scroll</h1>
                <h3 className="text-center mb-5 text-slate-600">
                     With no additional dependencies
                </h3>
                <PostListInfinite initialPosts={initialPosts} />
            </div>
        </>
    )
}