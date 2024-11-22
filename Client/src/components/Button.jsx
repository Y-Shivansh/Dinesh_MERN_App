export const Button = ({label, onClick}) =>{
    return <div>
        <button onClick={onClick} type="button" className="w-full text-white bg-secondaryCol hover:bg-secondaryColHover focus:outline-none ont-medium rounded-lg text-sm px-5 py-2.5">
            {label}
            </button>
    </div>
}