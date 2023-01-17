import { HandsClapping, Trash } from "phosphor-react";
import { useState } from "react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";

interface CommentProps {
  content: string;
  onDeleteComment: (content: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  const [claps, setClaps] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleClapsCount() {
    setClaps((prev) => {
      return prev + 1;
    });
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/vitorhugo-pinto.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentTextArea}>
          <header>
            <div className={styles.commentAuthorAndTime}>
              <strong>Vitor Hugo</strong>
              <time title="11 de maio às 08:13" dateTime="2022-05-11 08:13:30">
                Cerca de 1h atrás
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleClapsCount} title="Aplaudir comentário">
            <HandsClapping size={24} />
            Aplaudir
            <span>{claps}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
