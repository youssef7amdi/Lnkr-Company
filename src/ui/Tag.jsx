function Tag({ color, bgColor, children }) {
  return (
    <span
      className={`ml-2 w-fit rounded-[100px] px-[1.2rem] py-[0.4rem] text-[1.1rem] font-[600] uppercase ${color} ${bgColor}`}
    >
      {children}
    </span>
  );
}

export default Tag;
