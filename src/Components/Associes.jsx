import { useState } from "react";

function Associes(register) {
    const [associes, setAssocies] = useState([{
        nom: "",
        nationalite: "",
        part: ""
    }])

    const style = {
        border: "none"
    }

    const handleAddRow = (e) => {
        e.preventDefault()
        const associe = {
            nom: "",
            nationalite: "",
            part: ""
        }
        setAssocies([...associes, associe])
    }

    const handleDelRow = (e) => {
        e.preventDefault()
        const lastIndex = associes.length > 0 ? associes.length - 1 : -1;
        let rows = [...associes]
        if (lastIndex > 0)
            rows.splice(lastIndex, 1)
        setAssocies(rows)

    }

    const updateRow = (e, index) => {
        const { name, value } = e.target
        const rows = [...associes]
        rows[index][name] = value
        setAssocies(rows)
        console.log(associes)
    }

    const rows = associes.map((associe, index) => (
        <tr key={index}>
            <td><input type="text" id={"nom-" + index} name={"nom-" + index} value={associe.nom} style={style}
                onChange={(e) => updateRow(e, index)} className="w-100"
                {...register("nom" + index, {
                    required: {
                        value: true,
                        message: "Tous les champs de cette ligne sont obligatoires"
                    }
                })} /></td>

            <td><input type="text" id={"nationalite-" + index} name={"nationalite-" + index}
                value={associe.nationalite} style={style} onChange={(e) => updateRow(e, index)}
                className="w-100" {...register("nom" + index, {
                    required: {
                        value: true,
                        message: "Tous les champs de cette ligne sont obligatoires"
                    }
                })} /></td>

            <td><input type="number" id={"part-" + index} name={"part-" + index} value={associe.part} style={style}
                onChange={(e) => updateRow(e, index)} className="w-100"
                {...register("nom" + index, {
                    required: {
                        value: true,
                        message: "Tous les champs de cette ligne sont obligatoires"
                    }
                })} /></td>
        </tr>
    ))

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ASSOCIES</th>
                        <th>NATIONALITE</th>
                        <th>PARTS (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            <p style={errorStyle}>{errors.length !== 0 ??
                "Tous les champs de cette ligne sont obligatoires"}</p>
            <button onClick={(e) => handleAddRow(e)} className="m-1"><i className="bi bi-plus"></i></button>
            <button onClick={(e) => handleDelRow(e)} className="m-1"><i className="bi bi-trash"></i></button>
        </div>
    )
}

export default Associes