import { FC } from "react";
import Login from "../../../components/login/login"; 
import { ScrollToTop } from "@/components/ScrollToTop";

const LoginPage: FC = () => {
  return (
    <>
      <Login />
    <ScrollToTop />
   </>
  );
};

export default LoginPage;
