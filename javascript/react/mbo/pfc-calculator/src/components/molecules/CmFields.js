import CaRadioGroup from "../atoms/CaRadioGroup";
import CaTextField from "../atoms/CaTextField";
import CaSelect from "../atoms/CaSelect";

const CmFields = props => {
  const question = props.question
  const handleChange = (fieldName, ev) => {
    props.handleChange({ [fieldName]: ev.target.value })
  }

  return (
    <ul className={`form no${question.no}`}>
      {question.fields.map((field, i) => {
        return (
          <li key={i} className={field.type}>
            {field.type === 'radio' &&
              <CaRadioGroup
                field={field}
                values={props.values}
                itemKey={question.key}
                handleChange={handleChange}
              />
            }
            {field.type === 'number' &&
              <CaTextField
                field={field}
                onChange={handleChange.bind(this, field.name)}
              />
            }
            {field.type === 'select' &&
              <CaSelect
                key={i}
                field={field}
                values={props.values}
                handleChange={handleChange}
              />
            }
          </li>
        )
      })}
    </ul>
  )
}

export default CmFields
