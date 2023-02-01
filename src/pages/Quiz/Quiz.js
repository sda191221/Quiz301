import { useState } from "react"
import {
    CardBody, CardHeading, CardWrapper,
    QuestionText, QuizTitleWrapper, RadioButton,
    RadioButtonWrapper, ThemeButton, NotAttamptedText,
    SelectedAnsText, IncorrectAnsText, CorrectAnsText, ButtonWrapper
} from './QuizComponents'
import questions from "./Data/Questions/Questions";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button"

const Quiz = ({ toggleTheme }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [result, setResult] = useState([
        { no: 1, attempted: false, correct: false, selected: "" },
        { no: 2, attempted: false, correct: false, selected: "" },
        { no: 3, attempted: false, correct: false, selected: "" },
        { no: 4, attempted: false, correct: false, selected: "" },
        { no: 5, attempted: false, correct: false, selected: "" },
        { no: 6, attempted: false, correct: false, selected: "" },
        { no: 7, attempted: false, correct: false, selected: "" },
        { no: 8, attempted: false, correct: false, selected: "" },
        { no: 9, attempted: false, correct: false, selected: "" },
        { no: 10, attempted: false, correct: false, selected: "" }
    ]);

    const selectedChoiceHandler = (e, question, option) => {
        const selectedAns = e.target.value;
        console.log(selectedAns);
        if (option.isCorrect) {
            const newObj = result.map(obj => {
                if (obj.no === question.no) {
                    return { ...obj, attempted: true, correct: true, selected: selectedAns }
                }
                return obj;
            });
            setResult(newObj);
        }
        else {
            const newObj = result.map(obj => {
                if (obj.no === question.no) {
                    return { ...obj, attempted: true, selected: selectedAns }
                }
                return obj;
            });
            setResult(newObj);
        }
    }
    const submitHandler = (e) => {
        e.preventDefault();

        setIsSubmitted(true);
        console.log(result);

    }

    return (
        <>
            <QuizTitleWrapper>
                <div>
                </div>
                <h1>Quiz</h1>
                <ThemeButton onClick={toggleTheme}>
                    {localStorage.getItem("theme") === "dark" ? "☀️" : "🌙"}
                </ThemeButton>
            </QuizTitleWrapper>
            <form onSubmit={submitHandler}>
                {questions.map((question) => (
                    <CardWrapper key={question.no}>
                        <CardHeading>{`Question ${question.no}`}</CardHeading>
                        <CardBody>
                            <QuestionText>{question.text}</QuestionText>
                            {!isSubmitted ?
                                (
                                    <RadioButtonWrapper>
                                        {
                                            question.options.map((option) => (
                                                <RadioButton key={option.id}>
                                                    <Input
                                                        type="radio"
                                                        name={question.no}
                                                        onChange={(e) => selectedChoiceHandler(e, question, option)}
                                                        label={option.text}
                                                        value={option.text}
                                                    >

                                                    </Input>
                                                </RadioButton>
                                            )
                                            )
                                        }
                                    </RadioButtonWrapper>

                                ) :
                                (
                                    result.map(obj => {
                                        if (obj.no === question.no) {
                                            if (!obj.attempted) {
                                                return (
                                                    <NotAttamptedText> User Did not attempted</NotAttamptedText>
                                                )
                                            }
                                            else {
                                                return (
                                                    <div>
                                                        <SelectedAnsText>{`Selected Answer is: ${obj.selected}`}</SelectedAnsText>
                                                        {obj.correct ?
                                                            (

                                                                <div>

                                                                    <CorrectAnsText> have selected correct answer!!</CorrectAnsText>
                                                                </div>
                                                            )

                                                            :
                                                            (

                                                                <div>
                                                                    <IncorrectAnsText>The answer you have selected is incorrect.</IncorrectAnsText>
                                                                    <CorrectAnsText>correct ans is
                                                                        {question.options.map((option) => { if (option.isCorrect) { return option.text } else { return "" } })}
                                                                    </CorrectAnsText>
                                                                </div>
                                                            )}
                                                    </div>
                                                )
                                            }
                                        }
                                        else return <></>
                                    })


                                )
                            }

                        </CardBody>
                    </CardWrapper>
                ))

                }
                {!isSubmitted ?
                    (
                        <ButtonWrapper>
                            <Button type="reset">
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                primary
                            >
                                Submit
                            </Button>
                        </ButtonWrapper>
                    )
                    :
                    (
                        <Button
                            type="button"
                            fullWidth
                            onClick={() => setIsSubmitted(false)}
                        >
                            Back to Quiz
                        </Button>
                    )

                }
            </form>
        </>
    )
}

export default Quiz;