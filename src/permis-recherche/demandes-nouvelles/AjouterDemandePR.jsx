import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SingleOperator from "../../Components/SingleOperator";
import CompanyOperator from "../../Components/CompanyOperator";
import { useParams } from "react-router-dom";

function AjouterDemandePR({ option }) {
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
    const [linkErrors, setLinkErrors] = useState('');
    const [demande, setDemande] = useState(
        {
            companyOperator: null,
            person: null,
            numeroDeDemande: null,
            localite: null,
            superficie: 0,
            investissement: 0,
            fraisAdministration: 0,
            emploisPrevus: 0,
            emploisTemporaires: 0,
            dateDeSoumission: null,
            statut: "NOUVEAU",
            substances: [{}]
        }
    );

    const { register, handleSubmit, reset, control, formState, watch, setValue } = useForm({
        defaultValues: {
            denomination: demande?.companyOperator?.denomination,
            raisonSociale: demande?.companyOperator?.raisonSociale,
            capitalSocial: demande?.companyOperator?.capitalSocial,
            nationalite: demande?.companyOperator?.nationalite,
            rccm: demande?.companyOperator?.rccm,
            objectPrincipal: demande?.companyOperator?.objetPrincipal,
            siegeBoitePostale: demande?.companyOperator?.siegeBoitePostale,
            contact: demande?.companyOperator?.contact,
            responsableTechnique: demande?.companyOperator?.responsableTechnique,
            associes: demande?.companyOperator?.associes ?? [{}],
            numeroDeDemande: demande?.numeroDeDemande,
            localite: demande?.localite,
            superficie: demande?.superficie ?? 0,
            investissement: demande?.investissement ?? 0,
            fraisAdministration: demande?.fraisAdministration ?? 0,
            emploisPrevus: demande?.emploisPrevus ?? 0,
            emploisTemporaires: demande?.emploisTemporaires ?? 0,
            dateDeSoumission: demande?.dateDeSoumission,
            statut: demande?.statut,
            substances: demande?.substances
        }
    });

    /**
     * useState
     * register, handleSubmit, rest, control and formState are the result of form destructuration
     * errors, isSubmitted, isSubmitSuccessful, isSubmitting are the result of form destructuration
     * 
     */

    const { errors, isSubmitted, isSubmitSuccessful, isSubmitting } = formState


    /** an object to style error message */
    const errorStyle = { color: "red", fontStyle: "italic" };

    const [fraisAdministration, investissement, superficie]
        = watch(['fraisAdministration', 'investissement', 'superficie'])

    /**This function loads all the substances to populate the Select Options HTML elements */
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

    /**
     * Cette fonction va cherche une demande de PR selon le numero
     */
    useEffect(() => {
        try {
            if (params?.id !== null) {
                const fetchDemande = async () => {
                    const response = await fetch(`http://localhost:8080/api/v1/permis-recherche/demandes/${params.id}`);
                    if (!response.ok)
                        throw new Error('Impossible de contacter le serveur');

                    const dmd = await response.json();
                    setDemande({ ...dmd[0] })
                    reset({
                        ...dmd[0].companyOperator,
                        ...dmd[0],
                        ...dmd[0].person
                    })
                }
                fetchDemande()
            }
        } catch (err) {
            console.log(err)
        }
    }, [])
    console.log(demande)
    /**This function allow the reset of the form */
    useEffect(() => {
        if (isSubmitSuccessful)
            reset()
    }, [isSubmitSuccessful, reset])

    /**This functin is intented to fill the input budgetTravaux and radio which can be only read */
    useEffect(() => {
        const budget = (investissement && fraisAdministration) ? investissement - fraisAdministration : 0;
        const rapport = (budget && superficie) ? (Math.round((budget / superficie) / 1000) / 1000) : 0;
        setValue('budgetTravaux', budget);
        setValue('ratios', rapport);

    }, [fraisAdministration, investissement, superficie, setValue])

    /**This function is used to submit the form data */
    const onSubmit = async (data) => {

        const associes = data.associes;

        const substances = data.substances.map(
            x => (options[x])
        )
        let companyOperator = null;
        let singleOperator = null;

        if (data.selectOperator === "Company") {
            companyOperator = {
                denomination: data?.denomination,
                raisonSociale: data?.raisonSociale,
                capitalSocial: data?.capitalSocial,
                nationalite: data?.nationalite,
                rccm: data?.rccm,
                objetPrincipal: data?.objetPrincipal,
                siegeBoitePostale: data?.siegeBoitePostale,
                contact: data?.contact,
                responsableTechnique: data?.responsableTechnique,
                associes: associes
            }
        } else {
            singleOperator = {
                nom: data?.nom,
                prenoms: data?.prenoms,
                sexe: data?.sexe,
                mobile: data?.mobile,
                bureau: data?.bureau,
                email: data?.email,
                addresse: data?.adresse,
                rccm: data?.rccm
            }
        }

        const nouvelleDemande = {
            numeroDeDemande: data.numeroDeDemande,
            localite: data.localite,
            superficie: data.superficie,
            investissement: data.investissement,
            fraisAdministration: data.fraisAdministration,
            emploisPrevus: data.emploisPrevus,
            emploisTemporaires: data.emploisTemporaires,
            dateDeSoumission: data.dateDeSoumission,
            companyOperator: companyOperator,
            person: singleOperator,
            statut: data.statut,
            substances: substances,
        }
        console.log(nouvelleDemande)
        const response = await fetch('http://localhost:8080/api/v1/permis-recherche/demandes', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(nouvelleDemande)
        })
        if (!response.ok) {
            throw new Error('Impossible de contacter le serveur.')
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
            {
                isSubmitSuccessful &&
                <div style={{ backgroundColor: "green" }}>
                    <p style={{ textAlign: "center" }}>La demande a bien été enrégistrée</p>
                </div>
            }
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
                                onChange={handleOptions} {...register("selectOperator", {
                                    onChange: e => handleOptions(e)
                                })}>
                                <option value="Company">Personne Morale</option>
                                <option value="Person">Personne Physique</option>
                            </select>
                        </div>
                        {
                            switchOperator === "Person" ? <SingleOperator register={register} /> :
                                <CompanyOperator register={register} control={control} errors={errors}
                                    setValue={setValue} />
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
                            <input type="number" step="0.01" className="form-control"
                                {...register("superficie",
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
                            <select id="substances" className="form-control"
                                defaultValue={demande?.substances?.map(s => (s.id))}
                                {...register("substances")} multiple>
                                {
                                    options.map((option) => (
                                        <option key={option.id} value={option.id}>{option.substance}</option>
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
                            <label className="form-label" htmlFor="ratios">Ratio budget prévisonnel des
                                travaux sur la superficie sollicitée (millions /km<sup>2</sup>)</label>
                            <input type="number" step="0.01" className="form-control"
                                {...register("ratios")} readOnly />
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
                    {console.log(option && (option === "new"))}
                    {(option) ?
                        <div className="mb-3">
                            <button type="submit" className="px-3 py-2 m-3 btn btn-info" >Enregistrer<i className="bi bi-floppy mx-2"></i></button>
                            <button type="reset" className="px-3 py-2 m-3 btn btn-danger">Annuler</button>
                        </div>
                        :
                        ""
                    }
                </form >
            </div >

        </>
    )
}

export default AjouterDemandePR;