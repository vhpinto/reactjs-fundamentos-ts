import { format as formatDate, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";

interface Author {
  avatarUrl: string;
  name: string;
  role: string;
}

interface Content {
  type: string;
  line: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState(["Que interessante!"]);

  const [commentTextAreaValue, setCommentTextAreaValue] = useState("");

  const publishedAtFormatted = formatDate(
    publishedAt,
    "dd 'de' MMMM 'às' HH:mm",
    {
      locale: ptBR,
    }
  );

  const publishedAtDistanceToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function setCommentValidation(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Comentário está em branco!");
  }

  function handleAddNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, commentTextAreaValue]);
    setCommentTextAreaValue("");
  }

  function handleCommentTextAreaTextChange(
    event: ChangeEvent<HTMLTextAreaElement>
  ) {
    event.target.setCustomValidity("");

    setCommentTextAreaValue(event.target.value);
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelete;
    });

    setComments(commentsWithoutDeletedOne);
  }

  const isCommentTextAreaValueEmpty = commentTextAreaValue.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        <time title={publishedAtFormatted} dateTime={publishedAt.toISOString()}>
          {publishedAtDistanceToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((item) => {
          if (item.type === "paragraph") {
            return <p key={item.line}>{item.line}</p>;
          } else if (item.type === "link") {
            return (
              <p key={item.line}>
                <a href="#">{item.line}</a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleAddNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name="commentTextArea"
          placeholder="Deixe um comentário"
          value={commentTextAreaValue}
          onChange={handleCommentTextAreaTextChange}
          onInvalid={setCommentValidation}
          required
        />

        <footer>
          <button type="submit" disabled={isCommentTextAreaValueEmpty}>
            Publicar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
