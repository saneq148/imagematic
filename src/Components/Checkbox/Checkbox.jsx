import React from "react";
import styles from "./Checkbox.module.scss";
import DoneIcon from "@material-ui/icons/Done";
import PropTypes from "prop-types";

function Checkbox(props) {
    return (
        <label className={styles.checkbox}>
            <input type="checkbox" tabIndex="0" onChange={props.func} defaultChecked={props.selected} />
            <div className="custom-checkbox">
                <DoneIcon />
            </div>
        </label>
    );
}

Checkbox.propTypes = {
    func: PropTypes.func,
    selected: PropTypes.bool
};


export default Checkbox;
