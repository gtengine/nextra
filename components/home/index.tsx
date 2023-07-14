import { useRouter } from "next/router";
import styles from "./index.module.css";
import Navbar from "./navbar";

export default () => {
  const router = useRouter();
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <Navbar />
        </div>
        <div className={styles.subContainer}>
          <div className={styles.descriptionContainer}>
            <h2 className={styles.descriptionTitle}>
              기록되지 않는 건 기억되지 않는다{" "}
            </h2>
            <div className={styles.descriptionBox}>
              <p className={styles.description}>
                개발하면서 만나는 많은 정보와 기술들을
              </p>
              <p className={styles.description}>
                그냥 흘려보내지 않고 기록해두는 노력을.
              </p>
            </div>
            <button
              className={styles.documentsButton}
              onClick={() => router.push("/documents")}
            >
              Move to documents
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
