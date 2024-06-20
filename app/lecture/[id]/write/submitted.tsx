export default function Submitted({ success }: { success: boolean }) {
  if (success) {
    return <div>성공했습니다</div>
  }
  else {
    return <div>실패했습니다</div>
  }
}