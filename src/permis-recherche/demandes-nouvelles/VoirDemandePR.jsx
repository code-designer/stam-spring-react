import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SingleOperator from "../../operateurs/SingleOperator";
import CompanyOperator from "../../operateurs/CompanyOperator";
import { Link, useParams } from "react-router-dom";
import ConfirmBox from "../../Components/ConfirmBox";

function VoirDemandePR() {
    const params = useParams()

    /**
     * options is used to populate select options 
     * switchOperator allows to choose a campany operator or a single operator
     * Both showOperator and showLicence allow to hide or show details of sections
     * linkErrors is used to stored message errors
     */
    const [options, setOptions] = useState([])
    const [switchOperator, setSwitchOperator] = useState("Company");
    const [showOperator, setShowOperator] = useState(true);
    const [showLicence, setShowLicence] = useState(true);
    const [showOthers, setShowOthers] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [demande, setDemande] = useState({});
    const [fichiers, setFichiers] = useState([])
    const [resource, setResource] = useState(null);

    const racine = "http://localhost:8080/api/v1/permis-recherche/demandes/";
    const style = { fontSize: "0.7rem", padding: "0.2rem 0.4rem" }

    useEffect(() => {
        try {
            if (params?.id !== null) {
                const fetchDemande = async () => {
                    const response = await fetch(`http://localhost:8080/api/v1/permis-recherche/demandes/${params.id}`);
                    if (!response.ok)
                        throw new Error('Impossible de contacter le serveur');

                    const dmd = await response.json();
                    setDemande({ ...dmd[0] })
                }
                fetchDemande()
            }
        } catch (err) {
            console.log(err)
        }
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/permis-recherche/demandes/${params.id}/assets`)
            .then(response => response.json())
            .then(data => setFichiers([...data]))
            .catch(err => {
                console.log(err)
            })
    }, [])

    console.log('fichiers', fichiers)

    const generateFile = () => {
        fetch(`http://localhost:8080/api/v1/permis-recherche/demandes/${params.id}/fiche-technique`,
            {
                method: 'GET',
                header: {
                    'Content-type': 'application/pdf',
                }
            }
        )
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a')
                a.href = url
                a.download = 'fiche-technique-' + params.id + '.pdf'
                document.body.appendChild(a);
                a.click();
                a.parentNode.removeChild(a);
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.error('Error generating PDF:', error));
    }
    /**This function allow the reset of the form */


    /**This functin is intented to fill the input budgetTravaux and radio which can be only read */
    /**
    useEffect(() => {
        const budget = (investissement && fraisAdministration) ? investissement - fraisAdministration : 0;
        const rapport = (budget && superficie) ? (Math.round((budget / superficie) / 1000) / 1000) : 0;
        setValue('budgetTravaux', budget);
        setValue('ratios', rapport);

    }, [fraisAdministration, investissement, superficie, setValue])
    */

    const handleOptions = (e) => {
        setSwitchOperator(e.target.value);
    }

    const handleShowOperator = () => {
        setShowOperator(!showOperator);
    }

    const handleShowLicence = () => {
        setShowLicence(!showLicence);
    }

    const handleShowOthers = () => {
        setShowOthers(!showOthers);
    }

    const loadFile = (filename) => {
        window.open(racine + params.id + '/assets/' + filename, '_blank')
    }

    const deleteResource = (filename) => {
        fetch(racine + params.id + '/assets/' + filename, {
            method: "delete"
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Impossible de supprimer cette resource")

                setFichiers(prevFichier => (
                    prevFichier.filter(f => f !== filename)
                ))

            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    console.log(demande)

    return (
        <>
            <div className="w-sm-100  w-75 mx-auto my-3 shadow">
                <h3 className="text-center rounded-top p-3 bg-info">Demande de PR N°{demande.numeroDeDemande}</h3>
                <div className="form p-4" >

                    <h3 className="w-auto p-2 bg-light" onClick={handleShowOperator}>Operateur
                        <span style={{ float: "right" }}>
                            {showOperator ? "-" : "+"}
                        </span>
                    </h3>

                    <div className="row">
                        <div className="mb-3 col-4">
                            <label className="form-label" htmlFor="rccm">RCCM</label>
                            <input type="text" className="form-control" name="rccm"
                                id="rccm" value={demande?.companyOperator?.rccm} readOnly />
                        </div>

                        <div className="mb-3 col-8">
                            <label className="form-label" htmlFor="denomination">Dénomination</label>
                            <input type="text" className="form-control" name="denomination"
                                id="denomination" value={demande?.companyOperator?.denomination} readOnly />
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-3 col-4">
                            <label className="form-label" htmlFor="raisonSociale">Raison Sociale</label>
                            <input type="text" className="form-control" name="raisonSociale"
                                id="raisonSociale" value={demande?.companyOperator?.raisonSociale} readOnly />
                        </div>

                        <div className="mb-3 col-4">
                            <label className="form-label" htmlFor="capitalSocial">Capital Social</label>
                            <input type="number" className="form-control" name="capitalSocial"
                                id="capitalSocial" value={demande?.companyOperator?.capitalSocial} readOnly />
                        </div>

                        <div className="mb-3 col-4">
                            <label className="form-label" htmlFor="nationalite">Nationalité</label>
                            <input type="text" className="form-control" name="nationalite"
                                id="nationalite" value={demande?.companyOperator?.nationalite} readOnly />
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-3 col-4">
                            <label className="form-label" htmlFor="contact">Contacts</label>
                            <input type="text" className="form-control" name="contact"
                                id="contact" value={demande?.companyOperator?.contact} readOnly />
                        </div>

                        <div className="mb-3 col-8">
                            <label className="form-label" htmlFor="objetPrincipal">Objet principal</label>
                            <input type="text" className="form-control" name="objetPrincipal"
                                id="objetPrincipal" value={demande?.companyOperator?.objetPrincipal} readOnly />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="respoTech">Responsable Technique</label>
                        <input type="text" className="form-control" name="respoTech"
                            id="respoTech" value={demande?.companyOperator?.responsableTechnique} readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="siege_boite">Siège et boite postale</label>
                        <input type="text" className="form-control" name="siege_boite"
                            id="siege_boite" value={demande?.companyOperator?.siegeBoitePostale} readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="objetPrincipal">Associés</label>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Noms</th>
                                    <th>Nationalité</th>
                                    <th>Parts</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    demande?.companyOperator?.associes?.map((a, index) => {
                                        return (<tr key={index}>
                                            <td>{a.nomAssocie}</td>
                                            <td>{a.nationaliteAssocie}</td>
                                            <td>{a.partAssocie}</td>
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    <h3 className="w-auto p-2 bg-light" onClick={handleShowLicence}>Demande de PR
                        <span style={{ float: "right" }}>
                            {showLicence ? "-" : "+"}
                        </span>
                    </h3>

                    <div className="mb-3 ms-3" style={{ display: showLicence ? "block" : "none" }}>
                        <div className="row">
                            <div className="mb-3 col-3">
                                <label className="form-label" htmlFor="numeroDeDemande">Numéro de demande</label>
                                <input type="text" className="form-control" name="numeroDeDemande" id="numeroDeDemande"
                                    value={demande.numeroDeDemande} readOnly />
                            </div>
                            <div className="mb-3 col-3">
                                <label className="form-label" htmlFor="localite">Localité</label>
                                <input type="text" className="form-control" name="localite" id="localite"
                                    value={demande.localite} readOnly />
                            </div>
                            <div className="mb-3 col-3">
                                <label className="form-label" htmlFor="superficie">Superficie (km<sup>2</sup>)</label>
                                <input type="number" step="0.01" className="form-control"
                                    value={demande.superficie} readOnly />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="substances">Substance</label>
                            <div className="row">
                                {
                                    demande?.substances?.map((option) => (
                                        <div className="col-2" key={option.id}>
                                            <input className="form-control" value={option.substance} readOnly></input>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>

                        <div className="row">
                            <div className="mb-3 col-4">
                                <label className="form-label" htmlFor="investissement">Investissement prévus (F CFA)</label>
                                <input type="number" step="0.01" className="form-control" name="investissement"
                                    id="investissement" value={demande.investissement} readOnly />
                            </div>
                            <div className="mb-3 col-4">
                                <label className="form-label" htmlFor="fraisAdministration">Frais d'administration (F CFA)</label>
                                <input type="number" step="0.01" className="form-control" name="fraisAdministration"
                                    id="fraisAdministration" value={demande.fraisAdministration} readOnly />
                            </div>
                            <div className="mb-3 col-4">
                                <label className="form-label" htmlFor="budgetTravaux">Budget prévisionnel (F CFA)</label>
                                <input type="number" step="0.01" className="form-control" name="budgetTravaux"
                                    id="budgetTravaux" value={demande?.investissement - demande?.fraisAdministration} readOnly />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-4">
                                <label className="form-label" htmlFor="ratios">budget sur superficie (millions /km<sup>2</sup>)</label>
                                <input type="number" step="0.01" className="form-control"
                                    value={(Math.round((demande?.investissement - demande?.fraisAdministration / demande.superficie) / 1000) / 1000)} readOnly />
                            </div>

                            <div className="mb-3 col-4">
                                <label className="form-label" htmlFor="emploisPrevus">Emplois prévus</label>
                                <input type="number" step="0.01" className="form-control" name="emploisPrevus"
                                    id="emploisPrevus" value={demande.emploisPrevus} readOnly />
                            </div>
                            <div className="mb-3 col-4">
                                <label className="form-label" htmlFor="emploisTemporaires">Emplois temporaires</label>
                                <input type="number" step="0.01" className="form-control" name="emploisTemporaires"
                                    id="emploisTemporaires" value={demande.emploisTemporaires} readOnly />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-4">
                                <label className="form-label" htmlFor="statut">Statut</label>
                                <input type="text" className="form-control" name="statut" id="statut"
                                    value={demande.statut} readOnly />
                            </div>
                            <div className="mb-3 col-4">
                                <label className="form-label" htmlFor="dateDeSoumission">Date de soumission</label>
                                <input type="date" className="form-control" name="dateDeSoumission" id="dateDeSoumission"
                                    value={demande.dateDeSoumission} readOnly />
                            </div>
                        </div>

                    </div>

                    <h3 className="w-auto p-2 bg-light" onClick={handleShowOthers}>Compléments
                        <span style={{ float: "right" }}>
                            {showLicence ? "-" : "+"}
                        </span>
                    </h3>

                    <div className="mb-3 ms-3" style={{ display: showOthers ? "block" : "none" }}>
                        <div className="row">
                            <table className="table mb-2">
                                {
                                    fichiers.map(fichier => (
                                        <tr>
                                            <td>
                                                <a style={{ cursor: "pointer" }}
                                                    onClick={() => loadFile(fichier)}>{fichier}</a>
                                            </td>
                                            <td>
                                                <button style={style}
                                                    className="btn btn-outline-danger"
                                                    onClick={() => {
                                                        setShowDialog(true)
                                                        setResource(fichier)
                                                    }}>
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <button type="button" className="btn bg-info" onClick={generateFile}
                                    disabled={demande.statut === 'CONFORME' ? false : true}>Fiche Technique</button>
                            </div>
                        </div>
                    </div>
                </div >
            </div >

            {
                showDialog && <ConfirmBox title={"Suppression"}
                    message={`Vous êtes sur le point de supprimer un fichier.
                    Voulez-vous continuez?`}
                    visibiliy={setShowDialog}
                    callback={() => deleteResource(resource)}
                />
            }

        </>
    )
}

export default VoirDemandePR;