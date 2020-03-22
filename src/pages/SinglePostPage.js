import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import moment from "moment";

import {
  Grid,
  Loader,
  Image,
  Container,
  Card,
  Button,
  Label,
  Icon
} from "semantic-ui-react";

import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

import { UserContext } from "../context/UserContext";
import { GET_SINGLE_POST } from "../utils/graphql";
import Comments from "../components/Comments";
import CustomPopUp from "../utils/CustomPopUp";

export default function SinglePostPage(props) {
  const { user } = useContext(UserContext);
  const postId = props.match.params.postId;

  const { loading, data } = useQuery(GET_SINGLE_POST, {
    variables: { postId: postId }
  });

  const deletePostCallback = () => {
    props.history.push("/");
  };

  let singlePost;
  if (loading) {
    singlePost = (
      <Loader style={{ marginTop: "20px" }} active size="medium">
        Loading
      </Loader>
    );
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount
    } = data.getPost;
    singlePost = (
      <Container style={{ marginTop: "30px" }}>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={2}>
              <Image
                floated="right"
                size="small"
                src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra textAlign="center">
                  <LikeButton user={user} post={{ likes, likeCount, id }} />
                  <Button as="div" labelPosition="left">
                    <Label
                      basic
                      style={{ borderRight: 0 }}
                      color="orange"
                      pointing="right"
                    >
                      {commentCount}
                    </Label>
                    <CustomPopUp
                      content="Comment on post"
                      position="right center"
                    >
                      <Button basic color="orange">
                        <Icon name="comments" />
                      </Button>
                    </CustomPopUp>
                  </Button>
                  {user && user.username === username && (
                    <DeleteButton post={{ id }} callback={deletePostCallback} />
                  )}
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={12}>
              <Comments user={user} comments={comments} id={id} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

  return singlePost;
}
