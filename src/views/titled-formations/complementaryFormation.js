import Multiselect from "multiselect-react-dropdown";
import { optionValueDecorator } from "plugins/multiSelect";
import { customStyle } from "plugins/multiSelect";
import { selectedValueDecorator } from "plugins/multiSelect";
import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import colombianHolidays from "colombian-holidays";
import moment from "moment";


function ComplementaryFormation({ months, year, schedules, setComplementary, id}) {

    const [monthSelected, setMonthSelected ] = useState(0)
    const [weekDays, setWeekDays ] = useState([])
    const [selectedDays, setSelectedDays ] = useState([])

    // const joinData = (endDate) => {
    //     const data = {
    //       learning_result: seleted, end_date: endDate
    //     }
    // }

    useEffect(() => {
        weekDaysByMonth(monthSelected, year, schedules)
    }, [monthSelected, year, schedules])

    useEffect(() => {
        setComplementary(monthSelected, selectedDays, id)
    }, [monthSelected, selectedDays, id])
    

    function getMonth(e) {
        setMonthSelected(months.indexOf(e[0]))
    }

    function weekDaysByMonth(monthSelected, year, schedules) {
        const selectedWeekDays = schedules.filter((weekday) => weekday.start_time !== '' && weekday.end_time !== '')
        // const dayToDate = new Date(year, monthSelected)
        console.log(selectedWeekDays);
        console.log("jerri");

        let daysByMonthSch = []
        for (let i = 1; i <= 31; i++) {
            const dayToDate = new Date(year, monthSelected, i)
            const weekDay = dayToDate.getDay()
            selectedWeekDays.map((daysOfSchedule) => {
                console.log("daysOfSchedule");
                console.log(daysOfSchedule);
                if (weekDay === daysOfSchedule._id) {
                    return(
                        daysByMonthSch.push(i)
                    )
                }
                return daysByMonthSch
            })
        }

        setWeekDays(daysByMonthSch)
    }

    const holidaysColombian = colombianHolidays({
        year: year,
        month: monthSelected+1,
      });
    
      //Festivos
      let holidays = []
      holidaysColombian.map(holiday => {
        let fecha = moment(holiday.celebrationDate)
        var dia = fecha.date();
        return (
          holidays.push(dia)
        )
      })

    function handleDayClick(day) {
        const designatedDays = Object.values(selectedDays);
        const isDesignatedDay = designatedDays.includes(day);
        if(isDesignatedDay) {
        const filtrados = designatedDays.filter(item => item !== day)
        return setSelectedDays(filtrados)
        }
        setSelectedDays({ ...selectedDays, [day]: day});
    }


    return (
        <>
          <Row>
            <Col lg='2'>
              <label
                className="form-control-label"
                htmlFor="input-ficha"
              >
                Seleccione el mes
              </label>
              <Multiselect
                singleSelect
                selectedValueDecorator={selectedValueDecorator}
                optionValueDecorator={optionValueDecorator}
                style={customStyle}
                placeholder="Seleccionar"
                isObject={false}
                onKeyPressFn={function noRefCheck(){}}
                onRemove={function noRefCheck(){}}
                onSelect={function noRefCheck(e){getMonth(e)}}
                options={months}
                selectedValues={["Enero"]}
                avoidHighlightFirstOption={true}
                hidePlaceholder={true}
                emptyRecordMsg="No hay más datos"
              />
            </Col>
            <Col lg='8'>
                <label
                    className="form-control-label"
                    htmlFor="input-ficha"
                >
                    Seleccione los días de programación del curso
                </label>
                <table>
                    <tbody className="shadow p-3 mb-5 rounded">
                        <tr>
                        {
                            weekDays.map((weekDay) => {
                                const designatedDays = Object.values(selectedDays);
                                const isDesignatedDay = designatedDays.includes(weekDay);
                                const isHolidays = holidays.includes(weekDay);
                                return(
                                    <td key={weekDay}>
                                        <span
                                            onClick={() => {
                                                handleDayClick(weekDay);
                                            }}
                                             className={` my-1 day ${isHolidays ? " disabled holiday" : isDesignatedDay ? "designated" : ""}`}
                                            >
                                            {weekDay}
                                        </span>
                                    </td>
                                )
                            })
                        }
                        </tr>
                    </tbody>
                </table>
            </Col>
          </Row>
      </>
      );
}

export default ComplementaryFormation;
