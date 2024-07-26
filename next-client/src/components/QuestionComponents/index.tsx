import QuestionInfo from "./QuestionInfo";
import QuestionInput from "./QuestionInput";
import QuestionCheckbox from "./QuestionCheckbox";
import QuestionRadio from "./QuestionRadio";
import QuestionTextarea from "./QuestionTextarea";
import QuestionTitle from "./QuestionTitle";
import QuestionParagraph from "./QuestionParagraph"

type QuestionComponentType = {
    fe_id: string, 
    type: string, //组件类型不能重复，前后端一致
    title: string,
    isHidden: boolean,
    isLocked: boolean,
    props: any
}
export function getComponentTypeModule(component: QuestionComponentType){
    const {type , props , fe_id} = component;

    switch(type){
        case "questionInfo":
            return <QuestionInfo {...props} />
        case "questionInput":
            return <QuestionInput fe_id={fe_id} props={props} />
        case "questionCheckbox":
            return <QuestionCheckbox fe_id={fe_id} props={props} />

        case "questionRadio":
            return <QuestionRadio fe_id={fe_id} props={props} />

        case "questionTextarea":
            return <QuestionTextarea fe_id={fe_id} props={props} />
        case "questionTitle":
            return <QuestionTitle {...props} />
        case "questionParagraph":
            return <QuestionParagraph {...props}/>     

    }

    return null;

}