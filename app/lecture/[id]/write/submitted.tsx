import Button from "@/components/basic/button"
import Link from "next/link"

export default function Submitted({ success, back }: { success: boolean, back: string }) {
    return <div className="p-8 w-full">
      <div className="text-4xl font-bold w-full text-center">{success ? "작업에 성공했습니다!" : "실패했습니다"}</div>
      <Link href={back}><Button>돌아가기 </Button></Link>
    </div>
}