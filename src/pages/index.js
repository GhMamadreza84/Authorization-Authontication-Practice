import Link from "next/link";
import styles from "../styles/Home.module.css";
export default function Home() {
  return (
    <div className={styles.container}>
      <button>
        <Link href="/signup">Sign Up</Link>
      </button>
    </div>
  );
}
