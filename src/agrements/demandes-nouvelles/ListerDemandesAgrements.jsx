import { useState } from 'react';
import SearchBar from '../../Components/SearchBar.jsx';
import { Link } from 'react-router-dom';

function ListerDemandesAgrements() {
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



    const rows = [];
    originals.map((element, index) => (
        rows.push(<tr key={index} className="table-row">
            <td><input className="form-check-input" type="checkbox" name={element.delivranceNumber} id={element.delivranceNumber} /></td>
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
                <h3 className="text-center">DEMANDES D'AGREMENTS</h3>
                <div className="d-flex justify-content-between my-3">
                    <div className="me-3">
                        <Link to="/agrements/nouveau" className='btn'><i className='bi bi-plus'></i></Link>
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

export default ListerDemandesAgrements;