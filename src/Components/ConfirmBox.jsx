
const ConfirmBox = ({ title, message, visibiliy, callback }) => {

    const handleYesClick = () => {
        callback()
        visibiliy(false)
    }

    const handleOkClick = () => {
        visibiliy(false)
    }

    return <>
        <div className="position-fixed top-0 start-0 vw-100 vh-100 d-flex 
        justify-content-center align-items-center z-1">
            <div className="d-block rounded w-25 w-sm-100 shadow bg-light" >
                <h5 className="p-2 bg-danger rounded-top">{title}</h5>
                <div className="p-1" >
                    <p className="text-wrap px-1">{message}</p>
                </div>
                <div className="d-flex justify-content-end">

                    <button type="button" onClick={() => { handleYesClick() }} className="btn btn-outline-danger m-1">Oui</button>
                    <button type="button" onClick={() => { handleOkClick() }} className="btn btn-outline-info m-1">Non</button>
                </div>
            </div>
        </div>
    </>
}

export default ConfirmBox;