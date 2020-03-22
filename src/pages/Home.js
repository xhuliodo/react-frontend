import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

import { Grid, Loader, Transition } from "semantic-ui-react";
import SinglePost from "../components/SinglePost";
import CreatePost from "../components/CreatePost";

import { UserContext } from "../context/UserContext";
import { GET_POSTS_QUERY } from "../utils/graphql";

export default function Home() {
  const { user } = useContext(UserContext);
  const { loading, data } = useQuery(GET_POSTS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row centered>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row style={{ marginBottom: "50px" }}>
        {user && (
          <Grid.Column>
            <CreatePost />
          </Grid.Column>
        )}
        {loading ? (
          <Loader style={{ marginTop: "20px" }} active size="medium">
            Loading
          </Loader>
        ) : (
          <Transition.Group duration={500}>
            {data.getPosts &&
              data.getPosts.map(post => (
                <Grid.Column key={post.id} style={{ marginBottom: "50px" }}>
                  <SinglePost post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}
