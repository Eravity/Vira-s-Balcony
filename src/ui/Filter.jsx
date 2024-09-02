import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentFilter, setCurrentFilter] = useState(
    localStorage.getItem(filterField) || options.at(0).value
  );

  useEffect(() => {
    const paramValue = searchParams.get(filterField);
    const storedFilter = localStorage.getItem(filterField);

    if (!paramValue && storedFilter) {
      // Dacă URL-ul nu are filtrul dar este unul în localStorage, setăm URL-ul să reflecte filtrul stocat
      searchParams.set(filterField, storedFilter);
      setSearchParams(searchParams);
    } else if (paramValue && paramValue !== currentFilter) {
      // Sincronizăm starea dacă parametrii URL-ului se schimbă
      setCurrentFilter(paramValue);
      localStorage.setItem(filterField, paramValue);
    }
  }, [searchParams, filterField, currentFilter, setSearchParams]);

  function handleClick(value) {
    setCurrentFilter(value);
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
    localStorage.setItem(filterField, value);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
