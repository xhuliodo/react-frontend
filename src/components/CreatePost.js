import React from "react";
import { useMutation } from "@apollo/react-hooks";

import useForm from "../utils/useForm";
import { Form, Container, Button } from "semantic-ui-react";

import { CREATE_POST_MUTATION, GET_POSTS_QUERY } from "../utils/graphql";

export default function CreatePost(props) {
  const [newPost, handleNewPost] = useForm({
    body: ""
  });
  const [createNewPost, { loading, error }] = useMutation(
    CREATE_POST_MUTATION,
    {
      variables: newPost,
      update(proxy, results) {
        // we use the proxy to get all the data that we have in out apollo cache,
        // to store the new post when the mutation is done
        const cachedData = proxy.readQuery({
          query: GET_POSTS_QUERY
        });
        const newcachedData = {
          getPosts: [results.data.createPost, ...cachedData.getPosts]
        };
        proxy.writeQuery({
          query: GET_POSTS_QUERY,
          data: newcachedData
        });
        newPost.body = "";
      },
      onError(err) {
        console.log(err.graphQLErrors[0].message);
      }
    }
  );
  const onSubmit = e => {
    e.preventDefault();
    createNewPost();
  };
  return (
    <Form onSubmit={onSubmit} className={loading ? "loading" : ""}>
      <h1 style={{ textAlign: "center" }}>New post:</h1>
      <Container style={{ width: "80%", marginTop: "10px" }}>
        <Form.TextArea
          type="text"
          placeholder="Text.."
          name="body"
          value={newPost.body}
          onChange={handleNewPost}
          error={error ? true : false}
        />
        <Button
          type="submit"
          style={{ marginTop: "15px" }}
          fluid
          color="orange"
        >
          Submit
        </Button>
        {error && (
          <div className="ui error message">
            <ul className="list">
              <li>{error.graphQLErrors[0].message}</li>
            </ul>
          </div>
        )}
      </Container>
    </Form>
  );
}
