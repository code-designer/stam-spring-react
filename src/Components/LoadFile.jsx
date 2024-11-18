import { useForm } from "react-hook-form";

const LoadFile = ({ url, param, visibility }) => {
    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("file", data.file[0])
        formData.append("details", JSON.stringify(data))
        fetch(url, {
            method: "Post",
            body: formData
        })
            .then(response => {
                if (response.ok)
                    visibility(null)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const cancel = () => {
        visibility(null)
    }

    return (
        <>
            <div className="position-fixed top-0 vw-100 vh-100 d-flex 
            justify-content-center align-items-center z-2">
                <div className="w-50 shadow bg-light rounded">
                    <h3 className="rounded-top bg-info p-2">Télécharger un fichier</h3>
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="my-1 px-2">
                            <input className="form-control" type="hidden"
                                id="numero"
                                value={param}
                                {...register('numero')}
                                readOnly></input>
                        </div>
                        <div className="my-1 px-2">
                            <input className="form-control" type="file" accept={".pdf"}
                                {...register('file',
                                    {
                                        required: true
                                    }
                                )}></input>
                        </div>
                        <div className="mt-2 mb-1 d-flex justify-content-end px-2">
                            <button className="btn btn-outline-danger mx-1" onClick={cancel}>Annuler</button>
                            <button type="submit" className="btn btn-outline-info">Télécharger</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoadFile;