import { useState } from 'react'

function SearchBar({ onSearch }) {

    const handleChange = (evt) => {
        onSearch(evt.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(evt.target.value)
    }

    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-group">
                    <input type="search" className="form-control" name="recherche" id="recherche"
                        onChange={e => handleChange(e)} placeholder='numéro de demande' />
                    <button className="input-group-text" type="submit"><i className='bi bi-search'></i></button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;