import { useState } from "react";
import { useForm } from "react-hook-form";

function SingleOperator({ operator, register }) {

    return (
        <div className="mb-3" id="person">
            <div className="mb-3">
                <label className="form-label" htmlFor="nameLastName">Nom</label>
                <input type="text" className="form-control" name="nameLastName"
                    id="nameLastName" {...register("nameLastName")} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="nameFirstName">Prenoms</label>
                <input type="text" className="form-control" name="nameFirstName" id="nameFirstName"
                    {...register("nameFirstName")} />
            </div>
            <div className="form-check mb-3 form-check-inline">
                <label htmlFor="sex">Sexe</label>
            </div>
            <div className="form-check mb-3 form-check-inline">
                <input type="radio" className="form-check-input" name="sex" value="feminin" id="female" />
                <label htmlFor="female" className="form-check-label">Féminin</label><br />
            </div>
            <div className="form-check mb-3 form-check-inline">
                <input type="radio" className="form-check-input" name="sex" value="masculin" id="male" />
                <label htmlFor="male" className="form-check-label">Masculin</label>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="mobile">Mobile</label>
                <input type="tel" className="form-control" name="mobile" id="mobile"
                    {...register("mobile")} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="phone">Bureau</label>
                <input type="tel" className="form-control" name="office" id="mobile"
                    {...register("office")} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="mail">E-mail</label>
                <input type="mail" className="form-control" name="mail" id="mail"
                    {...register("mail")} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="address">Adresse</label>
                <input type="text" className="form-control" name="address" id="address"
                    {...register("address")} />
            </div>
            {/*
            <div className="mb-3">
                <label className="form-label" htmlFor="criminalRecord">Casier judiciaire</label>
                <input type="file" className="form-control" name="criminalRecord" id="criminalRecord"
                    {...register("criminalRecord")} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="residenceCertificate">Certificat de residence</label>
                <input type="file" className="form-control" name="residenceCertificate" id="residenceCertificate"
                    {...register("residenceCertificate")} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="idcard">Pièce d'identité</label>
                <input type="file" className="form-control" name="idcard" id="idcard"
                    {...register("idcard")} />
            </div>
            */}
        </div>
    )
}

export default SingleOperator