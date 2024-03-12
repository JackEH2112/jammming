import React, {useState} from 'react'

function SearchBar() {
    const [search, setSearch] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        alert(`Submission button ${search}`)
        setSearch('');
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label>Search: 
                    <input 
                        name='searchBar'
                        id='searchBar'
                        type='text'
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </label>
                <button type='submit'>
                    Find my jammms!
                </button>
            </form>
        </>
    )
}

export default SearchBar;