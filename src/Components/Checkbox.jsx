import React from "react";
import styles from "./Checkbox.module.scss";
import DoneIcon from "@material-ui/icons/Done";

function Checkbox() {
    return (
        <label className={styles.checkbox}>
            <input type="checkbox" tabIndex="0" />
            <div className="custom-checkbox">
                <DoneIcon />
            </div>
        </label>
    );
}

export default Checkbox;
