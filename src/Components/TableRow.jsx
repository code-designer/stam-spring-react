import { useState } from "react";
import { Link } from 'react-router-dom';

const TableRow = (props) => {

    const [display, setDisplay] = useState(false);
    const style = { fontSize: "0.7rem", padding: "0.2rem 0.4rem" }

    const element = props.element
    const selectedRows = props.selectedRows
    const index = props.index
    const checkedAll = props.checkedAll
    const handleChange = props.handleChange
    const displayWarningBox = props.warningbox
    const displayLoadFileBox = props.loadfilebox

    const openlink = (numero) => {
        window.open("demandes/" + numero.replaceAll('/', '-') + "/view", "_blank");
    }

    return (
        <>
            <tr className="table-row" onClick={() => handleChange(index)}
                onDoubleClick={() => openlink(element.numeroDeDemande)}
                onMouseEnter={() => setDisplay(true)}
                onMouseLeave={() => setDisplay(false)}
            >
                <td><input className="form-check-input" type="checkbox"
                    name={element.numeroDeDemande} id={element.numeroDeDemande}
                    checked={selectedRows?.includes(index) || checkedAll}
                    onChange={() => (null)}
                />
                </td>
                <td>{element.numeroDeDemande}</td>
                <td>{element.companyOperator ? element.companyOperator.denomination :
                    element.singleOperator.name}</td>
                <td>{element.substances[0].substance}</td>
                <td>{element.localite}</td>
                <td>{element.dateDeSoumission}</td>
                {
                    display ?
                        <td>
                            <button type='button' className='btn btn-outline-danger' style={style}
                                onClick={() => displayWarningBox(true)}>
                                <i className='bi bi-trash'></i></button>

                            <Link to={"/permis-recherche/demandes/" +
                                (element?.numeroDeDemande)?.replaceAll('/', '-') +
                                "/editer"} style={style}
                                className={"btn btn-outline-secondary mx-1"}>
                                <i className="bi bi-pencil-square"></i>
                            </Link>

                            <Link to={"/permis-recherche/demandes/" +
                                (element?.numeroDeDemande)?.replaceAll('/', '-') +
                                "/fiche-de-verification"} style={style}
                                className={"btn btn-outline-success mx-1"}>
                                <i className="bi bi-file-check"></i>
                            </Link>

                            <Link to={"/permis-recherche/demandes/" +
                                (element?.numeroDeDemande)?.replaceAll('/', '-') +
                                "/fond-de-dossier"}
                                style={style}
                                className={'btn btn-outline-warning'}>
                                <i className="bi bi-folder"></i>
                            </Link>
                            <button type="button"
                                onClick={() => displayLoadFileBox(element.numeroDeDemande)}
                                className="btn btn-outline-info mx-1"
                                style={style}>
                                <i className="bi bi-upload"></i>
                            </button>
                        </td>
                        :
                        <td>{element.statut}</td>
                }
            </tr>
        </>)
}

export default TableRow;