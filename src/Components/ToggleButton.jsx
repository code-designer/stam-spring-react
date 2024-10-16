import { useEffect, useState } from 'react';

function ToggleButton({ id, register, defaultValue, yes = "Present", no = "Absent" }) {
    const [checked, setChecked] = useState(defaultValue)

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

    useEffect(() => {

    }, [])

    const handleClick = () => {
        setChecked(prev => !prev)
    }

    const handleChange = (e) => {
        setChecked(e.target.checked)
    }

    return (
        <div style={div}>
            <input type="checkbox" onChange={handleChange}
                style={hide} id={id} name={id}  {...register(id)} />
            <label htmlFor={id} style={style} onClick={handleClick}>{checked ? yes : no}</label>
        </div>
    )
}

export default ToggleButton