import { Input, InputProps } from "../molecules/Input"

type Props = {children?: string} & InputProps

export const InputArea = (props: Props)=>{
    return(
          <div style={{ display: "flex" }}>
            <p>{props.children}</p>
            <Input {...props} />
          </div>
    )
}
