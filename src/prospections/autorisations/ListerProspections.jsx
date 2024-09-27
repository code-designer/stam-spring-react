import { useState } from 'react';
import SearchBar from '../../Components/SearchBar.jsx';
import { Link, useNavigate, redirect } from 'react-router-dom';

function ListerProspections() {
    const [keyword, setKeyword] = useState("");
    const originals = [
        {
            delivranceNumber: "ldsfoiofsd", numberTaxPayer: "098hdjed", domain: "lmsjdfks",
            expirationDate: "20/04/2019", companyOperator: {
                companyName: "Mining Gold"
            }
        },
        {
            delivranceNumber: "nsdfslie", numberTaxPayer: "sdfjkl86", domain: "aksdjfi",
            expirationDate: "18/11/2021", companyOperator: {
                companyName: "Mining Silver"
            }
        },
        {
            delivranceNumber: "apsdkfj", numberTaxPayer: "9kdjfd6k", domain: "xlodfwpde",
            expirationDate: "08/07/2017", singleOperator: {
                fisrtName: "Regis Alfred",
                lastName: "Yao"
            }
        }
    ];

    const [selectedRows, setSelectedRows] = useState([1]);

    let navigate = useNavigate();
    const handleRowDoubleClick = (number) => {
        navigate("/actes/prospections/" + number)
    }

    const handleRowClick = (id) => {
        setSelectedRows((prevSelectedRows) =>
            prevSelectedRows.includes(id)
                ? prevSelectedRows.filter((rowId) => rowId !== id)
                : [...prevSelectedRows, id]
        );

    }

    const rows = [];
    originals.map((element, index) => (
        rows.push(<tr key={index} className="table-row" onClick={() => handleRowClick(element.delivranceNumber)}
            onDoubleClick={() => handleRowDoubleClick(element.delivranceNumber)}>
            <td><input className="form-check-input" type="checkbox" name={element.delivranceNumber} id={element.delivranceNumber}
                checked={selectedRows.includes(element.delivranceNumber)} readOnly /></td>
            <td>{element.delivranceNumber}</td>
            <td>{element.numberTaxPayer}</td>
            <td>{(element.singleOperator?.fisrtName) ?? element.companyOperator?.companyName}</td>
            <td>{element.domain}</td>
            <td>{element.expirationDate}</td>
        </tr>)
    ));

    return (
        <>
            <div className="mx-auto">
                <h3 className="text-center">PROSPECTIONS</h3>
                <div className="d-flex justify-content-between my-3">
                    <div className="me-3">
                        <Link to="/actes/prospections/nouveau" className='btn'><i className='bi bi-plus'></i></Link>
                        <a href="http://" className='btn'><i className='bi bi-trash'></i></a>
                    </div>
                    <div className="me-3">
                        <SearchBar onSearch={setKeyword} />
                    </div>
                </div>
                <div className="w-100">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className=""><input className="form-check-input" type="checkbox" name="all" id="all" /></th>
                                <th>Numéro d'octroi</th>
                                <th>Numero du CC</th>
                                <th>Nom entreprise ou personne</th>
                                <th>Domaines</th>
                                <th>Date d'expiration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ListerProspections;