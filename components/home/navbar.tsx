import { useRouter } from "next/router";
import styles from "./navbar.module.css";

export default () => {
  const router = useRouter();

  const githubHandler = () => {
    window.open("https://github.com/gtengine/nextra", "_blank");
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <svg
          viewBox="0 0 144 144"
          fill="inherit"
          stroke="inherit"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.logo}
        >
          <g clipPath="url(#clip0_510_6)">
            <path d="M108.411 31.0308L104.919 34.523C86.9284 52.5134 57.7601 52.5134 39.7697 34.523L36.2775 31.0308C34.8287 29.582 32.4797 29.582 31.0309 31.0308C29.5821 32.4796 29.5821 34.8286 31.0309 36.2773L34.5231 39.7695C52.5135 57.76 52.5135 86.9283 34.5231 104.919L31.0309 108.411C29.5821 109.86 29.5821 112.209 31.0309 113.657C32.4797 115.106 34.8287 115.106 36.2775 113.657L39.7697 110.165C57.7601 92.1748 86.9284 92.1748 104.919 110.165L108.411 113.657C109.86 115.106 112.209 115.106 113.658 113.657C115.106 112.209 115.106 109.86 113.658 108.411L110.165 104.919C92.1749 86.9283 92.1749 57.76 110.165 39.7695L113.658 36.2773C115.106 34.8286 115.106 32.4796 113.658 31.0308C112.209 29.582 109.86 29.582 108.411 31.0308Z" />
          </g>
          <defs>
            <clipPath id="clip0_510_6">
              <rect width="144" height="144" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span>기억하기 위한 기록</span>
      </div>
      <div className={styles.navContainer}>
        <span
          className={styles.navText}
          onClick={() => router.push("/documents")}
        >
          Move to documents
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className={styles.icon}
          onClick={githubHandler}
        >
          <path d="M32,10c12.15,0,22,9.85,22,22c0,9.768-6.369,18.045-15.179,20.916c0.002-0.008,0.006-0.021,0.006-0.021	s-1.485-0.696-1.453-1.938c0.035-1.367,0-4.556,0-5.727c0-2.01-1.272-3.434-1.272-3.434s9.977,0.112,9.977-10.533	c0-4.107-2.147-6.245-2.147-6.245s1.128-4.385-0.39-6.245c-1.701-0.184-4.749,1.626-6.05,2.472c0,0-2.062-0.846-5.492-0.846	c-3.43,0-5.492,0.846-5.492,0.846c-1.301-0.846-4.348-2.656-6.05-2.472c-1.518,1.86-0.39,6.245-0.39,6.245s-2.147,2.137-2.147,6.245	c0,10.645,9.977,10.533,9.977,10.533s-1.005,1.136-1.225,2.806c-0.696,0.236-1.721,0.528-2.549,0.528	c-2.165,0-3.812-2.105-4.416-3.078c-0.595-0.96-1.815-1.766-2.953-1.766c-0.749,0-1.115,0.375-1.115,0.803s1.05,0.727,1.743,1.521	c1.461,1.674,1.435,5.438,6.641,5.438c0.565,0,1.719-0.139,2.588-0.256c-0.005,1.185-0.007,2.436,0.012,3.167	c0.031,1.242-1.453,1.938-1.453,1.938s0.004,0.012,0.006,0.021C16.369,50.045,10,41.768,10,32C10,19.85,19.85,10,32,10z" />
        </svg>
      </div>
    </div>
  );
};
