import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SingleOperator from "../../Components/SingleOperator";
import CompanyOperator from "../../Components/CompanyOperator";

function AjouterDemandePR({ pr }) {
    const form = useForm({
        defaultValues: {
            associes: [{}]
        }
    });

    const { register, handleSubmit, reset, control, formState } = form;
    const { errors, isSubmitted, isSubmitSuccessful, isSubmitting } = formState
    const [options, setOptions] = useState([])
    const [switchOperator, setSwitchOperator] = useState("Company");
    const [showOperator, setShowOperator] = useState(true);
    const [showLicence, setShowLicence] = useState(true);
    const [linkErrors, setLinkErrors] = useState('');
    const errorStyle = { color: "red", fontStyle: "italic" };

    useEffect(() => {
        if (isSubmitSuccessful)
            reset()
    }, [isSubmitSuccessful, reset])

    useEffect(() => {
        try {
            const fetchSubstances = async () => {
                const response = await fetch('http://localhost:8080/api/v1/substances')
                if (!response.ok)
                    throw new Error("Impossible de charger la liste des substances")

                const substances = await response.json();
                setOptions(substances)
            }
            fetchSubstances()
        } catch (err) {
            setLinkErrors(err.message)
        }
    }, [])

    const onSubmit = async (data) => {

        const associes = data.associes;

        const substances = data.substances.map(
            x => (options[x])
        )

        const companyOperator = {
            denomination: data.denomination ?? null,
            raisonSociale: data.raisonSociale ?? null,
            capitalSocial: data.capitalSocial ?? null,
            nationalite: data.nationalite ?? null,
            rccm: data.rccm ?? null,
            objectPrincipal: data.objectPrincipal ?? null,
            siegeBoitePostale: data.siege ?? null,
            contact: data.contact ?? null,
            responsableTechnique: data.respoTech ?? null,
            associes: associes
        }

        const singleOperator = {
            nom: data.nom ?? null,
            prenoms: data.prenoms ?? null,
            sexe: data.sexe ?? null,
            mobile: data.mobile ?? null,
            bureau: data.bureau ?? null,
            email: data.email ?? null,
            addresse: data.adresse ?? null
        }

        const demande = {
            "numeroDeDemande": data.numeroDeDemande,
            "localite": data.localite,
            "superficie": data.superficie,
            "investissement": data.investissement,
            "fraisAdministration": data.fraisAdministration,
            "emploisPrevus": data.emploisPrevus,
            "emploisTemporaires": data.emploisTemporaires,
            "dateDeSoumission": data.dateDeSoumission,
            "companyOperator": companyOperator,
            "singleOperator": singleOperator,
            "statut": data.statut,
            "substances": substances
        }

        const response = await fetch('http://localhost:8080/api/v1/permis-recherche/demandes', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(demande)
        })
        if (response.ok) {

        }
    }

    const handleOptions = (e) => {
        setSwitchOperator(e.target.value);
    }

    const handleShowOperator = () => {
        setShowOperator(!showOperator);
    }

    const handleShowLicence = () => {
        setShowLicence(!showLicence);
    }

    return (
        <>
            <div className="w-sm-100  w-75 mx-auto my-3 shadow">
                <h3 className="text-center rounded-top p-3 bg-info">Ajouter une demande de PR</h3>
                <form action="" method="post" className="form p-4" onSubmit={handleSubmit(onSubmit)}>

                    <h3 className="w-auto p-2 bg-light" onClick={handleShowOperator}>Operateur
                        <span style={{ float: "right" }}>
                            {showOperator ? "-" : "+"}
                        </span>
                    </h3>

                    <div className="mb-3 ms-3" style={{ display: showOperator ? "block" : "none" }}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="operatorType">Operateur</label>
                            <select name="operatorType" className="form-select" id="operatorType"
                                onChange={handleOptions} >
                                <option value="Company">Personne Morale</option>
                                <option value="Person">Personne Physique</option>
                            </select>
                        </div>
                        {
                            switchOperator === "Person" ? <SingleOperator register={register} /> :
                                <CompanyOperator register={register} control={control} errors={errors} />
                        }
                    </div>

                    <h3 className="w-auto p-2 bg-light" onClick={handleShowLicence}>Demande de PR
                        <span style={{ float: "right" }}>
                            {showLicence ? "-" : "+"}
                        </span>
                    </h3>

                    <div className="mb-3 ms-3" style={{ display: showLicence ? "block" : "none" }}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="numeroDeDemande">Numéro de demande</label>
                            <input type="text" className="form-control" name="numeroDeDemande" id="numeroDeDemande"
                                {...register("numeroDeDemande",
                                    {
                                        required: {
                                            value: true,
                                            message: "le champ numéro de demande est obligatoire"
                                        }
                                    })} />
                            <p style={errorStyle}>{errors.numeroDeDemande?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="localite">Localité</label>
                            <input type="text" className="form-control" name="localite" id="localite"
                                {...register("localite",
                                    {
                                        required: {
                                            value: true,
                                            message: "le champ localité est obligatoire"
                                        }
                                    }
                                )} />
                            <p style={errorStyle}>{errors.localite?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="superficie">Superficie (km<sup>2</sup>)</label>
                            <input type="number" step="0.01" className="form-control" name="superficie"
                                id="superficie" {...register("superficie",
                                    {
                                        required: {
                                            value: true,
                                            message: "le champ superficie est obligatoire"
                                        },
                                        min: 0
                                    }
                                )} />
                            <p style={errorStyle}>{errors.superficie?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="substances">Substance</label>
                            <select id="substances" className="form-control" name="substances"
                                {...register("substances")} multiple>
                                {
                                    options.map((option, index) => (
                                        <option key={option.id} value={index}>{option.substance}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="investissement">Investissement prévus (F CFA)</label>
                            <input type="number" step="0.01" className="form-control" name="investissement"
                                id="investissement" {...register("investissement",
                                    {
                                        required: {
                                            value: true,
                                            message: "le champ investissement est obligatoire"
                                        },
                                        min: 0
                                    }
                                )} />
                            <p style={errorStyle}>{errors.investissement?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="fraisAdministration">Frais d'administration (F CFA)</label>
                            <input type="number" step="0.01" className="form-control" name="fraisAdministration"
                                id="fraisAdministration" {...register("fraisAdministration",
                                    {
                                        required: {
                                            value: true,
                                            message: "Le champ frais d'administration est obligatoire"
                                        }
                                    }
                                )} />
                            <p style={errorStyle}>{errors.fraisAdministration?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="budgetTravaux">Budget prévisionnel des travaux (F CFA)</label>
                            <input type="number" step="0.01" className="form-control" name="budgetTravaux"
                                id="budgetTravaux" {...register("budgetTravaux")} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="ratio">Ratio budget prévisonnel des travaux sur la superficie sollicitée</label>
                            <input type="number" step="0.01" className="form-control" name="ratio"
                                id="ratio" {...register("ratio")} readOnly />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="emploisPrevus">Emplois prévus</label>
                            <input type="number" step="0.01" className="form-control" name="emploisPrevus"
                                id="emploisPrevus" {...register("emploisPrevus",
                                    {
                                        required: {
                                            value: true,
                                            message: "Le champ emplois prévus est un obligatoire."
                                        },
                                        min: 0
                                    }
                                )} />
                            <p style={errorStyle}>{errors.emploisPrevus?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="emploisTemporaires">Emplois temporaires</label>
                            <input type="number" step="0.01" className="form-control" name="emploisTemporaires"
                                id="emploisTemporaires" {...register("emploisTemporaires",
                                    {
                                        required: {
                                            value: true,
                                            message: "Le champ emplois temporaires est obligatoire"
                                        },
                                        min: 0
                                    }
                                )} />
                            <p style={errorStyle}>{errors.emploisTemporaires?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="dateDeSoumission">Date de soumission</label>
                            <input type="date" className="form-control" name="dateDeSoumission" id="dateDeSoumission"
                                {...register("dateDeSoumission",
                                    {
                                        required: {
                                            value: true,
                                            message: "Le champ date de soumission est obligatoire."
                                        }
                                    }
                                )} />
                            <p style={errorStyle}>{errors.dateDeSoumission?.message}</p>
                        </div>
                        <input type="hidden" className="form-control" name="statut" id="statut"
                            {...register("statut")} value={"NOUVEAU"} />

                    </div>

                    <div className="mb-3">
                        <button type="submit" className="px-3 py-2 m-3 btn btn-info">Enregistrer<i className="bi bi-floppy mx-2"></i></button>
                        <button type="reset" className="px-3 py-2 m-3 btn btn-danger">Annuler</button>
                    </div>
                </form >
            </div >

        </>
    )
}

export default AjouterDemandePR;