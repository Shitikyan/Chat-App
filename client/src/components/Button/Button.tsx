import styles from "./button.module.scss";



export default function Button(props: { title: string }) {
  const style = {
    "background-color": (props: any) => (props.primary ? "#464649" : "#772DE8"),
  };
  return <button className={styles.button}>{props.title}</button>;
}
