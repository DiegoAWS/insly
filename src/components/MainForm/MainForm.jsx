import { useMemo, useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button } from "@mui/material";

import { cleanMoneyFormatedText, cleanNumberFormatedText, completeWithZeros, isNumberNotBetweenCurated } from "utils/cleanTexts";
import NumberInput from "components/NumberInput/NumberInput";

import InsuranceImage from "assets/insurance.jpeg";
import './MainForm.scss';
import LocalTimer from "components/LocalTimer/LocalTimer";
import { sendInsuranceData } from "services/insuranceService";
import Loading from "components/Loading/Loading";

function MainForm() {
    const [carValue, setCarValue] = useState("");
    const [taxPercentage, setTaxPercentage] = useState("");
    const [numberOfPolicies, setNumberOfPolicies] = useState("");
    const [checkingForErrors, setCheckingForErrors] = useState(false);

    const initialData = {
        loading: false,
        error: false,
        errorMessage: "",
        data: []
    }
    const [data, setData] = useState(initialData);

    const checkErrorCarPrize = useMemo(() => isNumberNotBetweenCurated(100, 100000), [])
    const checkErrorTaxPercentage = useMemo(() => isNumberNotBetweenCurated(0, 100), [])
    const checkErrorNumberOfPolicies = useMemo(() => isNumberNotBetweenCurated(1, 12), [])


    const sendData = async () => {
        setCheckingForErrors(true);
        setCheckingForErrors(false);

        if (checkErrorCarPrize(carValue) || checkErrorTaxPercentage(taxPercentage) || checkErrorTaxPercentage(numberOfPolicies)) {
            return;
        }

        setData(oldData => ({ ...oldData, loading: true }));

        const today = new Date();

        const isoDate = today.toISOString();

        console.log({ isoDate });

        const formData = {
            car_price: carValue,
            tax_percentage: taxPercentage,
            number_of_policies: numberOfPolicies,
            local_time: isoDate
        }

        try {
            const response = await sendInsuranceData(formData);
            const data = response.data;
            console.log(data)
        } catch (e) {
            console.log(e.message)
        }

        setData(oldData => ({ ...oldData, loading: false }));
    }

    return (
        <div className="mainFormContainer">
            <Card sx={{ minWidth: 350 }}>
                <CardMedia
                    component="img"

                    image={InsuranceImage}
                    alt="Insurance Image"
                />

                <CardContent>
                    <div className="cardContentGrid">
                        <NumberInput
                            initialValue="1000"
                            value={carValue}
                            setValue={setCarValue}
                            checkingForErrors={checkingForErrors}
                            checkErrorsFunc={checkErrorCarPrize}
                            functionOnBlur={completeWithZeros}
                            label="Estimated value of the car"
                            helperText="100€ - 100 000€"
                            endAdormentText="€"
                            functionOnChange={cleanMoneyFormatedText}
                        />

                        <NumberInput
                            initialValue="0"
                            value={taxPercentage}
                            setValue={setTaxPercentage}
                            checkingForErrors={checkingForErrors}
                            checkErrorsFunc={checkErrorTaxPercentage}
                            label="Tax percentage"
                            helperText="0 - 100%"
                            endAdormentText="%"
                            functionOnChange={cleanNumberFormatedText}
                        />

                        <NumberInput
                            initialValue="1"
                            value={numberOfPolicies}
                            setValue={setNumberOfPolicies}
                            checkingForErrors={checkingForErrors}
                            checkErrorsFunc={checkErrorNumberOfPolicies}
                            label="Number of policy installments"
                            helperText="1 - 12 policy installments"
                            functionOnChange={cleanNumberFormatedText}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={sendData}
                        >
                            Calculate
                        </Button>
                    </div>
                </CardContent>
                <div className="localTimerWrapper">
                    <LocalTimer />
                </div>

            </Card>
            {data.loading && <Loading />}
        </div>
    )
}

export default MainForm