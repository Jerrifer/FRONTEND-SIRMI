
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
          <h6>{option}</h6>
    );
}; 

export const customStyle = {
    optionContainer: {
        backgroundColor: '#f9f9f9',
    },
    chips: {
        color: '#ffff',
        background: '#ffff',
        border: 'none',
        borderRadius:' 5px',
    },
    searchBox: {
        border: 'none',
        boxShadow: '2px 2px 5px 0px rgba(0, 0, 0, 0.1)',
        background: '#ffff',
        maxHeight: "40px",
    },
    inputField: {
        color: '#000',
    },
};


export const closeIcon = <i className="ni ni-fat-remove" style={{fontSize: '20px', cursor: 'pointer', color: 'black'}}></i>




