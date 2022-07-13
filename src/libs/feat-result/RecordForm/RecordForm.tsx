import { Button } from "@libs/share-ui";
import { Paper } from "@libs/share-ui";
import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

type RecordFormProps = {
  value: string;
  placeholder: string;
  loading: boolean;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onSubmit(): void;
  disabled?: boolean;
};

export const RecordForm: FC<PropsWithChildren<RecordFormProps>> = ({
  value,
  onChange,
  loading,
  onSubmit: onSubmitProps,
  placeholder,
  disabled,
}) => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmitProps();
  };

  const buttonText = () => {
    if (disabled) {
      return "Done";
    }

    if (loading) {
      return "Loading";
    }

    return "Submit";
  };

  return (
    <Container>
      <Paper title="Check your score and break record">
        <Form onSubmit={onSubmit}>
          <Input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={disabled}
          />
          <Button
            color="primary"
            loading={loading}
            disabled={!value || disabled}
          >
            {buttonText()}
          </Button>
        </Form>
      </Paper>
    </Container>
  );
};

const Container = styled.div`
  order: 3;
`;

const Form = styled.form`
  display: flex;
  font-size: 20px;
  line-height: 40px;
`;

const Input = styled.input`
  font-size: inherit;
  margin-right: 15px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #eee;
  padding: 0 15px;
`;
