
function VoirAgrement({ agrement }) {
    return (
        <>
            <div id="view w-75">
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-6">
                            <label className="form-label">Numéro d'octroi</label>
                            <input className="form-control" type="text" value={agrement?.numeroOctroi} />
                        </div>
                        <div className="col-6">
                            <label className="form-label">Numéro de reference</label>
                            <input className="form-control" type="text" value={agrement?.numeroReference} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label className="form-label">Domaine</label>
                            <input className="form-control" type="text" value={agrement?.numeroOctroi} />
                        </div>
                        <div className="col-6">
                            <label className="form-label">Etat</label>
                            <input className="form-control" type="text" value={agrement?.numeroReference} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label>Observation</label>
                            <textarea className="form-control" value={agrement?.numeroReference} ></textarea>
                        </div>
                    </div>
                    <div className="row mb-3">

                    </div>
                </div>
            </div>
        </>
    )
}

export default VoirAgrement;