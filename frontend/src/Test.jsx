import React, {useState} from 'react';
import { TEDropdown, TEDropdownToggle, TEDropdownMenu, TEDropdownItem } from 'tw-elements-react';

export default function TestDropdown() {
      const [showDescription, setShowDescription] = useState(false);

    const ArrowUp = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24">
        <path d="m6.293 13.293 1.414 1.414L12 10.414l4.293 4.293 1.414-1.414L12 7.586z"/>
      </svg>
  );

  // Inline SVG for Arrow Down
  const ArrowDown = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 24">
        <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"/>
      </svg>
  );
  const toggleDescription = (e) => {
    e.stopPropagation(); // Stop event propagation
    setShowDescription(!showDescription);
  };
  return (
      <TEDropdown>
        <TEDropdownToggle onClick={toggleDescription}>
            사용자 가이드
            {showDescription ? <ArrowUp/> : <ArrowDown/>}</TEDropdownToggle>
          <TEDropdownMenu>
              <div >
                  <TEDropdownItem>
                <h1>
                    Action
                </h1>
                </TEDropdownItem>
              </div>
          </TEDropdownMenu>
      </TEDropdown>
  );
}