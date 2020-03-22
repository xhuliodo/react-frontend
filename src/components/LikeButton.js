import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

import { Button, Icon, Label } from "semantic-ui-react";

import { LIKE_POST_MUTATION } from "../utils/graphql";
import CustomPopUp from "../utils/CustomPopUp";

export default function LikeButton({ post: { likeCount, id, likes }, user }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes, liked]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  });

  let likeButton = user ? (
    liked ? (
      <>
        <Button color="orange">
          <Icon name="fire" />
        </Button>
      </>
    ) : (
      <>
        <Button basic color="orange">
          <Icon name="fire" />
        </Button>
      </>
    )
  ) : (
    <>
      <Button as={Link} to="/login" basic color="orange">
        <Icon name="fire" />
      </Button>
    </>
  );
  return (
    <Button as="div" labelPosition="right">
      <CustomPopUp
        content={!liked ? "Like post" : "Unlike post"}
        position="left center"
      >
        <Button as="div" labelPosition="right" onClick={likePost}>
          {likeButton}
        </Button>
      </CustomPopUp>
      <Label basic color="orange" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}
