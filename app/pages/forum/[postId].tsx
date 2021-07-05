import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPost from "app/forum/queries/getPost"
import humanReadableDateTime from "app/core/parsers/dates"

export const Post = () => {
  const router = useRouter()
  const postId = useParam("postId", "number")
  const [post] = useQuery(getPost, { id: postId })

  // JSON.stringify(post, null, 2)
  const created = humanReadableDateTime(post.updatedAt)
  return (
    <>
      <div>
        <h1>Post {post.id}</h1>
        {/*<pre>{JSON.stringify(post, null, 2)}</pre>*/}
        {/*<p>{humanReadableDateTime( post.createdAt )}</p>*/}
        <h4 className={"text-lg font-bold"}>{post.title}</h4>
        <p>Content: {post.content}</p>
        <p>Author Id: {post.authorId}</p>
        <p>{created}</p>
        <Link href={`/forum/${post.id}/edit`}>
          <a>Edit</a>
        </Link>
        <button
          type="button"
          disabled
          // onClick={async () => {
          //   if (window.confirm("This will be deleted")) {
          //     await deleteProjectMutation({ id: project.id })
          //     router.push("/projects")
          //   }
          // }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const PostDetailPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={"/forum"}>
          <a>Back</a>
        </Link>
      </p>

      {/*<Suspense fallback={<div>Loading...</div>}>*/}
      <Post />
      {/*</Suspense>*/}
    </div>
  )
}

PostDetailPage.suppressFirstRenderFlicker = true
PostDetailPage.getLayout = (page) => <Layout title={"Post"}>{page}</Layout>

export default PostDetailPage