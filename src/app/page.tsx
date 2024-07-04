import styles from "./page.module.css";
import { OrgTree } from "@/app/_orgTree/OrgTree";

export default function Home() {
  return (
    <main className={styles.main}>
      <OrgTree/>
    </main>
  );
}
