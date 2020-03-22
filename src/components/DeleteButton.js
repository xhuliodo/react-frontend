import React, { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import {
  DELETE_POST_MUTATION,
  DELETE_COMMENT_MUTATION,
  GET_POSTS_QUERY
} from "../utils/graphql";
import CustomPopUp from "../utils/CustomPopUp";

export default function DeleteButton({ post: { id }, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const currentMutation = commentId
    ? DELETE_COMMENT_MUTATION
    : DELETE_POST_MUTATION;

  const popUpContent = commentId ? "Delete comment" : "Delete post";
  const [deletePostOrComment] = useMutation(currentMutation, {
    variables: { postId: id, commentId: commentId },
    update(proxy, res) {
      setConfirmOpen(false);
      // Reload the cache so that the deleted post actually disappears
      if (!commentId) {
        const cachedData = proxy.readQuery({
          query: GET_POSTS_QUERY
        });
        const newcachedData = {
          getPosts: cachedData.getPosts.filter(post => post.id !== id)
        };
        proxy.writeQuery({
          query: GET_POSTS_QUERY,
          data: newcachedData
        });
      }

      if (callback) callback();
    }
  });

  return (
    <>
      <CustomPopUp content={popUpContent} position="top center">
        <Button
          basic
          color="grey"
          floated="right"
          onClick={() => {
            setConfirmOpen(true);
          }}
        >
          <Icon name="trash alternate outline" style={{ margin: 0 }} />
        </Button>
      </CustomPopUp>
      <Confirm
        open={confirmOpen}
        content="Are you sure you want to delete this?"
        cancelButton="Nope, changed my mind"
        confirmButton="Go ahead, I ain't no bitch!"
        onCancel={() => {
          setConfirmOpen(false);
        }}
        onConfirm={() => {
          deletePostOrComment();
        }}
      />
    </>
  );
}
