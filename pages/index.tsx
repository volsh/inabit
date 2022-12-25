import Head from "next/head";
import styles from "../styles/Home.module.css";
import BookList from "../components/BookList/BookList";
import {useState} from "react";
import SignIn from "../components/SignIn/SignIn";

export default function Home() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const handleSubmit = () => {
    setLoggedIn(true);
  };
  return (
    <>
      <Head>
        <title>Inabit Books List</title>
        <meta name="description" content="our favourite books" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isLoggedIn ? (
        <main className={styles.main}>
          <div className={styles.center}>
            <BookList />
          </div>
        </main>
      ) : (
        <SignIn onSubmit={handleSubmit} />
      )}
    </>
  );
}
