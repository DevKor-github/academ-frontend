import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function AdminPage({ isAdmin }: { isAdmin: boolean }) {
  const router = useRouter();

  useLayoutEffect(() => {
    if (!isAdmin) {
      router.replace('/404');
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return null; // 로딩 상태 또는 아무것도 렌더링하지 않음
  }

  return (
      <div>
        <h1>Admin Page</h1>
        <p>Welcome, Admin!</p>
      </div>
  );
}

export async function getServerSideProps(context : GetServerSidePropsContext) {
  const { req } = context;
  const cookies = req.headers.cookie || "";

  // 쿠키에서 관리자인지 여부를 검사하는 로직을 추가
  const isAdmin = checkAdminFromCookies(cookies);

  // 관리자가 아닌 경우 404 상태 코드와 함께 페이지를 렌더링하지 않음
  if (!isAdmin) {
    return {
      notFound: true,
    };
  }

  return {
    props: { isAdmin }, // 페이지에 isAdmin prop 전달
  };
}

// 쿠키에서 관리자인지 여부를 검사하는 함수 예제
function checkAdminFromCookies(cookies : string) {
  if (!cookies) return false;
  
  const cookieArray = cookies.split(';').map(cookie => cookie.trim());
  const adminCookie = cookieArray.find(cookie => cookie.startsWith('admin='));

  if (adminCookie) {
    const adminValue = adminCookie.split('=')[1];
    return adminValue === 'true'; // 예시로, 'admin=true' 쿠키가 있으면 관리자라고 가정
  }

  return false;
}