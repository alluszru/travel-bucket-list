function AddButton(props) {
    return (
    <button className="addButton" onClick={props.openDialog} > + Add destination</button>
    );
};

export default AddButton;