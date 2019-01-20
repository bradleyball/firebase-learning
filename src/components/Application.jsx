import React, { Component } from "react";
import { firestore } from "../firebase";
import Posts from "./Posts";
import { collectIdsAndData } from "../utilities";
import Authentication from "./Authentication";
class Application extends Component {
  state = {
    posts: [],
    user: null
  };

  unsubscribe = null; // NEW

  componentDidMount = async () => {
    this.unsubscribe = firestore.collection("posts").onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndData);
      this.setState({ posts });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  render() {
    const { posts, user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
