import { useState, useRef, useEffect } from 'react';
import SearchBar from '../../Components/SearchBar.jsx';
import { Link } from 'react-router-dom';

function ListerDemandesPR() {
    const [keyword, setKeyword] = useState("");
    const [demandes, setDemandes] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [checkedAll, setCheckedAll] = useState(false);
    const [timer, setTimer] = useState(null)
    //const [activeVerification, setActiveVerification] = useState(false);
    //const [activeFondDossier, setActiveFondDossier] = useState(false);

    useEffect(() => {
        const listeDeDemande = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/permis-recherche/demandes');
                if (!response.ok)
                    throw new Error("Impossible de charge la liste");

                const demandePR = await response.json();
                setDemandes(demandePR)
            } catch (err) {
                console.log(err)
            }
        }

        listeDeDemande();
        console.log(demandes);
    }, [])

    const handleChange = (id) => {
        setSelectedRows((prevSelectedRows) => (
            prevSelectedRows.includes(id) ?
                prevSelectedRows.filter((rowId) => rowId !== id) :
                [...prevSelectedRows, id]
        ))
    }

    const handleCheckedAll = (e) => {
        setCheckedAll(!checkedAll)
    }

    const openlink = (numero) => {
        window.open("demandes/" + numero.replaceAll('/', '-') + "/view", "_blank");
    }

    const rows = demandes.map((element, index) => (
        <tr key={index} className="table-row" onClick={() => handleChange(index)}
            onDoubleClick={() => openlink(element.numeroDeDemande)}>
            <td><input className="form-check-input" type="checkbox"
                name={element.numeroDeDemande} id={element.numeroDeDemande}
                checked={selectedRows.includes(index) || checkedAll}
                onChange={() => (null)} />
            </td>
            <td>{element.numeroDeDemande}</td>
            <td>{element.companyOperator ? element.companyOperator.denomination :
                element.singleOperator.name}</td>
            <td>{element.rccm}</td>
            <td>{element.localite}</td>
            <td>{element.dateDeSoumission}</td>
            <td>{element.statut}</td>
        </tr>)
    );

    return (
        <>
            <div className="mx-auto">
                <h3 className="text-center">DEMANDES DE PERMIS DE RECHERCHE</h3>
                <div className="d-flex justify-content-between my-3">
                    <div className="me-3">
                        <Link to="/permis-recherche/demandes/nouveau" className='btn'><i className='bi bi-plus'></i></Link>
                        <a href="http://" className='btn'><i className='bi bi-trash'></i></a>

                        <Link to={"/permis-recherche/demandes/" +
                            (demandes[selectedRows[0]]?.numeroDeDemande)?.replaceAll('/', '-') +
                            "/fiche-de-verification"}
                            className={(selectedRows.length === 1) ? 'btn' : 'btn disabled'}>Fiche de verification
                        </Link>

                        <Link to={"/permis-recherche/demandes/" +
                            (demandes[selectedRows[0]]?.numeroDeDemande)?.replaceAll('/', '-') +
                            "/fond-de-dossier"}

                            className={(selectedRows.length === 1 &&
                                (demandes[selectedRows[0]].statut === 'COMPLET' ||
                                    demandes[selectedRows[0]].statut === 'CONFORME')) ? 'btn' : 'btn disabled'}>
                            Fond du dossier
                        </Link>

                    </div>
                    <div className="me-3">
                        <SearchBar onSearch={setKeyword} />
                    </div>
                </div>
                <div className="w-100">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className=""><input className="form-check-input" type="checkbox" name="all" id="all"
                                    checked={checkedAll}
                                    onChange={(e) => handleCheckedAll(e)}
                                /></th>
                                <th>Numéro de la demande</th>
                                <th>Dénomination</th>
                                <th>Substances</th>
                                <th>Localité</th>
                                <th>Date d'expiration</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ListerDemandesPR;