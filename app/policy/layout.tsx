import CommonLayout from "@/components/commonLayout/commonLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <CommonLayout highlight="/">
      {children}
    </CommonLayout>
  );
}
