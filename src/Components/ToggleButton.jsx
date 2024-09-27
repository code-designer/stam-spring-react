import { render } from '@react-pdf/renderer';
import { useState } from 'react';

function ToggleButton({ id, onCallBack, register, yes = "Present", no = "Absent" }) {
    const [checked, setChecked] = useState(false)
    const hide = {
        display: "none"
    }

    const style = {
        background: checked ? "rgba(30, 250,150,.8)" : "rgba(250,10,10,.8)",
        color: "white",
        padding: "5px 20px",
        display: "block",
        cursor: "pointer",
        border: checked ? "1px solid rgb(20, 250,100)" : "1px solid rgb(250,5,5)",
        borderRadius: "10px"
    }

    const div = {
        width: "fit-content"
    }

    const handleClick = () => {
        setChecked(!checked)
    }

    const handleChange = () => {
        onCallBack({ [id]: checked })
    }

    return (
        <div style={div}>
            <input type="checkbox" onChange={handleChange}
                style={hide} id={id} name={id} checked={checked} {...register(id)} />
            <label htmlFor={id} style={style} onClick={handleClick}>{checked ? yes : no}</label>
        </div>
    )
}

export default ToggleButton