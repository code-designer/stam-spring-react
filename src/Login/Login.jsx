

function Login() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-3 w-25 border border-light shadow">
                <h3>Connexion</h3>
                <form method="post" action="login">
                    <div className="my-3">
                        <input className="form-control" type="text" placeholder="Username" required />
                    </div>
                    <div className="my-3">
                        <input className="form-control" type="password" placeholder="Password" required />
                    </div>
                    <div className="my-3">
                        <input className="form-check-input me-3" type="checkbox" name="connected-checkbox" id="connected-checkbox" />
                        <label htmlFor="connected-checkbox">Rester connecté</label>
                    </div>
                    <div className="col">
                        <input className="btn btn-light w-100" type="submit" value="Connecter" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;