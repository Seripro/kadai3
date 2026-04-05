import React from "react";

type TitleProps = {
  type: "title";
  value: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

type TimeProps = {
  type: "time";
  value: number | "";
  setState: React.Dispatch<React.SetStateAction<number | "">>;
};

type Props = TitleProps | TimeProps;

export const Input = (props: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (props.type === "time") {
      // 数値用のロジック
      const parsed = parseInt(inputValue);
      if (!isNaN(parsed)) {
        props.setState(parsed);
      } else if (inputValue === "") {
        props.setState("");
      }
    } else {
      // 文字列用のロジック
      props.setState(inputValue);
    }
  };

  return (
    <input
      value={props.value}
      onChange={handleChange}
      type={props.type === "time" ? "number" : "text"}
    />
  );
};
