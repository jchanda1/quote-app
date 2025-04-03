import Card from "./UI/Card";

const Quote = ({ quote }) => {
  return (
    <Card quote={quote.quote} author={quote.author} data-testid="quote-card" />
  );
};

export default Quote;
