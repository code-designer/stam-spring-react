import { useState } from "react";
import Associes from "./Associes.jsx"

function CompanyOperator({ operator, register, errors, control, setValue }) {
    const [autocompletion, setAutocompletion] = useState([])

    const errorStyle = { color: "red", fontStyle: "italic" };
    const styleParent = {
        position: "relative"
    }
    const styleChild = {
        position: "absolute",
        top: "100%"
    }


    const fetchCampany = async (evt) => {
        try {
            console.log(evt)
            const input = evt.target.value.toUpperCase()
            if (input >= 3) {
                const response = await fetch('http://localhost:8080/api/v1/entreprises/' +
                    input);
                if (!response.ok)
                    throw new Error('Impossible de contacter le serveur')
                const operators = await response.json();
                console.log(operators)
                setAutocompletion(operators)
            }
            setValue('rccm', input)
        } catch (err) {
            console.log(err)
        }
    }

    const pickCompany = (data) => {
        setValue('rccm', data.rccm);
        setValue('denomination', data.denomination);
        setValue('raisonSocial', data.raisonSocial);
        setValue('nationalite', data.nationalite);
        setValue('capitalSocial', data.capitalSocial);
        setValue('objetPrincipal', data.objetPrincipal);
        setValue('siege', data.siege);
        setValue('contact', data.contact);
        setValue('respoTech', data.respoTech);

        setAutocompletion([])
    }

    return (
        <div className="mb-3" id="company">
            <div className="mb-3" style={styleParent}>
                <label className="form-label" htmlFor="rccm">RCCM</label>
                <input type="text" className="form-control" name="rccm" id="rccm"
                    {...register("rccm",
                        {
                            required:
                            {
                                value: true,
                                message: "le numéro du registre de commerce est obligatoire"
                            },
                            onchange: e => fetchCampany(e)
                        })} />
                {
                    (autocompletion.length > 0) &&
                    <div style={styleChild}>
                        <ul>
                            {autocompletion.map((operator, index) => (
                                <li key={index} onClick={() => pickCompany(operator)}>{operator.rccm}</li>
                            ))}
                        </ul>
                    </div>
                }
                <p style={errorStyle}>{errors.rccm?.message}</p>
            </div>

            <div className="mb-3">
                <label className="form-label" htmlFor="denomination">Denomination</label>
                <input type="text" className="form-control" name="denomination" id="denomination"
                    {...register("denomination",
                        {
                            required: {
                                value: true,
                                message: "le champ numéro de demande est obligatoire"
                            }
                        })} />
                <p style={errorStyle}>{errors.numeroDeDemande?.message}</p>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="raisonSociale">Raison sociale</label>
                <input type="text" className="form-control" name="raisonSociale" id="raisonSociale"
                    {...register("raisonSociale",
                        {
                            required: {
                                value: true,
                                message: "le champ numéro de demande est obligatoire"
                            }
                        })} />
                <p style={errorStyle}>{errors.numeroDeDemande?.message}</p>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="nationalite">Nationalité</label>
                <input type="text" className="form-control" name="nationalite" id="nationalite"
                    {...register("nationalite",
                        {
                            required: {
                                value: true,
                                message: "le champ numéro de demande est obligatoire"
                            }
                        })} />
                <p style={errorStyle}>{errors.numeroDeDemande?.message}</p>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="capitalSocial">Capital social (F CFA)</label>
                <input type="number" className="form-control" name="capitalSocial" id="capitalSocial"
                    {...register("capitalSocial",
                        {
                            required: {
                                value: true,
                                message: "le champ numéro de demande est obligatoire"
                            }
                        })} />
                <p style={errorStyle}>{errors.numeroDeDemande?.message}</p>
            </div>

            <div className="mb-3">
                <label className="form-label">Repartition du capital</label>
                <Associes register={register} errors={errors} control={control} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="objetPrincipal">Objet principal</label>
                <input type="text" className="form-control" id="objetPrincipal"
                    {...register("objetPrincipal",
                        {
                            required: {
                                value: true,
                                message: "le champ numéro de demande est obligatoire"
                            }
                        })} />
                <p style={errorStyle}>{errors.numeroDeDemande?.message}</p>
            </div>

            <div className="mb-3">
                <label className="form-label" htmlFor="siege">Siège et boite postale</label>
                <input type="text" className="form-control" name="siege" id="siege"
                    {...register("siegeBoitePostale",
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
                    {...register("responsableTechnique",
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
