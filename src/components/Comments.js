import React from "react";
import moment from "moment";
import { Card, Image, Transition } from "semantic-ui-react";
import CreateComment from "./CreateComment";
import DeleteButton from "./DeleteButton";

export default function Comments({ comments, id, user }) {
  return (
    <>
      {user && <CreateComment user={user} postId={id} />}
      <Transition.Group duration={500}>
        {comments.map(c => (
          <Card key={c.id} fluid>
            <Card.Content>
              <Image
                floated="left"
                src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg"
                avatar
              />
              <Card.Header>
                {c.username}
                {user && user.username === c.username && (
                  <DeleteButton post={{ id }} commentId={c.id} />
                )}
              </Card.Header>
              <Card.Meta>{moment(c.createdAt).fromNow()}</Card.Meta>
              <Card.Description>{c.body}</Card.Description>
            </Card.Content>
          </Card>
        ))}
      </Transition.Group>
    </>
  );
}
