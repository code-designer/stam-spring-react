
const InfoBox = ({ title, message, visibiliy }) => {

    const handleOkClick = () => {
        visibiliy(false)
    }

    return <>
        <div className="position-fixed top-0 start-0 vw-100 vh-100 d-flex 
        justify-content-center align-items-center z-2">
            <div className="d-block rounded w-25 w-sm-100 shadow bg-light" >
                <h5 className="p-2 bg-danger rounded-top">{title}</h5>
                <div className="p-1" >
                    <p className="text-wrap px-1">{message}</p>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="button" onClick={() => { handleOkClick() }} className="btn btn-outline-info m-1">OK</button>
                </div>
            </div>
        </div>
    </>
}

export default InfoBox;