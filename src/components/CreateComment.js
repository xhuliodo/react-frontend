import React from "react";
import { Form, Card } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import useForm from "../utils/useForm";
import { CREATE_COMMENT_MUTATION } from "../utils/graphql";

export default function CreateComment({ user, postId }) {
  const [comment, handleComment] = useForm({ postId: postId, body: "" });
  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: comment,
    update() {
      comment.body = "";
    }
  });
  const onSubmit = e => {
    e.preventDefault();
    createComment();
  };
  return (
    <Card fluid>
      <Card.Content>
        <Form onSubmit={onSubmit} style={{ margin: "0 auto!important" }}>
          <Form.Input
            label="Comment here:"
            placeholder="Write what you really think..."
            name="body"
            value={comment.body}
            onChange={handleComment}
          />
          <Form.Button
            disabled={comment.body.trim() === ""}
            color="orange"
            fluid
            width={6}
            style={{
              marginTop: "15px!important",
              marginBottom: "15px!important"
            }}
          >
            Submit
          </Form.Button>
        </Form>
      </Card.Content>
    </Card>
  );
}
