import { useState } from "react";

const Search = ({ options, onSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
  
    const handleSelectChange = (email:any) => {
      const selectedValue = email;
      const selectedOption = options.find((option: any) => option.email === selectedValue);
      onSelect(selectedOption);
    };

    const handleSearchChange = (event: any) => {
        const query = event.target.value;
        setSearchQuery(query);
        setShowSuggestions(query.length > 0);
    };
    
    const filteredOptions = options.filter((option: any) =>
        !option.isSelected && option.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <div className="relative">
        <input
            type="text"
            placeholder="Search..."
            className=" border rounded-md px-2 w-full"
            value={searchQuery}
            onChange={handleSearchChange}
        />
        {showSuggestions && (
            <ul className="z-10 absolute bg-white w-full rounded-md">
                {filteredOptions.map((option) => (
                    <li className="border px-2" key={option.email} value={option.email} onClick={()=>handleSelectChange(option.email)}>
                        {option.email}
                    </li>
                ))}
            </ul>
        )}
      </div>
    );
};

export default Search;