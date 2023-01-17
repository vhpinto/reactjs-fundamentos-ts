import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";

import styles from "./App.module.css";

import "./global.css";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/vitorhugo-pinto.png",
      name: "Vítor Hugo",
      role: "Web Developer",
    },
    content: [
      { type: "paragraph", line: "Fala galeraa 👋" },
      {
        type: "paragraph",
        line: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", line: "jane.design/doctorcare" },
    ],
    publishedAt: new Date("2022-12-18 21:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/arkaisho.png",
      name: "João Pedro",
      role: "Mobile Developer @Loomi",
    },
    content: [
      { type: "paragraph", line: "Fala galeraa 👋" },
      {
        type: "paragraph",
        line: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", line: "jane.design/doctorcare" },
    ],
    publishedAt: new Date("2022-12-20 13:00:00"),
  },
];

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}
