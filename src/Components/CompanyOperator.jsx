import { useState } from "react";
import { useForm } from "react-hook-form";
import Associes from "./Associes.jsx"

function CompanyOperator({ operator, register, errors, control }) {
    const errorStyle = { color: "red", fontStyle: "italic" };
    return (
        <div className="mb-3" id="company">
            <div className="mb-3">
                <label className="form-label" htmlFor="denomination">Denomination</label>
                <input type="text" className="form-control" name="denomination" id="denomination"
                    {...register("denomination")} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="raisonSociale">Raison sociale</label>
                <input type="text" className="form-control" name="raisonSociale" id="raisonSociale"
                    {...register("raisonSociale")} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="nationalite">Nationalité</label>
                <input type="text" className="form-control" name="nationalite" id="nationalite"
                    {...register("nationalite")} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="capitalSocial">Capital social (F CFA)</label>
                <input type="number" className="form-control" name="capitalSocial" id="capitalSocial"
                    {...register("capitalSocial")} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="rccm">RCCM</label>
                <input type="text" className="form-control" name="rccm" id="rccm"
                    {...register("rccm",
                        {
                            required:
                            {
                                value: true,
                                message: "le numéro du registre de commerce est obligatoire"
                            }
                        })} />
                <p style={errorStyle}>{errors.rccm?.message}</p>
            </div>
            <div className="mb-3">
                <label className="form-label">Repartition du capital</label>
                <Associes register={register} errors={errors} control={control} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="objetPrincipal">Objet principal</label>
                <input type="text" className="form-control" name="objetPrincipal" id="objetPrincipal"
                    {...register("objetPrincipal")} />
            </div>

            <div className="mb-3">
                <label className="form-label" htmlFor="siege">Siège et boite postale</label>
                <input type="text" className="form-control" name="siege" id="siege"
                    {...register("siege",
                        {
                            required: {
                                value: true,
                                message: "Le champ siège et boite postale est obligatoire."
                            }
                        }
                    )} />
                <p style={errorStyle}>{errors.siege?.message}</p>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="contact">Contact</label>
                <input type="tel" className="form-control" name="contact" id="contact"
                    {...register("contact",
                        {
                            required: {
                                value: true,
                                message: "Le champ contact est obligatoire."
                            }
                        }
                    )} />
                <p style={errorStyle}>{errors.contact?.message}</p>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="respoTech">Responsable technique</label>
                <input type="tel" className="form-control" name="respoTech" id="respoTech"
                    {...register("respoTech",
                        {
                            required: {
                                value: true,
                                message: "Le champ responsable technique est obligatoire."
                            }
                        }
                    )} />
                <p style={errorStyle}>{errors.respoTech?.message}</p>
            </div>

        </div>
    )
}

export default CompanyOperator
