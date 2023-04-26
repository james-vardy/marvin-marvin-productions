import Link from "next/link";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <main className={styles.main}>
      <h1>MarvinMarvin Productions</h1>
      <input type="checkbox" id="navi-toggle" className={styles.checkbox} />
      <label htmlFor="navi-toggle" className={styles.button}>
        <span className={styles.icon}>&nbsp;</span>
      </label>
      <div className={styles.background}>&nbsp;</div>

      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href={"/"} className={styles.link}>
              About
            </Link>
          </li>
          <li className={styles.item}>
            <Link href={"/works"} className={styles.link}>
              Selected Works
            </Link>
          </li>
          <li className={styles.item}>
            <Link href={"/contact"} className={styles.link}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
