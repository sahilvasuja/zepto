
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
interface ChipOption {
  label: string;
  icon: string;
}

interface ChipsInputProps {
  items: ChipOption[];
}

const Chips: React.FC<ChipsInputProps> = ({ items }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedChips, setSelectedChips] = useState<ChipOption[]>([]);
  const [showList, setShowList] = useState(false);
  const [highlightedChip, setHighlightedChip] = useState<ChipOption | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setShowList(true);
    setHighlightedChip(null);
  };

  const handleItemClick = (item: ChipOption) => {
    if (!selectedChips.find((chip) => chip.label === item.label)) {
      setSelectedChips([...selectedChips, item]);
    }
    setInputValue('');
    setShowList(false);
    setHighlightedChip(null);
  };

  const handleChipRemove = (removedChip: ChipOption) => {
    setSelectedChips(selectedChips.filter((chip) => chip.label !== removedChip.label));
    setHighlightedChip(null);
  };

  const handleInputBlur = () => {
    setInputValue('');
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && inputValue === '' && selectedChips.length > 0) {
      if (highlightedChip) {
        handleChipRemove(highlightedChip);
      } else {
        setHighlightedChip(selectedChips[selectedChips.length - 1]);
      }
    }
  };

  return (
    <div className=" h-full flex flex-col items-center justify-center">
  
    <div className="space-y-2 w-7/12">
      <div className={`border rounded p-2 flex items-center justify-center mt-2 ${selectedChips.length > 0 ? 'flex flex-row' : 'flex'}`}>
        {selectedChips.map((chip, index) => (
         <div
         key={chip.label}
         className={`bg-gray-300 flex rounded-2xl  items-center p-1 pr-8 rounded mr-2 ${highlightedChip === chip ? 'border border-blue-500' : ''}`}
       >
         <Image src={chip.icon} alt={chip.label} width={25} height={25} />
         <span className="ml-2 text-xl">{chip.label}</span>
         <span className="ml-2 font-bold cursor-pointer" onClick={() => handleChipRemove(chip)}>
           X
         </span>
       </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowList(true)}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          placeholder="Search items"
          className="p-2 ml-2 w-full outline-none border-none"
        />
      </div>
      {showList && (
        <ul className="p-0 m-0 max-h-40 rounded-xl overflow-y-auto bg-white border rounded border-gray-300 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
 
  {items
    .filter((item) => !selectedChips.find((chip) => chip.label === item.label) && item.label.includes(inputValue))
    .map((item) => (
      <li
        key={item.label}
        onClick={() => handleItemClick(item)}
        className="cursor-pointer p-2 hover:bg-gray-100 flex items-center gap-2"
      >
        <Image src={item.icon} alt={item.label} width={40} height={40} />
        <span className="ml-2 text-xl">{item.label}</span>
      </li>
    ))}
</ul>


      )}
    </div>
    </div>
  );
};

export default Chips;
