import { createContext, useContext } from 'react';

export const TableContext = createContext();

function Table({ columns, children }) {
  const rowGrid = `grid items-center gap-x-[2.4rem]`;
  return (
    <TableContext.Provider value={{ columns, rowGrid }}>
      <div
        role="table"
        className="overflow-hidden rounded-[7px] border border-gray-200 bg-white text-[1.4rem]"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns, rowGrid } = useContext(TableContext);
  return (
    <header
      role="row"
      className={`${rowGrid} ${columns} border-b border-gray-200 bg-gray-100  px-[2.4rem] py-[1.6rem] font-semibold uppercase tracking-[0.4px] text-gray-600`}
    >
      {children}
    </header>
  );
}

function Body({ data, render }) {
  if (!data?.length)
    return (
      <p className="m-[2.4rem] items-center text-[1.6rem] font-[500]">
        No Data to show at the Moment
      </p>
    );

  return <section className="">{data.map(render)}</section>;
}

function Row({ onClick, children }) {
  const { columns, rowGrid } = useContext(TableContext);

  return (
    <div
      role="row"
      className={`${rowGrid} ${columns} border-b border-gray-100 px-[2.4rem] py-[1.2rem] last:border-none ${onClick ? ' cursor-pointer hover:bg-gray-100' : ''}`}
      onClick={onClick ? onClick : null}
    >
      {children}
    </div>
  );
}

function Footer({ children }) {
  return (
    <footer className="flex justify-center bg-gray-50 p-[1.2rem]">
      {children}
    </footer>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
