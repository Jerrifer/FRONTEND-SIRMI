
import "assets/css/selected.css"

export const selectedValueDecorator = (selectedItem) => {
    return (
        <div className="selected">
            <h6 className="t6">{selectedItem}</h6>
        </div>
    );
    };

export const optionValueDecorator =  (option) => {
    return (
        <div>
        <h6>{option}</h6>
        </div>
    );
}; 

export const customStyle = {
    closeIcon: {
        background: 'black'
    },
    optionContainer: {
        backgroundColor: '#f9f9f9',
    },
    option: {
        color: '#333',
    },
    chips: {
        color: '#000', // Aquí puedes definir el color que desees
        background: '#ffff',
        border: 'none',
        boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.1)',
    },
    searchBox: {
        border: 'none',
        borderBottom: '1px solid black',
        borderRadius: '0px',
        maxHeight: "40px",

    },
    inputField: {
        color: '#000',
    },
};


export const closeIcon = <i className="ni ni-fat-remove" style={{fontSize: '20px', cursor: 'pointer'}}></i>




