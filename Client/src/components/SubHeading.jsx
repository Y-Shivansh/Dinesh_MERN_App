// not destructured, so can't use props directly in the code


export const SubHeading = (props) => {
    return <div className="text-md text-slate-500 pt-1 px-4 pb-4">
        {props.label}
    </div>
} 