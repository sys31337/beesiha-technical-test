import React from 'react';
import styles from '../../../styles/PopupHelpers.module.css';

const Comment: React.FC = () => {
  return (
    <div className={styles.motifSection}>
      <div className={styles.motifHeader}>
        <img src="/assets/icons/comment.svg" />
        <h3>Comment</h3>
      </div>

      <textarea className={styles.selectDropDown} rows={5}>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
      </textarea>

    </div>
  )
}

export default Comment