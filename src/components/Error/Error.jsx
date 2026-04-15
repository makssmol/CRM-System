import { Container } from "../../ui";

export function Error({ title, message }) {
  return (
    <Container variant="error">
      <h2>{title}</h2>
      <p>{message}</p>
    </Container>
  );
}
