import React from "react";
import Header from "../Header";
import Footer from "../Footer";
class Layout extends React.Component {
  render() {
    return (
      <>
        <Header />
        <main>{this.props.children}</main>
        <Footer />
      </>
    );
  }
}

export default Layout;
