import type { ReactNode } from "react"
interface Props {
  basic: ReactNode;
  membership: ReactNode;
  bookmarks: ReactNode;
  comments: ReactNode;
}
export default function Layout({ basic, membership, bookmarks, comments} : Props) {

  return <div className="flex flex-col w-full h-full">
    {basic}
    {membership}
    {bookmarks}
    {comments}
  </div>
}