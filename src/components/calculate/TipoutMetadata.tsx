import { useEffect, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

interface TipoutMetadataProps {
    handleTipoutMetadata: React.Dispatch<React.SetStateAction<{}>>
}


const TipoutMetadata = ({ handleTipoutMetadata }: TipoutMetadataProps) => {
    const [startDate, setStartDate] = useState(new Date())
    const [shiftDescription, setShiftDescription] = useState("");

    const tipoutMetadataObject = {
        dateTime: startDate,
        shift: shiftDescription,
    }

    useEffect(() => { handleTipoutMetadata(tipoutMetadataObject); console.log(startDate) }, [startDate, shiftDescription])

    return (
        <><DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
        />
            <input placeholder="Shift Description" onChange={(e) => { setShiftDescription(e.target.value) }}></input>
        </>
    )
}

export default TipoutMetadata