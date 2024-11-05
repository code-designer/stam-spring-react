import { useForm } from "react-hook-form";
import ItemValidation from "../../Components/ItemValidation";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function FondDossier() {
    const params = useParams();
    const [messageError, setMessageError] = useState(null);
    const [fondDossier, setFondDossier] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            isSubmitSuccessful,
            isSubmitted,
            isSubmitting
        }
    } = useForm({
        defaultValues: fondDossier,
    });

    useEffect(() => {
        try {
            const getDefaultFiche = async () => {
                const response = await fetch(`http://localhost:8080/api/v1/permis-recherche/demandes/${params.id}/fond-de-dossier`);
                if (!response.ok) {
                    setMessageError("Impossible de se connecter au serveur, veuillez réessayer plus tard")
                    throw new Error("Impossible de recuperer la demande")
                }

                const fond = await response.json();

                if (fond === null) {
                    setMessageError(`La demande de PR N° ${params.id.replaceAll('-', '/')} n'existe pas. 
                                Impossible de charger la fiche de verification`)
                }

                setFondDossier(fond)
                reset(fond)
            }
            getDefaultFiche();
            console.log("UseEffect with fond Dossier", fond)
        }
        catch (err) {
            console.log(err)
        }


    }, [])


    useEffect(() => {
        if (isSubmitSuccessful)
            reset()
        console.log("UseEffect with reset", fondDossier)
    }, [isSubmitSuccessful, reset])

    const onSubmit = async (data) => {

        try {
            const response = await fetch(`http://localhost:8080/api/v1/permis-recherche/demandes/${params.id}/fond-de-dossier`, {
                method: "Put",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                console.log("Impossible d'etablir une connexion avec le serveur.")
            }


        } catch (err) {
            console.log(err)
        }
        console.log("After Submiting", fondDossier)

    }

    if (messageError === null) {
        return (
            <div className="w-sm-100  w-75 mx-auto my-3 shadow">
                <h3 className="text-center rounded-top p-3 bg-info">Fond du dossier</h3>
                <form key={new Date().getTime()} onSubmit={handleSubmit(onSubmit)}>
                    {/*<input type='hidden' value={params.id.replaceAll('-', '/')} {...register('numeroDeDemande')} />*/}
                    <div className="p-3">
                        <ItemValidation id={"lettreDemande"} summary={"Lettre de Demande"} register={register}
                            defaultValue={fondDossier?.lettreDemande} yes={"Conforme"} no={"Non Conforme"}>
                            <p>Une lettre de demande adressée au Ministre chargé des mines dûment signée et
                                précisant:</p>
                            <ul>
                                <li>La ou les substance(s) minérale(s) à rechercher</li>
                                <li>La superficie du permis de recherche sollicité</li>
                                <li>La localité</li>
                            </ul>
                        </ItemValidation>
                        <ItemValidation id={"carteDeZone"} summary={"Carte de la zone couverte sollicité"}
                            register={register} defaultValue={fondDossier?.carteDeZone} yes={"Conforme"} no={"Non Conforme"}>
                            <p>
                                Une carte de la zone couverte sollicitée sur un fond de carte géologique au 1/200000
                                ou au 1/100 000 produite et authentifiée par l'Administration des mines.<br />
                                Pour les zones non couvertes par la cartographie géologique, la demande comprend
                                une carte de situation sur un fond de carte topographique au 1/200 000 ou au
                                1/50 000 produite par le le Bureau National d'Etude Techniques et deDéveloppment,
                                en abrégé BNETD, ou par tout autre structure compétente en la matière.
                            </p>
                        </ItemValidation>

                        <ItemValidation id={"extraitDeCarte"} summary={"Extrait de carte"} register={register}
                            defaultValue={fondDossier?.extraitDeCarte} yes={"Conforme"} no={"Non Conforme"}>
                            <p>
                                Un extrait de carte de situation au format A4, avec la mention des coordonnées géographiques en
                                degrés, minutes, secondes des sommets du périmetre du permis de recherche sollictés;
                            </p>
                        </ItemValidation>

                        <ItemValidation id={"statuts"} summary={"Statuts"} register={register}
                            defaultValue={fondDossier?.statuts} yes={"Conforme"} no={"Non Conforme"}>
                            <p>
                                Status enrégistrés pour les personnes morales
                            </p>
                        </ItemValidation>

                        <ItemValidation id={"extraitCasierJudiciaire"} summary={"Un extrait de casier judiciaire"}
                            register={register} defaultValue={fondDossier?.extraitCasierJudiciaire}
                            yes={"Conforme"} no={"Non Conforme"}>
                            <details>
                                <summary>Un extrait de casier judiciaire</summary>
                                <p>
                                    Un extrait de casier judiciaire datant de moins de trois mois à compter de
                                    la date de depôt dudit dossier, et un certificat de résidence  pour les
                                    personnes physiques
                                </p>
                            </details>
                        </ItemValidation>

                        <ItemValidation id={"compteContribuable"} summary={"Numéro de compte contribuable du demandeur"}
                            register={register} defaultValue={fondDossier?.compteContribuable}
                            yes={"Conforme"} no={"Non Conforme"}>
                            <p>
                            </p>
                        </ItemValidation>
                        <ItemValidation id={"rccm"} summary={"Registre de commerce avec pour objet recherche minière"}
                            register={register} defaultValue={fondDossier?.rccm} yes={"Conforme"} no={"Non Conforme"}>
                            <p></p>
                        </ItemValidation>
                        <ItemValidation id={"programmeGeneral"} summary={"Programme général des travaux sur quatre ans"}
                            register={register} defaultValue={fondDossier?.programmeGeneral}
                            yes={"Conforme"} no={"Non Conforme"}>
                            <p>
                                Le programme général des travaux sur quatre ans décliné année par année, avec le
                                le coût financier minimum prénu des trvaux chaque année (au moins 1,6 millions
                                francs par kilomètre carré sur la période de validité)
                            </p>
                        </ItemValidation>
                        <ItemValidation id={"programmeDetaille"} summary={"Programme détaillé des travaux"}
                            register={register} defaultValue={fondDossier?.programmeDetaille}
                            yes={"Conforme"} no={"Non Conforme"}>
                            <p>
                                Le programme détaillé des travaux à réaliser au cours de la première année de la période
                                de validité du permis sollicité.
                            </p>
                        </ItemValidation>
                        <ItemValidation id={"listeDesPostes"} summary={"Liste des postes prévus par catégorie d'emploi"}
                            register={register} defaultValue={fondDossier?.listeDesPostes}
                            yes={"Conforme"} no={"Non Conforme"}>
                            <p>
                                La liste des postes prévus par catégorie d'emploi (cadre, agent de maitrise,
                                ouvrier, etc.) pour les travaux sur le périmètre dupermis de recherche sollicté.
                            </p>
                        </ItemValidation>
                        <ItemValidation id={"lettreDesignation"} summary={"Lettre de designation"}
                            register={register} defaultValue={fondDossier?.lettreDesignation}
                            yes={"Conforme"} no={"Non Conforme"}>
                            <p>
                                Une lettre dûment signée de designation du responsale technique des travaux.
                            </p>
                        </ItemValidation>
                        <ItemValidation id={"cvRT"} summary={"Curriculum vitae du responsable technique des travaux"}
                            register={register} defaultValue={fondDossier?.cvRT} yes={"Conforme"} no={"Non Conforme"}>
                            <p>
                                Un curriculum vitae certifié avec photo d'identité du responsable technique
                                des travaux, retraçant toutes ses expériences professionnelles acquises ou
                                en cours, et au moins trois références pouvant confirmer lesdites expériences.
                            </p>
                        </ItemValidation>
                        <ItemValidation id={"diplomes"} summary={"Photocopies des diplômes et certificats"}
                            register={register} defaultValue={fondDossier?.diplomes} yes={"Conforme"} no={"Non Conforme"}>
                            <p>
                                Les photocopies légalisées des diplômes, certificats et autres qualifications
                                professionneles du responsable technique des travaux.
                            </p>
                        </ItemValidation>
                        <ItemValidation id={"memoire"} summary={"Mémoire des expériences du demandeur"}
                            register={register} defaultValue={fondDossier?.memoire} yes={"Conforme"} no={"Non Conforme"}>
                            <p>
                                Un mémoire faisant ressortir les expériences du demandeur en matière
                                d'exploration ou d'exploitation minière acquises seul ou en partenariat,
                                avec leurs justificatifs
                            </p>
                        </ItemValidation>
                        <ItemValidation id={"attestation"} summary={"Attestation bancaire"}
                            register={register} defaultValue={fondDossier?.attestation} yes={"Conforme"} no={"Non Conforme"}>
                            <p>
                                Une attestation et relevé bancaire justifiant la disponibilité d'au
                                moins 10% du budget des travaux de recherche de la première année de la
                                période de validité du permis sollicité. Ces documents doivent être délivrés
                                par un établissement financier de premier rang en Côte d'Ivoire dans
                                laquelle est domicilié le compte du demandeur.
                            </p>
                        </ItemValidation>
                        <ItemValidation id={"releve"} summary={"Relevé bancaire"}
                            register={register} defaultValue={fondDossier?.releve} yes={"Conforme"} no={"Non Conforme"}>
                            <p>
                                Une attestation et relevé bancaire justifiant la disponibilité d'au
                                moins 10% du budget des travaux de recherche de la première année de la
                                période de validité du permis sollicité. Ces documents doivent être délivrés
                                par un établissement financier de premier rang en Côte d'Ivoire dans
                                laquelle est domicilié le compte du demandeur.
                            </p>
                        </ItemValidation>
                        <ItemValidation id={"arf"} summary={"Attestation de regularité fiscale"}
                            register={register} defaultValue={fondDossier?.arf} yes={"Conforme"} no={"Non Conforme"}>
                            <p>
                                Une attestion de regularité fiscale délivrée par l'Administration des
                                impôts
                            </p>
                        </ItemValidation>
                        <ItemValidation id={"droitFixe"} summary={"Récépissé de droit fixe"}
                            register={register} defaultValue={fondDossier?.droitFixe} yes={"Conforme"} no={"Non Conforme"}>
                            <p>
                                le récépissé du paiement du droit fixe : 1 000 000 F CFA
                            </p>
                        </ItemValidation>
                        <ItemValidation id={"declaration"} summary={"Déclaration sur l'honneur"}
                            register={register} defaultValue={fondDossier?.declaration} yes={"Conforme"} no={"Non Conforme"}>
                            <p>
                                Déclaration sur l'honneur du demandeur
                            </p>
                        </ItemValidation>
                        <ItemValidation id={"lettreConsentement"} summary={"Lettre de consentement"}
                            register={register} defaultValue={fondDossier?.lettreConsentement} yes={"Conforme"} no={"Non Conforme"}>
                            <p>
                                La lettre de consentement du responsable technique des travaux.
                            </p>
                        </ItemValidation>
                        <div>
                            <label className="w-100">Observations</label>
                            <textarea rows="7" className="w-100 border border-info p-2"
                                {...register('observations')}></textarea>
                        </div>
                    </div>
                    <div>
                        <button className="px-3 py-2 m-3 btn btn-info" type="submit">Enregistrer<i className="bi bi-floppy mx-2"></i></button>
                        <input className="px-3 py-2 m-3 btn btn-danger" type="reset" value="Annuler" />
                    </div>
                </form>
            </div>
        )
    } else {
        return (
            <div style={{ textAlign: "center", margin: "30px auto", height: "50vh" }}>
                <h3 style={{ color: "red" }}> Oups! une erreur est survenue</h3>
                <p style={{ fontSize: "1.2em" }}>{messageError}</p>
            </div>
        )
    }
}

export default FondDossier