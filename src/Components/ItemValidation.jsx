import { useState } from "react";
import ToggleButton from "./ToggleButton";


function ItemValidation({ id, summary, children, register, yes, no }) {
    const [showDetails, setShowDetails] = useState(false);

    const handleClick = () => {
        setShowDetails(!showDetails)
    }

    const hide = {
        display: "none"
    }

    const visible = {
        display: "block",
        font: "Arial, Helvetica, sans-serif",
        padding: "5px 15px",
        fontStyle: "italic"
    }

    return (
        <div className="mb-3">
            <div style={{ cursor: "pointer" }} className="d-flex justify-content-between border border-info p-2" onClick={handleClick}>
                <p >{summary}</p>
                <ToggleButton id={id} register={register} yes={yes} no={no} />
            </div>
            <div style={showDetails && children !== undefined ? visible : hide}>
                {children}
            </div>
        </div>
    )
}

export default ItemValidation