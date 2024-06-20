import { GetServerSidePropsContext } from "next";
import CommonLayout from "@/components/commonLayout/commonLayout";
import { ThemeProvider } from "@/context/ThemeContext";
import { SessionIdProvider } from "@/context/SessionIdContext";

import '@/app/globals.css';

import AdminPageInner from './inner';

export default function AdminPage() {

  return (
    <SessionIdProvider>
    <ThemeProvider>
      <CommonLayout>
          <AdminPageInner />
      </CommonLayout>
    </ThemeProvider>
    </SessionIdProvider>
  );
}



export async function getServerSideProps(context : GetServerSidePropsContext) {
  const { req } = context;
  const cookies = req.headers.cookie || "";

  // 쿠키에서 관리자인지 여부를 검사하는 로직을 추가
  const isAdmin = await checkAdminFromCookies(cookies);

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
async function checkAdminFromCookies(cookies : string) {
  if (!cookies) return false;

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/login/check-login`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies // 쿠키를 헤더에 추가
      },
      credentials: 'include' // 쿠키를 포함한 요청을 보낼 때 필요
    });

    const data = await response.json();
    
    

    if (data?.data?.role === "ROLE_ADMIN") {
      return true;
    }
  
    return false;

  } catch {
    return false;
  }

  
}