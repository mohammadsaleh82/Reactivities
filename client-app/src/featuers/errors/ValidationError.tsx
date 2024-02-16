import { Message } from "semantic-ui-react"

interface Props {
    errors:any
}
const ValidationError = ({errors}:Props) => {
  return (
    <Message error>
        
        <Message.List>
            {errors && errors.map((error:any,i:any)=>(
                <Message.Item key={i}>
                    {error}
                </Message.Item>
            ))}
        </Message.List>
    </Message>
  )
}

export default ValidationError