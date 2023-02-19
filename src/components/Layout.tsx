import React, {FunctionComponent} from "react";
import Logo from "../assets/group.svg";

interface Props {
  children: React.ReactNode;
}

const Layout: FunctionComponent<Props>=({children}) => (
  <main>
    <section className="login-form">
      <img src={Logo} alt="logo" />
      {children}
    </section>
  </main>
);

export default Layout;
