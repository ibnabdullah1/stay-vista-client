const ToggleBtn = ({ toggleHandler }) => {
  return (
    <>
      <label
        htmlFor="Toggle3"
        className="inline-flex w-full justify-center items-center px-2 rounded-md cursor-pointer text-gray-800"
      >
        <input
          onChange={toggleHandler}
          id="Toggle3"
          type="checkbox"
          className="hidden peer "
        />
        <span className="px-4 py-1 font-semibold rounded-l-md bg-rose-400  text-white peer-checked:bg-white peer-checked:text-rose-400  ">
          Guest
        </span>
        <span className="px-4 py-1 font-semibold rounded-r-md bg-white peer-checked:bg-rose-400 text-rose-400 peer-checked:text-white">
          Host
        </span>
      </label>
    </>
  );
};

export default ToggleBtn;
