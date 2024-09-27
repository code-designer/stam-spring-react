import { useState } from 'react'

function SearchBar({ onSearch }) {

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div>
            <form action="" method="get">
                <div className="input-group">
                    <input type="search" className="form-control" name="recherche" id="recherche"
                        onChange={onSearch} />
                    <button className="input-group-text" type="submit"><i className='bi bi-search'></i></button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;