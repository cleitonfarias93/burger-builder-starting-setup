import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../Auxi/Auxi";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDraw from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          openMenu={this.sideDrawerOpenHandler}
          isAuth={this.props.isAuthenticate}
        />
        <SideDraw
          open={this.state.showSideDrawer}
          closed={this.sideDrawerCloseHandler}
          isAuth={this.props.isAuthenticate}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticate: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
