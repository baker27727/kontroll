import Rule from "../Rule";
import ApiInterface from "../shared/ApiInterface";

interface RuleState extends ApiInterface{
    rules: Array<Rule>,
    currentRule: Rule | null
}

export default RuleState