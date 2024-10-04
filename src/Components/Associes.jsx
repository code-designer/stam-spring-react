import { useState } from "react";
import { useFieldArray } from "react-hook-form";

function Associes({ register, errors, control }) {

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'associes'
    })

    const errorStyle = { color: "red", fontStyle: "italic" };
    const style = {
        border: "none"
    }

    const handleDelRow = (i) => {
        if (i > 0)
            remove(i - 1)
    }

    const rows = fields.map((field, index) => (
        < tr key={field.id} >
            <td><input type="text" style={style}
                className="w-100"
                {...register(`associes.${index}.nomAssocie`, {
                    required: {
                        value: true,
                        message: "Tous les champs de cette ligne sont obligatoires"
                    }
                })} /></td>

            <td><input type="text"
                style={style}
                className="w-100" {...register(`associes.${index}.nationaliteAssocie`, {
                    required: {
                        value: true,
                        message: "Tous les champs de cette ligne sont obligatoires"
                    }
                })} /></td>

            <td><input type="number" style={style}
                className="w-100"
                {...register(`associes.${index}.partAssocie`, {
                    required: {
                        value: true,
                        message: "Tous les champs de cette ligne sont obligatoires"
                    }
                })} /></td>
        </tr >
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
            <p style={errorStyle}>{errors.length !== 0 ? "Tous les champs de cette ligne sont obligatoires" : ""}</p>
            <button type="button"
                onClick={() => append({ nomAssocie: "", nationaliteAssocie: "", partAssocie: "" })}
                className="m-1"><i className="bi bi-plus"></i></button>
            <button type="button"
                onClick={() => handleDelRow(fields.length)}
                className="m-1"><i className="bi bi-trash"></i></button>
        </div>
    )
}

export default Associes