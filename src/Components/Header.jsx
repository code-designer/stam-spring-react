import { NavLink } from "react-router-dom";


function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#menuContent" aria-controls="menuContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="menuContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/accueil" className="nav-link active"><i className='bi bi-house'></i></NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle"
                                    role="button" data-bs-toggle="dropdown" aria-expanded="false">Permis de recherche</a>
                                <ul className="dropdown-menu" aria-labelledby="usermenu">
                                    <li>
                                        <NavLink to="/permis-recherche/titres" className="dropdown-item">Titres de recherches</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/permis-recherche/demandes" className="dropdown-item">Demandes de permis</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/permis-recherche/travaux-recherches" className="dropdown-item">Travaux de recherche</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink to="/actes/permis-exploitation" className="nav-link dropdown-toggle"
                                    role="button" data-bs-toggle="dropdown" aria-expanded="false">Permis d'exploitation</NavLink>
                                <ul className="dropdown-menu" aria-labelledby="menu">
                                    <li>
                                        <NavLink to="/permis-exploitation/titres" className="dropdown-item">Titres d'exploitation</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/permis-exploitation/demandes" className="dropdown-item">Demandes de permis</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/permis-exploitation/investissements" className="dropdown-item">Investissements</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink to="/actes/agrements" className="nav-link dropdown-toggle"
                                    role="button" data-bs-toggle="dropdown" aria-expanded="false">Agrement de sous-traitance</NavLink>
                                <ul className="dropdown-menu" aria-labelledby="menu">
                                    <li>
                                        <NavLink to="/agrements/autorisations" className="dropdown-item">Autorisation de sous traitance</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/agrements/demandes" className="dropdown-item">Demandes d'autorisation</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/agrements/emplois" className="dropdown-item">Suivi des autorisations</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink to="/actes/prospections" className="nav-link dropdown-toggle"
                                    role="button" data-bs-toggle="dropdown" aria-expanded="false">Autorisation de Prospection</NavLink>
                                <ul className="dropdown-menu" aria-labelledby="menu">
                                    <li>
                                        <NavLink to="/prospections/autorisations" className="dropdown-item">Autorisation de prospection</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/prospections/demandes" className="dropdown-item">Demandes d'autorisation</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/prospections" className="dropdown-item">Suivi des autorisations</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/statistiques" className="nav-link">Statistiques</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a href="http://" className="nav-link dropdown-toggle" id="usermenu"
                                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Utilisateur
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="usermenu">
                                    <li>
                                        <NavLink to="/user/profile" className="dropdown-item">Profile</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/user/configurations" className="dropdown-item">Configurations</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/logout" className="dropdown-item">Se deconnecter</NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;