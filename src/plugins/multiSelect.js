const { default: Multiselect } = require("multiselect-react-dropdown")


function MultiSelectCustom({options, setRemove, onSelect, disable}) {

    const selectedValueDecorator = (selectedItem) => {
    return (
        <div className="selected">
        <h6 className="t6">{selectedItem}</h6>
        </div>
    );
    };

    const optionValueDecorator = (option) => {
    return (
        <div>
        <h6>{option}</h6>
        </div>
    );
    }; 
    
    const customStyle = {
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
        'border-bottom': '1px solid black',
        'border-radius': '0px'
    },
    inputField: {
        color: '#0000',
    },
    };

  return (
    <>
      <Multiselect
        disable={disable}
        required
        selectedValueDecorator={selectedValueDecorator}
        optionValueDecorator={optionValueDecorator}
        onKeyPressFn={function noRefCheck(){}}
        onSearch={function noRefCheck(){}}
        onRemove={function noRefCheck(){
            setRemove(true)
        }}
        onSelect={function noRefCheck(e){
            onSelect(e[0])
        }}
        avoidHighlightFirstOption={true}
        closeOnSelect={true}
        hidePlaceholder={true}
        loading={options.length <= 0}
        placeholder="Programas de formación"
        displayValue="program_name"
        selectionLimit={1}
        options={options}
        emptyRecordMsg="No hay más datos"
        style={customStyle}
        showCloseIcon={true}
        customCloseIcon={<i className="ni ni-fat-remove" style={{fontSize: '20px', cursor: 'pointer'}}></i>}
      />
    </>
  );
}

export default MultiSelectCustom;





