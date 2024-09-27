import { useState } from "react";
import { useForm } from "react-hook-form";
import SingleOperator from "../../Components/SingleOperator";
import CompanyOperator from "../../Components/CompanyOperator";

function AjouterDemandeProspection({ pros }) {
    const form = useForm({
        defaultValues: {
            numberTaxPayer: pros?.numberTaxPayer
        }
    });
    const { register, handleSubmit } = form;
    const [switchOperator, setSwitchOperator] = useState("Company");
    const [showOperator, setShowOperator] = useState(true);
    const [showLicence, setShowLicence] = useState(true);

    const submit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(data);
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
                <h3 className="text-center rounded-top p-3 bg-info">Ajouter une demande de prospection</h3>
                <form action="" method="post" className="form p-4" onSubmit={(e) => handleSubmit(e)}>

                    <h3 className="w-auto p-2 bg-light" onClick={handleShowOperator}>Operateur
                        <span style={{ float: "right" }}>
                            {showOperator ? "-" : "+"}
                        </span>
                    </h3>
                    {
                        showOperator &&
                        <div className="mb-3 ms-3">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="operatortype">Operateur</label>
                                <select name="operatorType" className="form-select" id="operatorType"
                                    onChange={handleOptions} >
                                    <option value="Company">Personne Morale</option>
                                    <option value="Person">Personne Physique</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="numberTaxPayer">Numéro du compte contribuable</label>
                                <input type="text" className="form-control" name="numberTaxPayer" id="numberTaxPayer" placeholder="Numéro du compte contribuable"
                                    {...register("numberTaxPayer")} />
                            </div>
                            {
                                switchOperator === "Person" ? <SingleOperator register={register} /> : <CompanyOperator register={register} />
                            }
                            <div className="mb-3">
                                <label className="form-label" htmlFor="rccm">Registre de commerce</label>
                                <input type="file" className="form-control" name="rccm" id="rccm" {...register("rccm")} />
                            </div>
                        </div>
                    }
                    <h3 className="w-auto p-2 bg-light" onClick={handleShowLicence}>Demande de prospection
                        <span style={{ float: "right" }}>
                            {showLicence ? "-" : "+"}
                        </span>
                    </h3>
                    {
                        showLicence &&
                        <div className="mb-3 ms-3">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="registerNumber">Numéro d'enregistrement</label>
                                <input type="text" className="form-control" name="registerNumber" id="registerNumber"
                                    placeholder="Numero d'enregistrement" {...register("registerNumber")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="requestLetter">Letter de demande</label>
                                <input type="file" className="form-control" name="requestLetter" id="requestLetter"
                                    {...register("requestLetter")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="resume">CV du responsable Technique</label>
                                <input type="file" className="form-control" name="resume" id="resume"
                                    {...register("resume")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="zoneMap">Carte de la zone</label>
                                <input type="file" className="form-control" name="zoneMap" id="zoneMap"
                                    {...register("zoneMap")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="prospectingProgram">Programme de prospection à réaliser</label>
                                <input type="file" className="form-control" name="prospectingProgram" id="prospectingProgram"
                                    {...register("prospectingProgram")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="receipt">Recepissé de droit fixe</label>
                                <input type="file" className="form-control" name="receipt" id="receipt"
                                    {...register("receipt")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="receipt">Rapport de visite de terrain</label>
                                <input type="file" className="form-control" name="receipt" id="receipt"
                                    {...register("receipt")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="submissionDate">Date de soumission</label>
                                <input type="date" className="form-control" name="submissionDate" id="submissionDate"
                                    {...register("submissionDate")} />
                            </div>
                        </div>
                    }
                    <div className="mb-3">
                        <button type="submit" className="px-3 py-2 m-3 btn btn-info">Enregistrer<i className="bi bi-floppy mx-2"></i></button>
                        <button type="reset" className="px-3 py-2 m-3 btn btn-danger">Annuler</button>
                    </div>
                </form >
            </div >

        </>
    )
}

export default AjouterDemandeProspection;