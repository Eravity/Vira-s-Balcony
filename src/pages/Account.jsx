import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import ButtonText from "../ui/ButtonText";
import { useMoveBack } from "../hooks/useMoveBack";
import styled from "styled-components";

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

function Account() {
  const moveBack = useMoveBack();
  return (
    <>
      <FlexRow>
        <Heading as="h1">Update your account</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </FlexRow>

      <Row>
        <Heading as="h3">Update user data</Heading> <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
