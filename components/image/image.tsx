import Image from "next/image"
import styles from "./image.module.css"

export default ({src, width, height }) => {
  return (
    <div className={styles.imageContainer}>
      <div className={styles.margin} />
      <Image src={src} width={width} height={height} alt="" />
    </div>
  )
}