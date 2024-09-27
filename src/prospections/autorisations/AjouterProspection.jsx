import { useState } from "react";
import { useForm } from "react-hook-form";
import SingleOperator from "../../Components/SingleOperator";
import CompanyOperator from "../../Components/CompanyOperator";

function AjouterProspection({ pros }) {
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
                <h3 className="text-center rounded-top p-3 bg-info">Ajouter une autorisation de prospection</h3>
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
                    <h3 className="w-auto p-2 bg-light" onClick={handleShowLicence}>Autorisation
                        <span style={{ float: "right" }}>
                            {showLicence ? "-" : "+"}
                        </span>
                    </h3>
                    {
                        showLicence &&
                        <div className="mb-3 ms-3">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="orderNumber">Numéro d'ordre</label>
                                <input type="number" className="form-control" name="orderNumber" id="orderNumber"
                                    placeholder="Numero d'ordre" {...register("orderNumber")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="delivranceNumber">Numéro d'octroi</label>
                                <input type="text" className="form-control" name="delivranceNumber" id="delivranceNumber"
                                    placeholder="Numero d'octroi" {...register("delivranceNumber")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="decreeNumber">Numéro de décret</label>
                                <input type="text" className="form-control" name="decreeNumber" id="decreeNumber"
                                    placeholder="Numero de décret" {...register("decreeNumber")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="area">Superficie</label>
                                <input type="text" className="form-control" name="area" id="area"
                                    placeholder="Superficie" {...register("area")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="region">Region</label>
                                <input type="text" className="form-control" name="region" id="region"
                                    placeholder="Region" {...register("region")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="location">Localité</label>
                                <input type="text" name="location" className="form-control" id="location"
                                    {...register("location")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="substance">Substance</label>
                                <select className="form-control" id="substance" name="substance" >
                                    <option>Argent</option>
                                    <option>Manganèse</option>
                                    <option>OR</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="scannedActPath">Copie de l'acte</label>
                                <input type="file" className="form-control" name="scannedActPath" id="scannedActPath"
                                    {...register("scannedActPath")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="delivranceDate">Date de delivrance</label>
                                <input type="date" className="form-control" name="delivranceDate" id="delivranceDate"
                                    {...register("delivranceDate")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="expirationDate">Date d'expiration</label>
                                <input type="date" className="form-control" name="expirationDate" id="expirationDate"
                                    {...register("expirationDate")} />
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

export default AjouterProspection;