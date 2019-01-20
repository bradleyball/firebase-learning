import React, { Component } from "react";
import { firestore } from "../firebase";
import Posts from "./Posts";
import { collectIdsAndData } from "../utilities";
class Application extends Component {
  state = {
    posts: []
  };

  unsubscribe = null; // NEW

  componentDidMount = async () => {
    this.unsubscribe = firestore.collection("posts").onSnapshot(snapshot => {
      // NEW
      const posts = snapshot.docs.map(collectIdsAndData);
      this.setState({ posts });
    });
  };

  componentWillUnmount = () => {
    // NEW
    this.unsubscribe();
  };
  //using add to put the new post in data base and generate a new id
  //set doc as a variable to get the post back from the database
  //set new post and call the getter function inside our collect Ids and docs function
  //to retrieve the data and then
  handleCreate = async post => {
    firestore.collection("posts").add(post);
  };
  //set allPosts to the array of posts
  //filters out the post if the id of the post matches the current id of the event
  //the await function goes into the posts grabs the id and uses the .delete method
  //sets the state back to the remaining posts
  handleRemove = async id => {
    firestore.doc(`posts/${id}`).delete();
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts
          posts={posts}
          onCreate={this.handleCreate}
          onRemove={this.handleRemove}
        />
      </main>
    );
  }
}

export default Application;
