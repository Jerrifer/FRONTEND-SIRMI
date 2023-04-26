import { useRef } from "react";
import jsPDF from "jspdf";
import ReportTemplateRMI from "components/RMI/report-template-RMI";
import { Link, NavLink as NavLinkRRD } from "react-router-dom";

function Rmi() {
  // const [schedules, setSchedules] = useState([
  //   {
  //     _id: 23312123,
  //     date: "16:00 - 19:00",
  //   },
  //   {
  //     _id: 23144523,
  //     date: "16:00 - 19:00",
  //   },
  //   {
  //     _id: 2387123,
  //     date: "16:00 - 19:00",
  //   },
  //   {
  //     _id: 2356586123,
  //     date: "16:00 - 19:00",
  //   },
  //   {
  //     _id: 236543123,
  //     date: "16:00 - 19:00",
  //   },
  //   {
  //     _id: 23164523,
  //     date: "16:00 - 19:00",
  //   },
  //   {
  //     _id: 264563123,
  //     date: "16:00 - 19:00",
  //   },
  // ]);
  const USER = {
    trainingCenter: "CENTRO DE TELEINFORMÁTICA Y PRODUCCIÓN INDUSTRIAL",
    name: "PABLO ANTONIO ORTIZ GUTIERREZ",
    identification: "87301574",
    email: "portizg@sena.edu.co",
    cellPhone: "3113525102",
    month: "MARZO",
  };

  const RMI = [
    {
      _id: "32323",
      ficha: "2452442",
      trainingProgram: "ANALISIS Y DESARROLLO DE SISTEMAS DE INFORMACION",
      activity:
        "Determinar el cumplimiento de las buenas prácticas de calidad en el desarrollo de software.",
      competences: [
        {
          _id: 23123,
          name: "Aplicar buenas prácticas de calidad en el proceso de desarrollo de software, de acuerdo con el referente adoptado en la empresa.",
          learningResults: [
            {
              _id: 231233,
              name: `Estructurar el modelo de datos del software de acuerdo con las especificaciones del análisis.`,
              endDatelearningResult: "13/02/2023",
            },
            {
              _id: 233123,
              name: `Estructurar el modelo de datos del software de acuerdo con las especificaciones del análisis.`,
              endDatelearningResult: "23/02/2022",
            },
            {
              _id: 23121233,
              name: `Estructurar el modelo de datos del software de acuerdo con las especificaciones del análisis.`,
              endDatelearningResult: "23/02/2022",
            },
          ],
        },
        {
          _id: 2312395959,
          name: "Aplicar buenas prácticas de calidad en el proceso de desarrollo de software, de acuerdo con el referente adoptado en la empresa.",
          learningResults: [
            {
              _id: 231233,
              name: `Estructurar el modelo de datos del software de acuerdo con las especificaciones del análisis.`,
              endDatelearningResult: "13/02/2023",
            },
          ],
        },
      ],
      schedules: [
        {
          _id: 23312123,
          date: "16:00 - 19:00",
        },
        {
          _id: 23144523,
          date: "16:00 - 19:00",
        },
        {
          _id: 2387123,
          date: "16:00 - 19:00",
        },
        {
          _id: 2356586123,
          date: "16:00 - 19:00",
        },
        {
          _id: 236543123,
          date: "16:00 - 19:00",
        },
        {
          _id: 23164523,
          date: "16:00 - 19:00",
        },
        {
          _id: 264563123,
          date: "16:00 - 19:00",
        },
      ],

      week1: [
        {
          _id: 28976,
          day: "",
          style: "",
        },
        {
          _id: 890170238,
          day: "",
          style: "",
        },
        {
          _id: 3019287930,
          day: "1",
          style: "",
        },
        {
          _id: 2903718903,
          day: "2",
          style: "#00B050",
        },
        {
          _id: 4728364782,
          day: "3",
          style: "",
        },
        {
          _id: 2347623847,
          day: "4",
          style: "",
        },
        {
          _id: 2347631223847,
          day: "5",
          style: "",
        },
      ],

      week2: [
        {
          _id: 45476457,
          day: "6",
          style: "",
        },
        {
          _id: 23545346,
          day: "7",
          style: "",
        },
        {
          _id: 6456456,
          day: "8",
          style: "",
        },
        {
          _id: 5874574,
          day: "9",
          style: "#00B050",
        },
        {
          _id: 456463,
          day: "10",
          style: "",
        },
        {
          _id: 2343242342645,
          day: "11",
          style: "",
        },
        {
          _id: 2347623841237,
          day: "12",
          style: "",
        },
      ],

      week3: [
        {
          _id: 898089,
          day: "13",
          style: "",
        },
        {
          _id: 231567544523,
          day: "14",
          style: "",
        },
        {
          _id: 56775675,
          day: "15",
          style: "",
        },
        {
          _id: 345355345345,
          day: "16",
          style: "#00B050",
        },
        {
          _id: 2365486783123,
          day: "17",
          style: "",
        },
        {
          _id: 455345347888,
          day: "18",
          style: "",
        },
        {
          _id: 23488823847,
          day: "19",
          style: "",
        },
      ],

      week4: [
        {
          _id: 978897894566,
          day: "20",
          style: "red",
        },
        {
          _id: 657567532,
          day: "21",
          style: "",
        },
        {
          _id: 46564564562,
          day: "22",
          style: "",
        },
        {
          _id: 12342,
          day: "23",
          style: "#00B050",
        },
        {
          _id: 5555565,
          day: "24",
          style: "",
        },
        {
          _id: 23164528998803,
          day: "25",
          style: "",
        },
        {
          _id: 2347623847,
          day: "26",
          style: "",
        },
      ],

      week5: [
        {
          _id: 67577653423,
          day: "27",
          style: "",
        },
        {
          _id: 43534656768,
          day: "28",
          style: "",
        },
        {
          _id: 2342342352345,
          day: "29",
          style: "",
        },
        {
          _id: 65645645645,
          day: "30",
          style: "#00B050",
        },
        {
          _id: 35453453452,
          day: "31",
          style: "",
        },
        {
          _id: 34242423,
          day: "",
          style: "",
        },
        {
          _id: 238272535,
          day: "",
          style: "",
        },
      ],
      duration: 18,
    },
  ];

  const OTHERSACTIVITES = [
    {
      _id: 123144324,
      activity:
        "Desarrollo curricular (proyecto formativo, planeación pedagógica, elaboración de guías de aprendizaje, instrumentos de evaluación y recursos educativos)",
      description: "Sin descripción",
      duration: 19,
    },
    {
      _id: 123144324,
      activity: "Diseño curricular",
      description: "Sin descripción 2 ",
      duration: 19,
    },
    {
      _id: 123144324,
      activity: "Proyectos de Investigación aplicada",
      description: "Sin descripción 3",
      duration: 22,
    },
    {
      _id: 123144324,
      activity:
        "Aseguramiento de la calidad (Registro calificado, Autoevaluación Institucional)",
      description: "Sin descripción 3",
      duration: 22,
    },
  ];

  const reportTemplateRef = useRef(null);

  const handleGeneratePdf = () => {
    const doc = new jsPDF("l", "pt", "a1");

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        doc.save(
          `RMI ${new Date().getFullYear()} ${USER.month} ${USER.name}.pdf`
        );
      },
    });
  };

  return (
    <div>
      
      <div ref={reportTemplateRef}>
        <ReportTemplateRMI
          user={USER}
          rmi={RMI}
          othersActivities={OTHERSACTIVITES}
        />
      </div>
      <button
        className="btn btn-success mt-5"
       
        onClick={() => {handleGeneratePdf()}}
      >
        Generar PDF
      </button>


      <Link
                              to={`/admin/registertitledformation`}
                              tag={NavLinkRRD}
                              activeclassname="active"
                            >
      <button
        className="btn btn-danger mt-5">
        volver
      </button>

      </Link>
      
                 
    </div>
  );
}

export default Rmi;