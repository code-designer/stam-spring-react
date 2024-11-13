import { useState } from "react";
import { useForm } from "react-hook-form";

function SingleOperator({ operator, register, errors, errorStyle }) {

    return (
        <div className="mb-3" id="person">
            <div className="mb-3">
                <label className="form-label" htmlFor="rccm">RCCM</label>
                <input type="text" className="form-control"
                    id="rccm" {...register("rccm", {
                        required: {
                            value: true,
                            message: "Ce champ est obligatoire"
                        }
                    })} />
                <p style={errorStyle}>{errors.rccm?.message}</p>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="lastName">Nom</label>
                <input type="text" className="form-control"
                    id="lastName" {...register("lastName", {
                        required: {
                            value: true,
                            message: "Ce champ est obligatoire"
                        }
                    })} />
                <p style={errorStyle}>{errors.lastName?.message}</p>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="firstName">Prenoms</label>
                <input type="text" className="form-control" id="firstName"
                    {...register("firstName", {
                        required: {
                            value: true,
                            message: "Ce champ est obligatoire"
                        }
                    })} />
                <p style={errorStyle}>{errors.firstName?.message}</p>
            </div>
            <div className="form-check mb-3 form-check-inline">
                <label htmlFor="sex">Sexe</label>
            </div>
            <div className="form-check mb-3 form-check-inline">
                <input type="radio" className="form-check-input" name="sex" value="Female" id="female" />
                <label htmlFor="female" className="form-check-label">Féminin</label><br />
            </div>
            <div className="form-check mb-3 form-check-inline">
                <input type="radio" className="form-check-input" name="sex" value="Male" id="male" />
                <label htmlFor="male" className="form-check-label">Masculin</label>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="mobile">Mobile</label>
                <input type="tel" className="form-control" name="mobile" id="mobile"
                    {...register("mobile", {
                        required: {
                            value: true,
                            message: "Ce champ est obligatoire"
                        }
                    })} />
                <p style={errorStyle}>{errors.mobile?.message}</p>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="phone">Bureau</label>
                <input type="tel" className="form-control" name="office" id="mobile"
                    {...register("office")} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="mail">E-mail</label>
                <input type="mail" className="form-control" name="mail" id="mail"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Ce champ est obligatoire"
                        }
                    })} />
                <p style={errorStyle}>{errors.email?.message}</p>
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