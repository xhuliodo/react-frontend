import React, { useContext } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import { Card, Button, Image, Icon, Label } from "semantic-ui-react";

import { UserContext } from "../context/UserContext";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import CustomPopUp from "../utils/CustomPopUp";

export default function SinglePost({
  post: { id, username, body, createdAt, likeCount, commentCount, likes }
}) {
  const { user } = useContext(UserContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
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
          <CustomPopUp content="Comment on post" position="right center">
            <Button basic color="orange" as={Link} to={`/post/${id}`}>
              <Icon name="comments" />
            </Button>
          </CustomPopUp>
        </Button>
        {user && user.username === username && <DeleteButton post={{ id }} />}
      </Card.Content>
    </Card>
  );
}
