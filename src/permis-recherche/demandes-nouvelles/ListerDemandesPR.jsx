import { useState, useRef, useEffect } from 'react';
import SearchBar from '../../Components/SearchBar.jsx';
import { Link } from 'react-router-dom';

function ListerDemandesPR() {
    const [keyword, setKeyword] = useState('');
    const [demandes, setDemandes] = useState([]);
    const [selectedRows, setSelectedRows] = useState([])
    const [checkedAll, setCheckedAll] = useState(false)
    const [sortMode, setSortMode] = useState('None')
    const [hovering, setHovering] = useState(false)

    const myRef = useRef()

    const sortMethod = {
        None: (a, b) => undefined,
        Numero: (a, b) => { return a.numeroDeDemande < b.numeroDeDemande ? 1 : -1 },
        Denomination: (a, b) => { return a.companyOperator.denomination > b.companyOperator.denomination ? 1 : -1 },
        Localite: (a, b) => { return a.localite > b.localite ? 1 : -1 },
        Date: (a, b) => { return a.dateDeSoumission > b.dateDeSoumission ? 1 : -1 },
        Statut: (a, b) => { return a.statut > b.statut ? 1 : -1 }
    }
    //const [activeVerification, setActiveVerification] = useState(false);
    //const [activeFondDossier, setActiveFondDossier] = useState(false);

    const listeDeDemande = async (pars) => {
        try {
            const url = 'http://localhost:8080/api/v1/permis-recherche/demandes' +
                ((pars === '' || pars === 'undefined' || typeof pars === 'undefined' || pars === null) ? '' : '/' + pars);

            const response = await fetch(url);
            if (!response.ok)
                throw new Error("Impossible de charge la liste");

            const demandePR = await response.json();
            setDemandes(demandePR)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (keyword.length >= 4)
            listeDeDemande(keyword)
        else
            listeDeDemande()
    }, [keyword])

    useEffect(() => {
        if (selectedRows.length > 0 && selectedRows.length < demandes.length)
            myRef.current.indeterminate = "indeterminate"
        else
            myRef.current.indeterminate = ""
    })

    const handleChange = (id) => {
        setSelectedRows((prevSelectedRows) => (
            prevSelectedRows.includes(id) ?
                prevSelectedRows.filter((rowId) => rowId !== id) :
                [...prevSelectedRows, id]
        ))
    }

    const handleCheckedAll = (e) => {
        if (selectedRows.length !== demandes.length)
            setSelectedRows(() => (
                demandes.map((d, i) => { return i })
            ))
        else
            setSelectedRows([])

        console.log(selectedRows.length, demandes.length)
    }

    const openlink = (numero) => {
        window.open("demandes/" + numero.replaceAll('/', '-') + "/view", "_blank");
    }

    const supprimerDemande = (idx) => {
        const dmd = demandes[idx]
        fetch(`http://localhost:8080/api/v1/permis-recherche/demandes/${dmd.numeroDeDemande.replaceAll('/', '-')}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    console.log("Suppression impossible")
                }
            })
            .catch(err => {
                console.log(err)
            })

        setDemandes(prevDemandes => (
            prevDemandes.filter(d => d.numeroDeDemande !== dmd.numeroDeDemande)
        ))
    }

    const handleDelete = () => {
        selectedRows.forEach(rowIndex => {
            supprimerDemande(rowIndex)
        });
        setSelectedRows([])
    }

    const tri = (sort) => {
        setSortMode(sort)
    }
    console.log(demandes)
    const rows = demandes.sort(sortMethod[sortMode]).map((element, index) => (
        <tr key={index} className="table-row" onClick={() => handleChange(index)}
            onDoubleClick={() => openlink(element.numeroDeDemande)}
        >
            <td><input className="form-check-input" type="checkbox"
                name={element.numeroDeDemande} id={element.numeroDeDemande}
                checked={selectedRows.includes(index) || checkedAll}
                onChange={() => (null)}
            />
            </td>
            <td>{element.numeroDeDemande}</td>
            <td>{element.companyOperator ? element.companyOperator.denomination :
                element.singleOperator.name}</td>
            <td>{element.substances[0].substance}</td>
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
                        <Link to="/permis-recherche/demandes/nouveau" className='btn btn-outline-info mx-1'><i className='bi bi-plus'></i></Link>
                        <button type='button' className='btn btn-outline-danger' onClick={handleDelete}
                            disabled={selectedRows.length > 0 ? false : true}><i className='bi bi-trash'></i></button>

                        <Link to={"/permis-recherche/demandes/" +
                            (demandes[selectedRows[0]]?.numeroDeDemande)?.replaceAll('/', '-') +
                            "/editer"}
                            className={(selectedRows.length === 1) ? 'btn btn-outline-secondary mx-1' : 'btn disabled mx-1'}>
                            <i className="bi bi-pencil-square"></i>
                        </Link>

                        <Link to={"/permis-recherche/demandes/" +
                            (demandes[selectedRows[0]]?.numeroDeDemande)?.replaceAll('/', '-') +
                            "/fiche-de-verification"}
                            className={(selectedRows.length === 1) ? 'btn btn-outline-success mx-1' : 'btn disabled mx-1'}>
                            <i className="bi bi-file-check"></i>
                        </Link>

                        <Link to={"/permis-recherche/demandes/" +
                            (demandes[selectedRows[0]]?.numeroDeDemande)?.replaceAll('/', '-') +
                            "/fond-de-dossier"}

                            className={(selectedRows.length === 1 &&
                                (demandes[selectedRows[0]].statut === 'COMPLET' ||
                                    demandes[selectedRows[0]].statut === 'CONFORME')) ? 'btn btn-outline-warning' : 'btn disabled'}>
                            <i className="bi bi-folder"></i>
                        </Link>

                    </div>
                    <div className="me-3">
                        <SearchBar onSearch={setKeyword} />
                    </div>
                </div>
                <div className="w-100">
                    <table className="table ">
                        <thead>
                            <tr>
                                <th className=""><input className="form-check-input" type="checkbox" name="all" id="all"
                                    checked={selectedRows.length > 0 && selectedRows.length === demandes.length}
                                    onChange={(e) => handleCheckedAll(e)}
                                    ref={myRef}
                                /></th>
                                <th onClick={() => tri('Numero')}>Numéro de la demande</th>
                                <th onClick={() => tri('Denomination')}>Dénomination</th>
                                <th>Substances</th>
                                <th onClick={() => tri('Localite')}>Localité</th>
                                <th onClick={() => tri('Date')}>Date de soumission</th>
                                <th onClick={() => tri('Statut')}>Statut</th>
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