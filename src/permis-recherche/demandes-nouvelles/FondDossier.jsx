import { useForm } from "react-hook-form";
import ItemValidation from "../../Components/ItemValidation";

function FondDossier({ dataValidate }) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            lettreDemande: dataValidate?.lettreDemande ?? false,
            carteDeZone: dataValidate?.carteDeZone ?? false,
            extraitDeCarte: dataValidate?.extraitDeCarte ?? false,
            statuts: dataValidate?.statuts ?? false,
            extraitCasierJudiciaire: dataValidate?.extraitCasierJudiciaire ?? false,
            compteContribuable: dataValidate?.compteContribuable ?? false,
            rccm: dataValidate?.rccm ?? false,
            programmeGeneral: dataValidate?.programmeGeneral ?? false,
            programmeDetaille: dataValidate?.programmeDetaille ?? false,
            listeDesPostes: dataValidate?.listeDesPostes ?? false,
            lettreDesignation: dataValidate?.lettreDesignation ?? false,
            cvRT: dataValidate?.cvRT ?? false,
            diplomes: dataValidate?.diplomes ?? false,
            memoire: dataValidate?.memoire ?? false,
            attestation: dataValidate?.attestation ?? false,
            releve: dataValidate?.releve ?? false,
            arf: dataValidate?.arf ?? false,
            droitFixe: dataValidate?.droitFixe ?? false,
            declaration: dataValidate?.declaration ?? false,
            lettreConsentement: dataValidate?.lettreConsentement ?? false
        }
    });

    const etiquette1 = "Conforme"
    const etiquette2 = "Non conforme"

    const onSubmit = (e) => {
        e.preventDefault()
        alert("Soumission du formulaire")
    }

    return (
        <div className="w-sm-100  w-75 mx-auto my-3 shadow">
            <h3 className="text-center rounded-top p-3 bg-info">FOND DU DOSSIER</h3>
            <form key={new Date().getTime()} onSubmit={(e) => handleSubmit(onSubmit(e))}>
                <div className="p-3">
                    <ItemValidation id={"lettreDemande"} summary={"Lettre de Demande"} register={register}
                        yes={etiquette1} no={etiquette2}>
                    </ItemValidation>
                    <ItemValidation id={"carteDeZone"} summary={"Carte de la zone couverte sollicité"}
                        yes={etiquette1} no={etiquette2} register={register} >
                    </ItemValidation>
                    <ItemValidation id={"extraitDeCarte"} summary={"Extrait de carte"} register={register}
                        yes={etiquette1} no={etiquette2} >
                    </ItemValidation>
                    <ItemValidation id={"statuts"} summary={"Statuts"} register={register}
                        yes={etiquette1} no={etiquette2}>
                    </ItemValidation>
                    <ItemValidation id={"extraitCasierJudiciaire"} summary={"Extrait de casier judiciaire"}
                        yes={etiquette1} no={etiquette2} register={register}  >
                    </ItemValidation>
                    <ItemValidation id={"compteContribuable"} summary={"Numéro de compte contribuable du demandeur"}
                        yes={etiquette1} no={etiquette2} register={register} >
                    </ItemValidation>
                    <ItemValidation id={"rccm"} summary={"Registre de commerce avec pour objet recherche minière"}
                        yes={etiquette1} no={etiquette2} register={register} >
                    </ItemValidation>
                    <ItemValidation id={"programmeGeneral"} summary={"Programme général des travaux sur quatre ans"}
                        yes={etiquette1} no={etiquette2} register={register} >
                    </ItemValidation>
                    <ItemValidation id={"programmeDetaille"} summary={"Programme détaillé des travaux"}
                        yes={etiquette1} no={etiquette2} register={register} >
                    </ItemValidation>
                    <ItemValidation id={"listeDesPostes"} summary={"Liste des postes prévus par catégorie d'emploi"}
                        yes={etiquette1} no={etiquette2} register={register} >
                    </ItemValidation>
                    <ItemValidation id={"lettreDesignation"} summary={"Lettre de designation"}
                        yes={etiquette1} no={etiquette2} register={register} >
                    </ItemValidation>
                    <ItemValidation id={"cvRT"} summary={"Curriculum vitae du responsable technique des travaux"}
                        yes={etiquette1} no={etiquette2} register={register} >
                    </ItemValidation>
                    <ItemValidation id={"diplomes"} summary={"Photocopies des diplômes et certificats"}
                        yes={etiquette1} no={etiquette2} register={register} >
                    </ItemValidation>
                    <ItemValidation id={"memoire"} summary={"Mémoire des expériences du demandeur"}
                        yes={etiquette1} no={etiquette2} register={register} >
                    </ItemValidation>
                    <ItemValidation id={"attestation"} summary={"Attestation bancaire"}
                        yes={etiquette1} no={etiquette2} register={register} >
                    </ItemValidation>
                    <ItemValidation id={"releve"} summary={"Relevé bancaire"}
                        yes={etiquette1} no={etiquette2} register={register} >
                    </ItemValidation>
                    <ItemValidation id={"arf"} summary={"Attestation de regularité fiscale"}
                        yes={etiquette1} no={etiquette2} register={register} >
                    </ItemValidation>
                    <ItemValidation id={"droitFixe"} summary={"Récépissé de droit fixe"}
                        yes={etiquette1} no={etiquette2} register={register} >
                    </ItemValidation>
                    <ItemValidation id={"declaration"} summary={"Déclaration sur l'honneur"}
                        yes={etiquette1} no={etiquette2} register={register} >
                    </ItemValidation>
                    <ItemValidation id={"lettreConsentement"} summary={"Lettre de consentement"}
                        yes={etiquette1} no={etiquette2} register={register} >
                    </ItemValidation>
                    <div className="mb-3">
                        <textarea id="obs-lettreConsentement" name="obs-lettreConsentement" rows="10"
                            placeholder=" Obervations" className="w-100 border border-info"></textarea>
                    </div>
                </div>
                <div>
                    <button className="px-3 py-2 m-3 btn btn-info" type="submit">Enregistrer<i className="bi bi-floppy mx-2"></i></button>
                    <input className="px-3 py-2 m-3 btn btn-danger" type="reset" value="Annuler" />
                </div>
            </form>
        </div>
    )
}

export default FondDossier